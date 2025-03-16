import { PaginatedList } from "@/shared/interfaces";

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
