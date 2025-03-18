import { APIError, api } from "encore.dev/api";
import { secret } from "encore.dev/config";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "@/database";

import { sendConfirmationEmail } from "./emails";
import {
  ConfirmEmailOutput,
  ConfirmEmailParams,
  RefreshTokenInput,
  RefreshTokenOutput,
  UserJWTPayload,
  UserOutput,
} from "./interfaces";
import { generateTokens } from "./utils";
import { SignInInput, SignUpInput } from "./validation";

const JWT_SECRET = secret("JWT_SECRET")();
const CONFIRMATION_SECRET = secret("CONFIRMATION_SECRET")();

export const signUp = api<SignUpInput, UserOutput>(
  { expose: true, auth: false, method: "POST", path: "/sign-up" },
  async (input) => {
    const { email, password, firstName, lastName } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.queryRow`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    const user = await db.queryRow`
      INSERT INTO users (email, password, first_name, last_name)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName})
      RETURNING id
    `;

    if (!user || !user.id) {
      throw APIError.internal("Failed to create user");
    }

    const { accessToken, refreshToken } = generateTokens(user?.id);

    try {
      await sendConfirmationEmail({
        firstName,
        email,
        confirmationToken: jwt.sign({ userId: user.id }, CONFIRMATION_SECRET, {
          expiresIn: "8h",
        }),
      });
    } catch (error) {
      console.error(error);
      throw APIError.internal("Failed to send confirmation email");
    }

    return {
      id: user.id,
      accessToken,
      refreshToken,
      email,
      firstName,
      lastName,
      is_confirmed: false,
    };
  }
);

export const signIn = api<SignInInput, UserOutput>(
  { expose: true, auth: false, method: "POST", path: "/sign-in" },
  async (input) => {
    const { email, password } = input;
    const user = await db.queryRow`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (!user) {
      throw APIError.notFound("User with this email not found");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw APIError.unauthenticated("Wrong password");
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    return {
      accessToken,
      refreshToken,
      id: user.id,
      email,
      firstName: user.first_name,
      lastName: user.last_name,
      is_confirmed: user.is_confirmed,
    };
  }
);

export const refresh = api<RefreshTokenInput, RefreshTokenOutput>(
  { expose: true, auth: false, method: "POST", path: "/refresh-token" },
  async (input) => {
    const { refreshToken } = input;

    let payload;

    try {
      payload = jwt.verify(refreshToken, JWT_SECRET);
    } catch {
      throw APIError.unauthenticated("Invalid refresh token");
    }

    const { userId } = payload as UserJWTPayload;

    const { accessToken } = generateTokens(Number(userId));

    return { accessToken };
  }
);

export const confirmEmail = api<ConfirmEmailParams, ConfirmEmailOutput>(
  { expose: true, auth: false, method: "POST", path: "/confirm-email/:token" },
  async ({ token }) => {
    const payload = jwt.verify(token, CONFIRMATION_SECRET);

    const { userId } = payload as UserJWTPayload;

    await db.exec`
      UPDATE users SET is_confirmed = TRUE WHERE id = ${userId}
    `;

    return { message: "Email is successfully confirmed" };
  }
);
