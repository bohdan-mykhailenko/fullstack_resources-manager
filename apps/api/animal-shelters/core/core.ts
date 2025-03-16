import { APIError, api } from "encore.dev/api";

import { db } from "@/database";
import { IdParams, PaginationParams } from "@/shared/interfaces";
import { getPagination, processDbList } from "@/shared/utils";

import {
  AnimalShelterOutput,
  PaginatedAnimalSheltersList,
  SearchAnimalShelterParams,
  SearchedAnimalSheltersList,
  UnverifyShelterOutput,
  VerifyShelterOutput,
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
        s.image_url as "imageUrl",
        s.website_url as "websiteUrl",
        s.address,
        s.phone,
        s.email,
        s.is_verified as "isVerified",
        s.created_at as "createdAt",
        s.updated_at as "updatedAt",
        CAST(COALESCE(AVG(sr.rating), 0) AS FLOAT) as "averageRating",
        COUNT(DISTINCT sr.id) as "ratingsCount",
        COUNT(DISTINCT sf.id) as "feedbacksCount"
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
        s.created_at,
        s.updated_at
    `;

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
    const { page, limit, offset } = getPagination(params);

    const result = await processDbList<AnimalShelterOutput>(
      db.query`
        SELECT b.*, 
          (SELECT COUNT(*) FROM shelter_ratings WHERE shelter_id = b.id) as ratings_count,
          (SELECT COUNT(*) FROM shelter_feedbacks WHERE shelter_id = b.id) as feedbacks_count
        FROM shelters b
        ORDER BY b.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    );

    const totalCount = await db.queryRow`
      SELECT COUNT(*) as count FROM shelters
    `;

    return {
      items: result,
      total: totalCount?.count || 0,
      page,
      limit,
    };
  }
);

export const search = api<
  SearchAnimalShelterParams,
  SearchedAnimalSheltersList
>(
  {
    expose: true,
    auth: true,
    method: "GET",
    path: "/shelters/search",
    tags: ["shelters"],
  },
  async (params) => {
    const { query } = params;

    if (!query) {
      const result = await processDbList<AnimalShelterOutput>(
        db.query`
          SELECT * FROM shelters
          ORDER BY created_at DESC
        `
      );

      return { items: result };
    }

    const result = await processDbList<AnimalShelterOutput>(
      db.query`
        SELECT * FROM shelters 
        WHERE 
          name ILIKE ${`%${query}%`} OR 
          description ILIKE ${`%${query}%`}
        ORDER BY created_at DESC
      `
    );

    return { items: result };
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
        ${input.imageUrl}, 
        ${input.websiteUrl}, 
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
        image_url = ${input.imageUrl || existingAnimalShelter.image_url},
        website_url = ${input.websiteUrl || existingAnimalShelter.website_url},
        address = ${input.address || existingAnimalShelter.address},
        phone = ${input.phone || existingAnimalShelter.phone},
        email = ${input.email || existingAnimalShelter.email},
        updated_at = NOW()
      WHERE id = ${input.id}
      RETURNING *
    `;

    return updatedAnimalShelter as AnimalShelterOutput;
  }
);

export const remove = api<IdParams, void>(
  {
    expose: true,
    auth: true,
    method: "DELETE",
    path: "/shelters/:id",
    tags: ["shelters", "admin"],
  },
  async (params) => {
    db.query`DELETE FROM shelters WHERE id = ${params.id}`;

    return { message: "Shelter deleted successfully" };
  }
);

export const verify = api<IdParams, VerifyShelterOutput>(
  {
    expose: true,
    auth: true,
    method: "POST",
    path: "/shelters/:id/verify",
    tags: ["shelters", "admin"],
  },
  async (params) => {
    db.query`UPDATE shelters SET is_verified = TRUE WHERE id = ${params.id}`;

    return { message: "Shelter verified successfully" };
  }
);

export const unverify = api<IdParams, UnverifyShelterOutput>(
  {
    expose: true,
    auth: true,
  },
  async (params) => {
    db.query`UPDATE shelters SET is_verified = FALSE WHERE id = ${params.id}`;

    return { message: "Shelter unverified successfully" };
  }
);
