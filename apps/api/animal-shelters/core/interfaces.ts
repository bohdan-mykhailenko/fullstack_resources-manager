import { PaginatedList } from "@/shared/interfaces";

import { FilterByField, SortBy, SortOrder } from "./enums";

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
  createdAt: Date;
  updatedAt?: Date;
  averageRating?: number;
  isVerified: boolean;
  totalCount?: number;
}

export interface SearchedAnimalSheltersList {
  items: AnimalShelterOutput[];
}

export interface PaginatedAnimalSheltersList
  extends PaginatedList<AnimalShelterOutput> {}

export interface SearchAnimalShelterParams {
  query?: string;
}

export interface VerifyShelterOutput {
  message: string;
}

export interface UnverifyShelterOutput {
  message: string;
}

export interface ShelterFilterParams {
  query?: string;
  fields?: string; // FilterByField[];
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export interface FilteredSheltersList {
  items: AnimalShelterOutput[];
  total: number;
  page: number;
  limit: number;
}
