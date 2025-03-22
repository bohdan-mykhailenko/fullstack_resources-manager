/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ActiveUser = {
  __typename?: 'ActiveUser';
  email: Scalars['String']['output'];
  feedbacks_count: Scalars['Int']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  ratings_count: Scalars['Int']['output'];
};

export type AdminAuthInput = {
  password: Scalars['String']['input'];
};

export type AdminAuthResponse = {
  __typename?: 'AdminAuthResponse';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type AnimalShelterOutput = {
  __typename?: 'AnimalShelterOutput';
  address: Scalars['String']['output'];
  average_rating?: Maybe<Scalars['Float']['output']>;
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  feedbacks_count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  image_url: Scalars['String']['output'];
  is_verified: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  ratings_count?: Maybe<Scalars['Int']['output']>;
  website_url: Scalars['String']['output'];
};

export type CreateShelterInput = {
  address: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  image_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  website_url: Scalars['String']['input'];
};

export type DetailedUser = {
  __typename?: 'DetailedUser';
  created_at: Scalars['String']['output'];
  email: Scalars['String']['output'];
  feedbacks_count: Scalars['Int']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  ratings_count: Scalars['Int']['output'];
};

export type FeedbackOutput = {
  __typename?: 'FeedbackOutput';
  content: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
};

export type FeedbacksList = {
  __typename?: 'FeedbacksList';
  items: Array<FeedbackOutput>;
  total: Scalars['Int']['output'];
};

export enum FilterByField {
  IsVerified = 'IS_VERIFIED'
}

export type FilteredSheltersList = {
  __typename?: 'FilteredSheltersList';
  items: Array<AnimalShelterOutput>;
  total: Scalars['Int']['output'];
};

export type MessageOutput = {
  __typename?: 'MessageOutput';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFeedback: FeedbackOutput;
  adminAuth: AdminAuthResponse;
  confirmEmail: MessageOutput;
  createShelter: AnimalShelterOutput;
  deleteShelter: MessageOutput;
  rateShelter: MessageOutput;
  refreshToken: RefreshTokenOutput;
  signIn: SignInOutput;
  signUp: SignUpOutput;
  unverifyShelter: MessageOutput;
  updateShelter: AnimalShelterOutput;
  verifyShelter: MessageOutput;
};


export type MutationAddFeedbackArgs = {
  content: Scalars['String']['input'];
  shelterId: Scalars['String']['input'];
};


export type MutationAdminAuthArgs = {
  password: Scalars['String']['input'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateShelterArgs = {
  params: CreateShelterInput;
};


export type MutationDeleteShelterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRateShelterArgs = {
  rating: Scalars['Int']['input'];
  shelterId: Scalars['ID']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  params: SignInInput;
};


export type MutationSignUpArgs = {
  params: SignUpInput;
};


export type MutationUnverifyShelterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterArgs = {
  id: Scalars['ID']['input'];
  params: UpdateShelterInput;
};


export type MutationVerifyShelterArgs = {
  id: Scalars['ID']['input'];
};

export type PaginatedAnimalSheltersList = {
  __typename?: 'PaginatedAnimalSheltersList';
  items: Array<AnimalShelterOutput>;
  total: Scalars['Int']['output'];
};

export type PaginationParams = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  feedbacksList: FeedbacksList;
  filterSheltersList: FilteredSheltersList;
  getShelter: AnimalShelterOutput;
  sheltersList: PaginatedAnimalSheltersList;
  usersList: UsersList;
  usersStatistics: UsersStatistics;
};


export type QueryFeedbacksListArgs = {
  params?: InputMaybe<PaginationParams>;
  shelterId: Scalars['String']['input'];
};


export type QueryFilterSheltersListArgs = {
  params: ShelterFilterParams;
};


export type QueryGetShelterArgs = {
  id: Scalars['String']['input'];
};


export type QuerySheltersListArgs = {
  params?: InputMaybe<PaginationParams>;
};

export type RecentUser = {
  __typename?: 'RecentUser';
  created_at: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
};

export type RefreshTokenOutput = {
  __typename?: 'RefreshTokenOutput';
  accessToken: Scalars['String']['output'];
};

export type ShelterFilterParams = {
  fields?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInOutput = {
  __typename?: 'SignInOutput';
  accessToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  is_confirmed: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpOutput = {
  __typename?: 'SignUpOutput';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  is_confirmed: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
};

export enum SortBy {
  CreatedAt = 'CREATED_AT',
  Rating = 'RATING'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateShelterInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  website_url?: InputMaybe<Scalars['String']['input']>;
};

export type UserActivity = {
  __typename?: 'UserActivity';
  mostActiveUsers: Array<ActiveUser>;
  totalFeedbacks: Scalars['Int']['output'];
  totalRatings: Scalars['Int']['output'];
};

export type UsersList = {
  __typename?: 'UsersList';
  total: Scalars['Int']['output'];
  users: Array<DetailedUser>;
};

export type UsersStatistics = {
  __typename?: 'UsersStatistics';
  recentUsers: Array<RecentUser>;
  totalUsers: Scalars['Int']['output'];
  userActivity: UserActivity;
};

export type FilterSheltersListQueryVariables = Exact<{
  params: ShelterFilterParams;
}>;


export type FilterSheltersListQuery = { __typename?: 'Query', filterSheltersList: { __typename?: 'FilteredSheltersList', total: number, items: Array<{ __typename?: 'AnimalShelterOutput', id: string, name: string, description: string, email: string, website_url: string, image_url: string, address: string, phone: string, ratings_count?: number | null, feedbacks_count?: number | null, created_at: string, average_rating?: number | null, is_verified: boolean }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const FilterSheltersListDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<FilterSheltersListQuery, FilterSheltersListQueryVariables>;