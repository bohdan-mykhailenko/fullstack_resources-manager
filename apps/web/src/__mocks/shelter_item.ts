import type { AnimalShelterOutput } from "@/api/services/animal-shelters/core/interfaces";

export const mockShelter: AnimalShelterOutput = {
  id: "115274ca-2866-4517-be12-0b12eeef83fa",
  name: "Happy Tails Animal Sanctuary",
  description:
    "A state-of-the-art animal shelter providing comprehensive care and rehabilitation services for abandoned and rescued animals. We focus on creating a nurturing environment and finding perfect forever homes.",
  address: "1234 Shelter Lane, Sacramento, CA 95814",
  phone: "(916) 555-0123",
  email: "contact@happytails.org",
  websiteUrl: "https://happytails.org",
  imageUrl: "https://images.unsplash.com/photo-1581888227599-779811939961",
  ratingsCount: 156,
  feedbacksCount: 42,
  createdAt: "2024-01-15T12:09:43.058Z",
  updatedAt: "2024-03-15T08:30:00.000Z",
  isVerified: true,
  averageRating: 8,
};

export const mockShelterAsJson = `{
  "name": "Happy Tails Animal Sanctuary",
  "description": "A state-of-the-art animal shelter providing comprehensive care and rehabilitation services for abandoned and rescued animals. We focus on creating a nurturing environment and finding perfect forever homes.",
  "address": "1234 Shelter Lane, Sacramento, CA 95814",
  "phone": "(916) 555-0123",
  "email": "contact@happytails.org",
  "websiteUrl": "https://happytails.org",
  "imageUrl": "https://images.unsplash.com/photo-1581888227599-779811939961"
}`;
