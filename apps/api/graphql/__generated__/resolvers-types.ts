import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AnimalShelterOutput = {
  __typename?: 'AnimalShelterOutput';
  address: Scalars['String']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  signUp: SignUpOutput;
};


export type MutationSignUpArgs = {
  params: SignUpInput;
};

export type PaginatedAnimalSheltersList = {
  __typename?: 'PaginatedAnimalSheltersList';
  items: Array<AnimalShelterOutput>;
  total: Scalars['Int']['output'];
};

export type PaginationParams = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  sheltersList: PaginatedAnimalSheltersList;
};


export type QuerySheltersListArgs = {
  params: PaginationParams;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AnimalShelterOutput: ResolverTypeWrapper<AnimalShelterOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedAnimalSheltersList: ResolverTypeWrapper<PaginatedAnimalSheltersList>;
  PaginationParams: PaginationParams;
  Query: ResolverTypeWrapper<{}>;
  SignUpInput: SignUpInput;
  SignUpOutput: ResolverTypeWrapper<SignUpOutput>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AnimalShelterOutput: AnimalShelterOutput;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PaginatedAnimalSheltersList: PaginatedAnimalSheltersList;
  PaginationParams: PaginationParams;
  Query: {};
  SignUpInput: SignUpInput;
  SignUpOutput: SignUpOutput;
  String: Scalars['String']['output'];
}>;

export type AnimalShelterOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnimalShelterOutput'] = ResolversParentTypes['AnimalShelterOutput']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feedbacks_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ratings_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  website_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  signUp?: Resolver<ResolversTypes['SignUpOutput'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'params'>>;
}>;

export type PaginatedAnimalSheltersListResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedAnimalSheltersList'] = ResolversParentTypes['PaginatedAnimalSheltersList']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['AnimalShelterOutput']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  sheltersList?: Resolver<ResolversTypes['PaginatedAnimalSheltersList'], ParentType, ContextType, RequireFields<QuerySheltersListArgs, 'params'>>;
}>;

export type SignUpOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpOutput'] = ResolversParentTypes['SignUpOutput']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  is_confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AnimalShelterOutput?: AnimalShelterOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedAnimalSheltersList?: PaginatedAnimalSheltersListResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignUpOutput?: SignUpOutputResolvers<ContextType>;
}>;

