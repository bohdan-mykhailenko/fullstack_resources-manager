import { graphql } from "@/graphql";

export const FilterSheltersListQuery = graphql(`
  query FilterSheltersList($params: ShelterFilterParams!) {
    filterSheltersList(params: $params) {
      items {
        id
        name
        description
        email
        website_url
        image_url
        address
        phone
        ratings_count
        feedbacks_count
        created_at
        average_rating
        is_verified
      }
      total
    }
  }
`);
