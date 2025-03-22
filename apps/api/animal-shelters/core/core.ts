import { APIError, api } from "encore.dev/api";

import { db } from "@/database";
import { IdParams, MessageOutput, PaginationParams } from "@/shared/interfaces";
import { getPagination, processDbList } from "@/shared/utils";

import { FilterByField, SortBy, SortOrder } from "./enums";
import {
  AnimalShelterOutput,
  FilteredSheltersList,
  PaginatedAnimalSheltersList,
  ShelterFilterParams,
} from "./interfaces";
import {
  CreateAnimalShelterInput,
  UpdateAnimalShelterInput,
} from "./validation";

export const getOne = api<IdParams, AnimalShelterOutput>(
  {
    expose: true,
    auth: true,
    method: "GET",
    path: "/shelters/:id",
    tags: ["shelters"],
  },
  async (params) => {
    const animalshelter = await db.queryRow`
      SELECT 
        s.id,
        s.name,
        s.description,
        s.image_url,
        s.website_url,
        s.address,
        s.phone,
        s.email,
        s.is_verified,
        s.created_at,
        CAST(COALESCE(AVG(sr.rating), 0) AS FLOAT) as "average_rating",
        COUNT(DISTINCT sr.id) as "ratings_count",
        COUNT(DISTINCT sf.id) as "feedbacks_count"
      FROM shelters s
      LEFT JOIN shelter_ratings sr ON sr.shelter_id = s.id
      LEFT JOIN shelter_feedbacks sf ON sf.shelter_id = s.id
      WHERE s.id = ${params.id}
      GROUP BY 
        s.id, 
        s.name, 
        s.description, 
        s.image_url,
        s.website_url,
        s.address,
        s.phone,
        s.email,
        s.is_verified,
        s.created_at    `;

    if (!animalshelter) {
      throw APIError.notFound("Shelter not found");
    }

    return animalshelter as AnimalShelterOutput;
  }
);

export const getList = api<PaginationParams, PaginatedAnimalSheltersList>(
  {
    expose: true,
    auth: true,
    method: "GET",
    path: "/shelters",
    tags: ["shelters"],
  },
  async (params) => {
    const { limit, offset } = getPagination(params);

    const result = await processDbList<AnimalShelterOutput>(
      db.query`
        SELECT 
             b.id,
      b.name,
      b.description,
      b.image_url,
      b.website_url,
      b.address,
      b.phone,
      b.email,
      b.is_verified,
      b.created_at,
          (SELECT COUNT(*) FROM shelter_ratings WHERE shelter_id = b.id) as ratings_count,
          (SELECT COUNT(*) FROM shelter_feedbacks WHERE shelter_id = b.id) as feedbacks_count
        FROM shelters b
        ORDER BY b.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    );

    const totalCount = await db.queryRow`
      SELECT COUNT(*) as count
      FROM shelters s
    `;

    return {
      items: result,
      total: totalCount?.count || 0,
    };
  }
);

export const getFilteredList = api<
  ShelterFilterParams & PaginationParams,
  FilteredSheltersList
>(
  {
    expose: true,
    auth: true,
    method: "GET",
    path: "/shelters/filter",
    tags: ["shelters"],
  },
  async (params) => {
    const {
      query = null,
      page = 1,
      limit = 10,
      fields = null,
      sort_by = null,
      sort_order = null,
    } = params;

    const { offset } = getPagination(params);

    const filterByFields = fields ? fields.split(",") : [];

    const hasIsVerifiedFilter =
      Array.isArray(filterByFields) &&
      filterByFields.includes(FilterByField.IS_VERIFIED);

    const result = await processDbList<AnimalShelterOutput>(
      db.query`
    SELECT 
      s.id,
      s.name,
      s.description,
      s.image_url,
      s.website_url,
      s.address,
      s.phone,
      s.email,
      s.is_verified,
      s.created_at,
      CAST(COALESCE(AVG(sr.rating), 0) AS FLOAT) as "average_rating",
      COUNT(DISTINCT sr.id) as "ratings_count",
      COUNT(DISTINCT sf.id) as "feedbacks_count"
    FROM shelters s
    LEFT JOIN shelter_ratings sr ON sr.shelter_id = s.id
    LEFT JOIN shelter_feedbacks sf ON sf.shelter_id = s.id
      WHERE
      (
        CASE
          WHEN ${query}::text IS NOT NULL AND ${query}::text != '' THEN
            s.name ILIKE ${`%${query}%`}::text OR 
            s.description ILIKE ${`%${query}%`}::text OR
            s.address ILIKE ${`%${query}%`}::text OR
            s.email ILIKE ${`%${query}%`}::text
          ELSE TRUE
        END
      )
      AND
      (
          CASE
          WHEN ${hasIsVerifiedFilter} THEN s.is_verified = true
          ELSE TRUE
        END
      )
    GROUP BY 
      s.id,
      s.name,
      s.description,
      s.image_url,
      s.website_url,
      s.address,
      s.phone,
      s.email,
      s.is_verified,
      s.created_at
      ORDER BY 
      CASE WHEN ${sort_by}::text = ${SortBy.RATING} AND ${sort_order}::text = ${SortOrder.ASC} THEN CAST(COALESCE(AVG(sr.rating), 0) AS FLOAT) END ,
      CASE WHEN ${sort_by}::text = ${SortBy.RATING} AND ${sort_order}::text = ${SortOrder.DESC} THEN CAST(COALESCE(AVG(sr.rating), 0) AS FLOAT) END DESC,
      CASE WHEN ${sort_by}::text = ${SortBy.CREATED_AT} AND ${sort_order}::text = ${SortOrder.ASC} THEN s.created_at END ASC,
      s.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `
    );

    const totalCount = await db.queryRow`
  SELECT COUNT(*) as count
  FROM shelters s
  WHERE
    CASE
      WHEN ${query}::text IS NOT NULL AND ${query}::text != '' THEN
        s.name ILIKE ${`%${query}%`}::text OR 
        s.description ILIKE ${`%${query}%`}::text OR
        s.address ILIKE ${`%${query}%`}::text OR
        s.email ILIKE ${`%${query}%`}::text
      ELSE TRUE
    END
    AND
      CASE
          WHEN ${hasIsVerifiedFilter} THEN s.is_verified = true
          ELSE TRUE
        END
`;

    return {
      items: result,
      total: totalCount?.count || 0,
      page,
      limit,
    };
  }
);

export const create = api<CreateAnimalShelterInput, AnimalShelterOutput>(
  {
    expose: true,
    auth: true,
    method: "POST",
    path: "/shelters",
    tags: ["shelters", "admin"],
  },
  async (input) => {
    const animalshelter = await db.queryRow`
      INSERT INTO shelters (
        name, 
        description, 
        image_url,
        website_url,
        address,
        phone,
        email
      )
      VALUES (
        ${input.name}, 
        ${input.description}, 
        ${input.image_url}, 
        ${input.website_url}, 
        ${input.address}, 
        ${input.phone}, 
        ${input.email}
      )
      RETURNING *
    `;

    return animalshelter as AnimalShelterOutput;
  }
);

export const update = api<
  UpdateAnimalShelterInput & IdParams,
  AnimalShelterOutput
>(
  {
    expose: true,
    auth: true,
    method: "PUT",
    path: "/shelters/:id",
    tags: ["shelters", "admin"],
  },
  async (input) => {
    const existingAnimalShelter = await db.queryRow`
      SELECT * FROM shelters WHERE id = ${input.id}
    `;

    if (!existingAnimalShelter) {
      throw APIError.notFound("Shelter not found");
    }

    const updatedAnimalShelter = await db.queryRow`
      UPDATE shelters 
      SET 
        name = ${input.name || existingAnimalShelter.name},
        description = ${input.description || existingAnimalShelter.description},
        image_url = ${input.image_url || existingAnimalShelter.image_url},
        website_url = ${input.website_url || existingAnimalShelter.website_url},
        address = ${input.address || existingAnimalShelter.address},
        phone = ${input.phone || existingAnimalShelter.phone},
        email = ${input.email || existingAnimalShelter.email},
      WHERE id = ${input.id}
      RETURNING *
    `;

    return updatedAnimalShelter as AnimalShelterOutput;
  }
);

export const remove = api<IdParams, MessageOutput>(
  {
    expose: true,
    auth: true,
    method: "DELETE",
    path: "/shelters/:id",
    tags: ["shelters", "admin"],
  },
  async (params) => {
    db.exec`DELETE FROM shelters WHERE id = ${params.id}`;

    return { message: "Shelter deleted successfully" };
  }
);

export const verify = api<IdParams, MessageOutput>(
  {
    expose: true,
    auth: true,
    method: "POST",
    path: "/shelters/:id/verify",
    tags: ["shelters", "admin"],
  },
  async (params) => {
    db.exec`UPDATE shelters SET is_verified = TRUE WHERE id = ${params.id}`;

    return { message: "Shelter verified successfully" };
  }
);

export const unverify = api<IdParams, MessageOutput>(
  {
    expose: true,
    auth: true,
    method: "POST",
    path: "/shelters/:id/unverify",
    tags: ["shelters", "admin"],
  },
  async (params) => {
    db.exec`UPDATE shelters SET is_verified = FALSE WHERE id = ${params.id}`;

    return { message: "Shelter unverified successfully" };
  }
);
