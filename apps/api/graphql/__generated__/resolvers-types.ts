import { GraphQLResolveInfo } from "graphql";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type ActiveUser = {
  __typename?: "ActiveUser";
  email: Scalars["String"]["output"];
  feedbacks_count: Scalars["Int"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  lastName: Scalars["String"]["output"];
  ratings_count: Scalars["Int"]["output"];
};

export type AdminAuthInput = {
  password: Scalars["String"]["input"];
};

export type AdminAuthResponse = {
  __typename?: "AdminAuthResponse";
  message: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
};

export type AnimalShelterOutput = {
  __typename?: "AnimalShelterOutput";
  address: Scalars["String"]["output"];
  average_rating?: Maybe<Scalars["Float"]["output"]>;
  created_at: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  feedbacks_count?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["String"]["output"];
  image_url: Scalars["String"]["output"];
  is_verified: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  phone: Scalars["String"]["output"];
  ratings_count?: Maybe<Scalars["Int"]["output"]>;
  website_url: Scalars["String"]["output"];
};

export type CreateShelterInput = {
  address: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  image_url: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  website_url: Scalars["String"]["input"];
};

export type DetailedUser = {
  __typename?: "DetailedUser";
  created_at: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  feedbacks_count: Scalars["Int"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  lastName: Scalars["String"]["output"];
  ratings_count: Scalars["Int"]["output"];
};

export type FeedbackOutput = {
  __typename?: "FeedbackOutput";
  content: Scalars["String"]["output"];
  created_at: Scalars["String"]["output"];
  first_name: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  last_name: Scalars["String"]["output"];
};

export type FeedbacksList = {
  __typename?: "FeedbacksList";
  items: Array<FeedbackOutput>;
  total: Scalars["Int"]["output"];
};

export enum FilterByField {
  IsVerified = "IS_VERIFIED",
}

export type FilteredSheltersList = {
  __typename?: "FilteredSheltersList";
  items: Array<AnimalShelterOutput>;
  total: Scalars["Int"]["output"];
};

export type MessageOutput = {
  __typename?: "MessageOutput";
  message: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
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
  content: Scalars["String"]["input"];
  shelterId: Scalars["String"]["input"];
};

export type MutationAdminAuthArgs = {
  password: Scalars["String"]["input"];
};

export type MutationConfirmEmailArgs = {
  token: Scalars["String"]["input"];
};

export type MutationCreateShelterArgs = {
  params: CreateShelterInput;
};

export type MutationDeleteShelterArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRateShelterArgs = {
  rating: Scalars["Int"]["input"];
  shelterId: Scalars["ID"]["input"];
};

export type MutationRefreshTokenArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type MutationSignInArgs = {
  params: SignInInput;
};

export type MutationSignUpArgs = {
  params: SignUpInput;
};

export type MutationUnverifyShelterArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateShelterArgs = {
  id: Scalars["ID"]["input"];
  params: UpdateShelterInput;
};

export type MutationVerifyShelterArgs = {
  id: Scalars["ID"]["input"];
};

export type PaginatedAnimalSheltersList = {
  __typename?: "PaginatedAnimalSheltersList";
  items: Array<AnimalShelterOutput>;
  total: Scalars["Int"]["output"];
};

export type PaginationParams = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  feedbacksList: FeedbacksList;
  filterSheltersList: FilteredSheltersList;
  getShelter: AnimalShelterOutput;
  sheltersList: PaginatedAnimalSheltersList;
  usersList: UsersList;
  usersStatistics: UsersStatistics;
};

export type QueryFeedbacksListArgs = {
  params?: InputMaybe<PaginationParams>;
  shelterId: Scalars["String"]["input"];
};

export type QueryFilterSheltersListArgs = {
  params: ShelterFilterParams;
};

export type QueryGetShelterArgs = {
  id: Scalars["String"]["input"];
};

export type QuerySheltersListArgs = {
  params?: InputMaybe<PaginationParams>;
};

export type RecentUser = {
  __typename?: "RecentUser";
  created_at: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  lastName: Scalars["String"]["output"];
};

export type RefreshTokenOutput = {
  __typename?: "RefreshTokenOutput";
  accessToken: Scalars["String"]["output"];
};

export type ShelterFilterParams = {
  fields?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  sort_by?: InputMaybe<Scalars["String"]["input"]>;
  sort_order?: InputMaybe<Scalars["String"]["input"]>;
};

export type SignInInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignInOutput = {
  __typename?: "SignInOutput";
  accessToken: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  is_confirmed: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
};

export type SignUpInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignUpOutput = {
  __typename?: "SignUpOutput";
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  is_confirmed: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
};

export enum SortBy {
  CreatedAt = "CREATED_AT",
  Rating = "RATING",
}

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export type UpdateShelterInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  image_url?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  website_url?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserActivity = {
  __typename?: "UserActivity";
  mostActiveUsers: Array<ActiveUser>;
  totalFeedbacks: Scalars["Int"]["output"];
  totalRatings: Scalars["Int"]["output"];
};

export type UsersList = {
  __typename?: "UsersList";
  total: Scalars["Int"]["output"];
  users: Array<DetailedUser>;
};

export type UsersStatistics = {
  __typename?: "UsersStatistics";
  recentUsers: Array<RecentUser>;
  totalUsers: Scalars["Int"]["output"];
  userActivity: UserActivity;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ActiveUser: ResolverTypeWrapper<ActiveUser>;
  AdminAuthInput: AdminAuthInput;
  AdminAuthResponse: ResolverTypeWrapper<AdminAuthResponse>;
  AnimalShelterOutput: ResolverTypeWrapper<AnimalShelterOutput>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  CreateShelterInput: CreateShelterInput;
  DetailedUser: ResolverTypeWrapper<DetailedUser>;
  FeedbackOutput: ResolverTypeWrapper<FeedbackOutput>;
  FeedbacksList: ResolverTypeWrapper<FeedbacksList>;
  FilterByField: FilterByField;
  FilteredSheltersList: ResolverTypeWrapper<FilteredSheltersList>;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  MessageOutput: ResolverTypeWrapper<MessageOutput>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedAnimalSheltersList: ResolverTypeWrapper<PaginatedAnimalSheltersList>;
  PaginationParams: PaginationParams;
  Query: ResolverTypeWrapper<{}>;
  RecentUser: ResolverTypeWrapper<RecentUser>;
  RefreshTokenOutput: ResolverTypeWrapper<RefreshTokenOutput>;
  ShelterFilterParams: ShelterFilterParams;
  SignInInput: SignInInput;
  SignInOutput: ResolverTypeWrapper<SignInOutput>;
  SignUpInput: SignUpInput;
  SignUpOutput: ResolverTypeWrapper<SignUpOutput>;
  SortBy: SortBy;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UpdateShelterInput: UpdateShelterInput;
  UserActivity: ResolverTypeWrapper<UserActivity>;
  UsersList: ResolverTypeWrapper<UsersList>;
  UsersStatistics: ResolverTypeWrapper<UsersStatistics>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ActiveUser: ActiveUser;
  AdminAuthInput: AdminAuthInput;
  AdminAuthResponse: AdminAuthResponse;
  AnimalShelterOutput: AnimalShelterOutput;
  Boolean: Scalars["Boolean"]["output"];
  CreateShelterInput: CreateShelterInput;
  DetailedUser: DetailedUser;
  FeedbackOutput: FeedbackOutput;
  FeedbacksList: FeedbacksList;
  FilteredSheltersList: FilteredSheltersList;
  Float: Scalars["Float"]["output"];
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  MessageOutput: MessageOutput;
  Mutation: {};
  PaginatedAnimalSheltersList: PaginatedAnimalSheltersList;
  PaginationParams: PaginationParams;
  Query: {};
  RecentUser: RecentUser;
  RefreshTokenOutput: RefreshTokenOutput;
  ShelterFilterParams: ShelterFilterParams;
  SignInInput: SignInInput;
  SignInOutput: SignInOutput;
  SignUpInput: SignUpInput;
  SignUpOutput: SignUpOutput;
  String: Scalars["String"]["output"];
  UpdateShelterInput: UpdateShelterInput;
  UserActivity: UserActivity;
  UsersList: UsersList;
  UsersStatistics: UsersStatistics;
}>;

export type ActiveUserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ActiveUser"] = ResolversParentTypes["ActiveUser"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  feedbacks_count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ratings_count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdminAuthResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AdminAuthResponse"] = ResolversParentTypes["AdminAuthResponse"],
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AnimalShelterOutputResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AnimalShelterOutput"] = ResolversParentTypes["AnimalShelterOutput"],
> = ResolversObject<{
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  average_rating?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  feedbacks_count?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image_url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  is_verified?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ratings_count?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  website_url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DetailedUserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DetailedUser"] = ResolversParentTypes["DetailedUser"],
> = ResolversObject<{
  created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  feedbacks_count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ratings_count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeedbackOutputResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeedbackOutput"] = ResolversParentTypes["FeedbackOutput"],
> = ResolversObject<{
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeedbacksListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeedbacksList"] = ResolversParentTypes["FeedbacksList"],
> = ResolversObject<{
  items?: Resolver<
    Array<ResolversTypes["FeedbackOutput"]>,
    ParentType,
    ContextType
  >;
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FilteredSheltersListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FilteredSheltersList"] = ResolversParentTypes["FilteredSheltersList"],
> = ResolversObject<{
  items?: Resolver<
    Array<ResolversTypes["AnimalShelterOutput"]>,
    ParentType,
    ContextType
  >;
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageOutputResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MessageOutput"] = ResolversParentTypes["MessageOutput"],
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  addFeedback?: Resolver<
    ResolversTypes["FeedbackOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationAddFeedbackArgs, "content" | "shelterId">
  >;
  adminAuth?: Resolver<
    ResolversTypes["AdminAuthResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationAdminAuthArgs, "password">
  >;
  confirmEmail?: Resolver<
    ResolversTypes["MessageOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationConfirmEmailArgs, "token">
  >;
  createShelter?: Resolver<
    ResolversTypes["AnimalShelterOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateShelterArgs, "params">
  >;
  deleteShelter?: Resolver<
    ResolversTypes["MessageOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteShelterArgs, "id">
  >;
  rateShelter?: Resolver<
    ResolversTypes["MessageOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationRateShelterArgs, "rating" | "shelterId">
  >;
  refreshToken?: Resolver<
    ResolversTypes["RefreshTokenOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshTokenArgs, "refreshToken">
  >;
  signIn?: Resolver<
    ResolversTypes["SignInOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "params">
  >;
  signUp?: Resolver<
    ResolversTypes["SignUpOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "params">
  >;
  unverifyShelter?: Resolver<
    ResolversTypes["MessageOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationUnverifyShelterArgs, "id">
  >;
  updateShelter?: Resolver<
    ResolversTypes["AnimalShelterOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateShelterArgs, "id" | "params">
  >;
  verifyShelter?: Resolver<
    ResolversTypes["MessageOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationVerifyShelterArgs, "id">
  >;
}>;

export type PaginatedAnimalSheltersListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PaginatedAnimalSheltersList"] = ResolversParentTypes["PaginatedAnimalSheltersList"],
> = ResolversObject<{
  items?: Resolver<
    Array<ResolversTypes["AnimalShelterOutput"]>,
    ParentType,
    ContextType
  >;
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  feedbacksList?: Resolver<
    ResolversTypes["FeedbacksList"],
    ParentType,
    ContextType,
    RequireFields<QueryFeedbacksListArgs, "shelterId">
  >;
  filterSheltersList?: Resolver<
    ResolversTypes["FilteredSheltersList"],
    ParentType,
    ContextType,
    RequireFields<QueryFilterSheltersListArgs, "params">
  >;
  getShelter?: Resolver<
    ResolversTypes["AnimalShelterOutput"],
    ParentType,
    ContextType,
    RequireFields<QueryGetShelterArgs, "id">
  >;
  sheltersList?: Resolver<
    ResolversTypes["PaginatedAnimalSheltersList"],
    ParentType,
    ContextType,
    Partial<QuerySheltersListArgs>
  >;
  usersList?: Resolver<ResolversTypes["UsersList"], ParentType, ContextType>;
  usersStatistics?: Resolver<
    ResolversTypes["UsersStatistics"],
    ParentType,
    ContextType
  >;
}>;

export type RecentUserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RecentUser"] = ResolversParentTypes["RecentUser"],
> = ResolversObject<{
  created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RefreshTokenOutputResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RefreshTokenOutput"] = ResolversParentTypes["RefreshTokenOutput"],
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignInOutputResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SignInOutput"] = ResolversParentTypes["SignInOutput"],
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  is_confirmed?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignUpOutputResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SignUpOutput"] = ResolversParentTypes["SignUpOutput"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  is_confirmed?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserActivityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UserActivity"] = ResolversParentTypes["UserActivity"],
> = ResolversObject<{
  mostActiveUsers?: Resolver<
    Array<ResolversTypes["ActiveUser"]>,
    ParentType,
    ContextType
  >;
  totalFeedbacks?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalRatings?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UsersList"] = ResolversParentTypes["UsersList"],
> = ResolversObject<{
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  users?: Resolver<
    Array<ResolversTypes["DetailedUser"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersStatisticsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UsersStatistics"] = ResolversParentTypes["UsersStatistics"],
> = ResolversObject<{
  recentUsers?: Resolver<
    Array<ResolversTypes["RecentUser"]>,
    ParentType,
    ContextType
  >;
  totalUsers?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  userActivity?: Resolver<
    ResolversTypes["UserActivity"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  ActiveUser?: ActiveUserResolvers<ContextType>;
  AdminAuthResponse?: AdminAuthResponseResolvers<ContextType>;
  AnimalShelterOutput?: AnimalShelterOutputResolvers<ContextType>;
  DetailedUser?: DetailedUserResolvers<ContextType>;
  FeedbackOutput?: FeedbackOutputResolvers<ContextType>;
  FeedbacksList?: FeedbacksListResolvers<ContextType>;
  FilteredSheltersList?: FilteredSheltersListResolvers<ContextType>;
  MessageOutput?: MessageOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedAnimalSheltersList?: PaginatedAnimalSheltersListResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecentUser?: RecentUserResolvers<ContextType>;
  RefreshTokenOutput?: RefreshTokenOutputResolvers<ContextType>;
  SignInOutput?: SignInOutputResolvers<ContextType>;
  SignUpOutput?: SignUpOutputResolvers<ContextType>;
  UserActivity?: UserActivityResolvers<ContextType>;
  UsersList?: UsersListResolvers<ContextType>;
  UsersStatistics?: UsersStatisticsResolvers<ContextType>;
}>;
