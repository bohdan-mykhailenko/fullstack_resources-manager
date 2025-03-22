import { UserOutput } from "../users/interfaces";

export interface AdminInput {
  password: string;
}

export interface AdminOutput {
  message: string;
  token: string;
}

export interface UsersStatistics {
  totalUsers: number;
  recentUsers: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
  }[];
  userActivity: {
    totalFeedbacks: number;
    totalRatings: number;
    mostActiveUsers: {
      id: number;
      first_name: string;
      last_name: string;
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
