/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query FilterSheltersList($params: ShelterFilterParams!) {\n    filterSheltersList(params: $params) {\n      items {\n        id\n        name\n        description\n        email\n        website_url\n        image_url\n        address\n        phone\n        ratings_count\n        feedbacks_count\n        created_at\n        average_rating\n        is_verified\n      }\n      total\n    }\n  }\n": typeof types.FilterSheltersListDocument,
    "\n    query FilterSheltersList($params: ShelterFilterParams!) {\n      filterSheltersList(params: $params) {\n        items {\n          id\n          name\n          description\n          email\n          website_url\n          image_url\n          address\n          phone\n          ratings_count\n          feedbacks_count\n          created_at\n          average_rating\n          is_verified\n        }\n        total\n      }\n    }\n  ": typeof types.FilterSheltersListDocument,
};
const documents: Documents = {
    "\n  query FilterSheltersList($params: ShelterFilterParams!) {\n    filterSheltersList(params: $params) {\n      items {\n        id\n        name\n        description\n        email\n        website_url\n        image_url\n        address\n        phone\n        ratings_count\n        feedbacks_count\n        created_at\n        average_rating\n        is_verified\n      }\n      total\n    }\n  }\n": types.FilterSheltersListDocument,
    "\n    query FilterSheltersList($params: ShelterFilterParams!) {\n      filterSheltersList(params: $params) {\n        items {\n          id\n          name\n          description\n          email\n          website_url\n          image_url\n          address\n          phone\n          ratings_count\n          feedbacks_count\n          created_at\n          average_rating\n          is_verified\n        }\n        total\n      }\n    }\n  ": types.FilterSheltersListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FilterSheltersList($params: ShelterFilterParams!) {\n    filterSheltersList(params: $params) {\n      items {\n        id\n        name\n        description\n        email\n        website_url\n        image_url\n        address\n        phone\n        ratings_count\n        feedbacks_count\n        created_at\n        average_rating\n        is_verified\n      }\n      total\n    }\n  }\n"): typeof import('./graphql').FilterSheltersListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query FilterSheltersList($params: ShelterFilterParams!) {\n      filterSheltersList(params: $params) {\n        items {\n          id\n          name\n          description\n          email\n          website_url\n          image_url\n          address\n          phone\n          ratings_count\n          feedbacks_count\n          created_at\n          average_rating\n          is_verified\n        }\n        total\n      }\n    }\n  "): typeof import('./graphql').FilterSheltersListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
