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

export interface SearchAnimalShelterParams {
  query?: string;
}

export interface SearchedAnimalSheltersList {
  items: AnimalShelterOutput[];
}
