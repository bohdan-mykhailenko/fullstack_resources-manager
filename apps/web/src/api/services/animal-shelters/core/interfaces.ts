import { PaginationParams } from "@/api/interfaces";

export enum SortBy {
  RATING = "rating",
  CREATED_AT = "created_at",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface AnimalShelterOutput {
  id: string;
  name: string;
  description: string;
  email: string;
  website_url: string;
  image_url: string;
  address: string;
  phone: string;
  ratings_count?: number;
  feedbacks_count?: number;
  created_at: string;
  is_verified: boolean;
  average_rating?: number;
}

export interface CreateAnimalShelterInput {
  name: string;
  description: string;
  email: string;
  website_url: string;
  image_url: string;
  address: string;
  phone: string;
}

export interface PaginatedAnimalSheltersList {
  items: AnimalShelterOutput[];
  total: number;
  page: number;
  limit: number;
}

export interface ShelterFilterParams extends PaginationParams {
  query?: string;
  is_verified?: boolean;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export interface FilteredSheltersList {
  items: AnimalShelterOutput[];
  total: number;
}
