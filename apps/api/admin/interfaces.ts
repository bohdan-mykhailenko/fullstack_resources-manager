import { JwtPayload } from "jsonwebtoken";

import { UserOutput } from "@/users/interfaces";

export interface AdminInput {
  password: string;
}

export interface AdminOutput {
  message: string;
  token: string;
}

export interface AdminJWTPayload extends JwtPayload {
  type: "admin";
}

export interface UsersStatistics {
  totalUsers: number;
  recentUsers: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
  }[];
  userActivity: {
    totalFeedbacks: number;
    totalRatings: number;
    mostActiveUsers: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      feedbacksCount: number;
      ratingsCount: number;
    }[];
  };
}

export interface DetailedUserOutput
  extends Omit<UserOutput, "accessToken" | "refreshToken"> {
  createdAt: string;
  feedbacksCount: number;
  ratingsCount: number;
}

export interface UsersList {
  users: DetailedUserOutput[];
  total: number;
}
