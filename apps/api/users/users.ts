import { APIError, api } from "encore.dev/api";
import { secret } from "encore.dev/config";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "@/database";
import { MessageOutput } from "@/shared/interfaces";

import { sendConfirmationEmail } from "./emails";
import {
  ConfirmEmailParams,
  RefreshTokenInput,
  RefreshTokenOutput,
  SignInOutput,
  SignUpOutput,
  UserJWTPayload,
} from "./interfaces";
import {
  generateConfirmationToken,
  generateTokens,
  verifyConfirmationToken,
} from "./utils";
import { SignInInput, SignUpInput } from "./validation";

const JWT_SECRET = secret("JWT_SECRET")();
const CONFIRMATION_SECRET = secret("CONFIRMATION_SECRET")();

export const signUp = api<SignUpInput, SignUpOutput>(
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

    try {
      await sendConfirmationEmail({
        firstName,
        email,
        confirmationToken: generateConfirmationToken(user.id),
      });
    } catch (error) {
      console.error(error);
      throw APIError.internal("Failed to send confirmation email");
    }

    return {
      id: Number(user.id),
      email,
      firstName,
      lastName,
      is_confirmed: false,
    };
  }
);

export const signIn = api<SignInInput, SignInOutput>(
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

export const confirmEmail = api<ConfirmEmailParams, MessageOutput>(
  { expose: true, auth: false, method: "POST", path: "/confirm-email/:token" },
  async ({ token }) => {
    const verifiedResult = verifyConfirmationToken(token);

    if (!verifiedResult) {
      throw APIError.unauthenticated("Invalid confirmation token");
    }

    const { userId } = verifiedResult;

    await db.exec`
      UPDATE users SET is_confirmed = TRUE WHERE id = ${userId}
    `;

    return { message: "Email is successfully confirmed" };
  }
);
