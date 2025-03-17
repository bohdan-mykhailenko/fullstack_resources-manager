import { PaginationParams } from "@/api/interfaces";

export enum ShelterSortBy {
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
  websiteUrl: string;
  imageUrl: string;
  address: string;
  phone: string;
  ratingsCount?: number;
  feedbacksCount?: number;
  createdAt: string;
  updatedAt?: string;
  isVerified: boolean;
  averageRating?: number;
}

export interface CreateAnimalShelterInput {
  name: string;
  description: string;
  email: string;
  websiteUrl: string;
  imageUrl: string;
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
  isVerified?: boolean;
  sortBy?: ShelterSortBy;
  sortOrder?: SortOrder;
}

export interface FilteredSheltersList {
  items: AnimalShelterOutput[];
  total: number;
}
