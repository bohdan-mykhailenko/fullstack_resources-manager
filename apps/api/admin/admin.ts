import { APIError, api } from "encore.dev/api";
import { secret } from "encore.dev/config";

import jwt from "jsonwebtoken";

import { db } from "@/database";

import {
  AdminInput,
  AdminJWTPayload,
  AdminOutput,
  UsersList,
  UsersStatistics,
} from "./interfaces";

const ADMIN_PASSWORD = secret("ADMIN_PASSWORD")();
const ADMIN_JWT_SECRET = secret("ADMIN_JWT_SECRET")();

const ADMIN_TOKEN_EXPIRY = "8h";

export const authenticate = api<AdminInput, AdminOutput>(
  { expose: true, auth: false, method: "POST", path: "/admin/auth" },
  async (input) => {
    if (input.password !== ADMIN_PASSWORD) {
      throw APIError.unauthenticated("Invalid admin password");
    }

    const token = jwt.sign(
      { type: "admin" } satisfies AdminJWTPayload,
      ADMIN_JWT_SECRET,
      {
        expiresIn: ADMIN_TOKEN_EXPIRY,
      }
    );

    return {
      message: "Authenticated successfully as admin",
      token,
    };
  }
);

export const usersStatistics = api<void, UsersStatistics>(
  { expose: true, auth: true, method: "GET", path: "/admin/statistics" },
  async () => {
    const statistics = await db.queryRow`
      WITH user_activity AS (
        SELECT 
          u.id,
          u.first_name,
          u.last_name,
          u.email,
          COUNT(DISTINCT sf.id) as feedbacks_count,
          COUNT(DISTINCT sr.id) as ratings_count
        FROM users u
        LEFT JOIN shelter_feedbacks sf ON u.id = sf.user_id
        LEFT JOIN shelter_ratings sr ON u.id = sr.user_id
        GROUP BY u.id, u.first_name, u.last_name, u.email
      )
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM shelter_feedbacks) as total_feedbacks,
        (SELECT COUNT(*) FROM shelter_ratings) as total_ratings,
        (
          SELECT json_agg(recent_users)
          FROM (
            SELECT id, first_name, last_name, email, created_at
            FROM users
            ORDER BY created_at DESC
            LIMIT 10
          ) recent_users
        ) as recent_users,
        (
          SELECT json_agg(active_users)
          FROM (
            SELECT 
              id,
              first_name,
              last_name,
              email,
              feedbacks_count,
              ratings_count
            FROM user_activity
            ORDER BY (feedbacks_count + ratings_count) DESC
            LIMIT 10
          ) active_users
        ) as most_active_users
    `;

    return {
      totalUsers: statistics?.total_users || 0,
      recentUsers: statistics?.recent_users || [],
      userActivity: {
        totalFeedbacks: statistics?.total_feedbacks || 0,
        totalRatings: statistics?.total_ratings || 0,
        mostActiveUsers: statistics?.most_active_users || [],
      },
    };
  }
);

export const usersList = api<void, UsersList>(
  { expose: true, auth: true, method: "GET", path: "/admin/users" },
  async () => {
    const result = await db.queryRow`
      WITH user_stats AS (
        SELECT 
          u.id,
          u.first_name,
          u.last_name,
          u.email,
          u.created_at,
          COUNT(DISTINCT sf.id) as feedbacks_count,
          COUNT(DISTINCT sr.id) as ratings_count
        FROM users u
        LEFT JOIN shelter_feedbacks sf ON u.id = sf.user_id
        LEFT JOIN shelter_ratings sr ON u.id = sr.user_id
        GROUP BY u.id, u.first_name, u.last_name, u.email, u.created_at
      ),
      total_count AS (
        SELECT COUNT(*) as total FROM users
      )
      SELECT 
        COALESCE(
          (SELECT json_agg(
            json_build_object(
              'id', s.id,
              'first_name', s.first_name,
              'last_name', s.last_name,
              'email', s.email,
              'created_at', s.created_at,
              'feedbacks_count', s.feedbacks_count,
              'ratings_count', s.ratings_count
            )
            ORDER BY s.created_at DESC
          )
          FROM user_stats s), '[]'
        ) as users,
        (SELECT total FROM total_count) as total
    `;

    return {
      users: result?.users || [],
      total: result?.total || 0,
    };
  }
);
