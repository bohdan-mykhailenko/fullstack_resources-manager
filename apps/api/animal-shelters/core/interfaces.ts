import { PaginatedList } from "@/shared/interfaces";

import { SortBy, SortOrder } from "./enums";

export interface AnimalShelterListOutput {
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
}

export interface AnimalShelterOutput extends AnimalShelterListOutput {
  average_rating?: number;
}

export interface PaginatedAnimalSheltersList
  extends PaginatedList<AnimalShelterListOutput> {}

export interface ShelterFilterParams {
  query?: string;
  fields?: string; // FilterByField[];
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export interface FilteredSheltersList {
  items: AnimalShelterListOutput[];
  total: number;
  page: number;
  limit: number;
}
