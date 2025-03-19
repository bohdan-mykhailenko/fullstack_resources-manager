import { JwtPayload } from "jsonwebtoken";

import { MessageOutput } from "@/shared/interfaces";
import { UserOutput } from "@/users/interfaces";

export interface AdminInput {
  password: string;
}

export interface AdminOutput extends MessageOutput {
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
    created_at: string;
  }[];
  userActivity: {
    totalFeedbacks: number;
    totalRatings: number;
    mostActiveUsers: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      feedbacks_count: number;
      ratings_count: number;
    }[];
  };
}

export interface DetailedUserOutput
  extends Omit<UserOutput, "accessToken" | "refreshToken"> {
  created_at: string;
  feedbacks_count: number;
  ratings_count: number;
}

export interface UsersList {
  users: DetailedUserOutput[];
  total: number;
}
