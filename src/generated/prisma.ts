import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Post implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  isPublished: Boolean!
  title: String!
  text: String!
  author(where: UserWhereInput): User!
}

type Product implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  pictureUrl: String!
  price: Float!
  seller(where: UserWhereInput): User!
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  name: String!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product!]
}

type AggregatePost {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

scalar DateTime

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

"""
A connection to a list of items.
"""
type PostConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  isPublished: Boolean
  title: String!
  text: String!
  author: UserCreateOneWithoutPostsInput!
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateWithoutAuthorInput {
  isPublished: Boolean
  title: String!
  text: String!
}

"""
An edge in a connection.
"""
type PostEdge {
  """
  The item at the end of the edge.
  """
  node: Post!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  isPublished_ASC
  isPublished_DESC
  title_ASC
  title_DESC
  text_ASC
  text_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  isPublished: Boolean!
  title: String!
  text: String!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PostSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PostSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PostWhereInput
}

input PostUpdateInput {
  isPublished: Boolean
  title: String
  text: String
  author: UserUpdateOneWithoutPostsInput
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
}

input PostUpdateWithoutAuthorDataInput {
  isPublished: Boolean
  title: String
  text: String
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PostWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PostWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  isPublished: Boolean
  """
  All values that are not equal to given value.
  """
  isPublished_not: Boolean
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  text: String
  """
  All values that are not equal to given value.
  """
  text_not: String
  """
  All values that are contained in given list.
  """
  text_in: [String!]
  """
  All values that are not contained in given list.
  """
  text_not_in: [String!]
  """
  All values less than the given value.
  """
  text_lt: String
  """
  All values less than or equal the given value.
  """
  text_lte: String
  """
  All values greater than the given value.
  """
  text_gt: String
  """
  All values greater than or equal the given value.
  """
  text_gte: String
  """
  All values containing the given string.
  """
  text_contains: String
  """
  All values not containing the given string.
  """
  text_not_contains: String
  """
  All values starting with the given string.
  """
  text_starts_with: String
  """
  All values not starting with the given string.
  """
  text_not_starts_with: String
  """
  All values ending with the given string.
  """
  text_ends_with: String
  """
  All values not ending with the given string.
  """
  text_not_ends_with: String
  author: UserWhereInput
}

input PostWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type ProductConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  name: String!
  pictureUrl: String!
  price: Float!
  seller: UserCreateOneWithoutProductsInput!
}

input ProductCreateManyWithoutSellerInput {
  create: [ProductCreateWithoutSellerInput!]
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateWithoutSellerInput {
  name: String!
  pictureUrl: String!
  price: Float!
}

"""
An edge in a connection.
"""
type ProductEdge {
  """
  The item at the end of the edge.
  """
  node: Product!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  pictureUrl_ASC
  pictureUrl_DESC
  price_ASC
  price_DESC
}

type ProductPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  pictureUrl: String!
  price: Float!
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ProductSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProductSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
}

input ProductUpdateInput {
  name: String
  pictureUrl: String
  price: Float
  seller: UserUpdateOneWithoutProductsInput
}

input ProductUpdateManyWithoutSellerInput {
  create: [ProductCreateWithoutSellerInput!]
  connect: [ProductWhereUniqueInput!]
  disconnect: [ProductWhereUniqueInput!]
  delete: [ProductWhereUniqueInput!]
  update: [ProductUpdateWithWhereUniqueWithoutSellerInput!]
  upsert: [ProductUpsertWithWhereUniqueWithoutSellerInput!]
}

input ProductUpdateWithoutSellerDataInput {
  name: String
  pictureUrl: String
  price: Float
}

input ProductUpdateWithWhereUniqueWithoutSellerInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutSellerDataInput!
}

input ProductUpsertWithWhereUniqueWithoutSellerInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutSellerDataInput!
  create: ProductCreateWithoutSellerInput!
}

input ProductWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ProductWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProductWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  pictureUrl: String
  """
  All values that are not equal to given value.
  """
  pictureUrl_not: String
  """
  All values that are contained in given list.
  """
  pictureUrl_in: [String!]
  """
  All values that are not contained in given list.
  """
  pictureUrl_not_in: [String!]
  """
  All values less than the given value.
  """
  pictureUrl_lt: String
  """
  All values less than or equal the given value.
  """
  pictureUrl_lte: String
  """
  All values greater than the given value.
  """
  pictureUrl_gt: String
  """
  All values greater than or equal the given value.
  """
  pictureUrl_gte: String
  """
  All values containing the given string.
  """
  pictureUrl_contains: String
  """
  All values not containing the given string.
  """
  pictureUrl_not_contains: String
  """
  All values starting with the given string.
  """
  pictureUrl_starts_with: String
  """
  All values not starting with the given string.
  """
  pictureUrl_not_starts_with: String
  """
  All values ending with the given string.
  """
  pictureUrl_ends_with: String
  """
  All values not ending with the given string.
  """
  pictureUrl_not_ends_with: String
  price: Float
  """
  All values that are not equal to given value.
  """
  price_not: Float
  """
  All values that are contained in given list.
  """
  price_in: [Float!]
  """
  All values that are not contained in given list.
  """
  price_not_in: [Float!]
  """
  All values less than the given value.
  """
  price_lt: Float
  """
  All values less than or equal the given value.
  """
  price_lte: Float
  """
  All values greater than the given value.
  """
  price_gt: Float
  """
  All values greater than or equal the given value.
  """
  price_gte: Float
  seller: UserWhereInput
}

input ProductWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String!
  posts: PostCreateManyWithoutAuthorInput
  products: ProductCreateManyWithoutSellerInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutProductsInput {
  create: UserCreateWithoutProductsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPostsInput {
  email: String!
  password: String!
  name: String!
  products: ProductCreateManyWithoutSellerInput
}

input UserCreateWithoutProductsInput {
  email: String!
  password: String!
  name: String!
  posts: PostCreateManyWithoutAuthorInput
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  posts: PostUpdateManyWithoutAuthorInput
  products: ProductUpdateManyWithoutSellerInput
}

input UserUpdateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
}

input UserUpdateOneWithoutProductsInput {
  create: UserCreateWithoutProductsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutProductsDataInput
  upsert: UserUpsertWithoutProductsInput
}

input UserUpdateWithoutPostsDataInput {
  email: String
  password: String
  name: String
  products: ProductUpdateManyWithoutSellerInput
}

input UserUpdateWithoutProductsDataInput {
  email: String
  password: String
  name: String
  posts: PostUpdateManyWithoutAuthorInput
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserUpsertWithoutProductsInput {
  update: UserUpdateWithoutProductsDataInput!
  create: UserCreateWithoutProductsInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  products_every: ProductWhereInput
  products_some: ProductWhereInput
  products_none: ProductWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Mutation {
  createPost(data: PostCreateInput!): Post!
  createUser(data: UserCreateInput!): User!
  createProduct(data: ProductCreateInput!): Product!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  deletePost(where: PostWhereUniqueInput!): Post
  deleteUser(where: UserWhereUniqueInput!): User
  deleteProduct(where: ProductWhereUniqueInput!): Product
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  updateManyPosts(data: PostUpdateInput!, where: PostWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyProducts(data: ProductUpdateInput!, where: ProductWhereInput): BatchPayload!
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
}

type Query {
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  post(where: PostWhereUniqueInput!): Post
  user(where: UserWhereUniqueInput!): User
  product(where: ProductWhereUniqueInput!): Product
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
}
`

export type PostOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'isPublished_ASC' |
  'isPublished_DESC' |
  'title_ASC' |
  'title_DESC' |
  'text_ASC' |
  'text_DESC'

export type ProductOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC' |
  'pictureUrl_ASC' |
  'pictureUrl_DESC' |
  'price_ASC' |
  'price_DESC'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface UserCreateInput {
  email: String
  password: String
  name: String
  posts?: PostCreateManyWithoutAuthorInput
  products?: ProductCreateManyWithoutSellerInput
}

export interface PostWhereInput {
  AND?: PostWhereInput[] | PostWhereInput
  OR?: PostWhereInput[] | PostWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  isPublished?: Boolean
  isPublished_not?: Boolean
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  text?: String
  text_not?: String
  text_in?: String[] | String
  text_not_in?: String[] | String
  text_lt?: String
  text_lte?: String
  text_gt?: String
  text_gte?: String
  text_contains?: String
  text_not_contains?: String
  text_starts_with?: String
  text_not_starts_with?: String
  text_ends_with?: String
  text_not_ends_with?: String
  author?: UserWhereInput
}

export interface ProductCreateInput {
  name: String
  pictureUrl: String
  price: Float
  seller: UserCreateOneWithoutProductsInput
}

export interface ProductWhereInput {
  AND?: ProductWhereInput[] | ProductWhereInput
  OR?: ProductWhereInput[] | ProductWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  pictureUrl?: String
  pictureUrl_not?: String
  pictureUrl_in?: String[] | String
  pictureUrl_not_in?: String[] | String
  pictureUrl_lt?: String
  pictureUrl_lte?: String
  pictureUrl_gt?: String
  pictureUrl_gte?: String
  pictureUrl_contains?: String
  pictureUrl_not_contains?: String
  pictureUrl_starts_with?: String
  pictureUrl_not_starts_with?: String
  pictureUrl_ends_with?: String
  pictureUrl_not_ends_with?: String
  price?: Float
  price_not?: Float
  price_in?: Float[] | Float
  price_not_in?: Float[] | Float
  price_lt?: Float
  price_lte?: Float
  price_gt?: Float
  price_gte?: Float
  seller?: UserWhereInput
}

export interface UserCreateOneWithoutProductsInput {
  create?: UserCreateWithoutProductsInput
  connect?: UserWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  posts_every?: PostWhereInput
  posts_some?: PostWhereInput
  posts_none?: PostWhereInput
  products_every?: ProductWhereInput
  products_some?: ProductWhereInput
  products_none?: ProductWhereInput
}

export interface UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export interface UserUpdateWithoutPostsDataInput {
  email?: String
  password?: String
  name?: String
  products?: ProductUpdateManyWithoutSellerInput
}

export interface ProductUpsertWithWhereUniqueWithoutSellerInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutSellerDataInput
  create: ProductCreateWithoutSellerInput
}

export interface UserCreateWithoutProductsInput {
  email: String
  password: String
  name: String
  posts?: PostCreateManyWithoutAuthorInput
}

export interface PostCreateInput {
  isPublished?: Boolean
  title: String
  text: String
  author: UserCreateOneWithoutPostsInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserCreateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export interface UserUpsertWithoutProductsInput {
  update: UserUpdateWithoutProductsDataInput
  create: UserCreateWithoutProductsInput
}

export interface UserCreateWithoutPostsInput {
  email: String
  password: String
  name: String
  products?: ProductCreateManyWithoutSellerInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface ProductCreateManyWithoutSellerInput {
  create?: ProductCreateWithoutSellerInput[] | ProductCreateWithoutSellerInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
}

export interface UserUpdateWithoutProductsDataInput {
  email?: String
  password?: String
  name?: String
  posts?: PostUpdateManyWithoutAuthorInput
}

export interface ProductCreateWithoutSellerInput {
  name: String
  pictureUrl: String
  price: Float
}

export interface ProductUpdateInput {
  name?: String
  pictureUrl?: String
  price?: Float
  seller?: UserUpdateOneWithoutProductsInput
}

export interface ProductUpdateWithoutSellerDataInput {
  name?: String
  pictureUrl?: String
  price?: Float
}

export interface PostUpdateWithoutAuthorDataInput {
  isPublished?: Boolean
  title?: String
  text?: String
}

export interface PostCreateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
  connect?: PostWhereUniqueInput[] | PostWhereUniqueInput
}

export interface PostUpdateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
  connect?: PostWhereUniqueInput[] | PostWhereUniqueInput
  disconnect?: PostWhereUniqueInput[] | PostWhereUniqueInput
  delete?: PostWhereUniqueInput[] | PostWhereUniqueInput
  update?: PostUpdateWithWhereUniqueWithoutAuthorInput[] | PostUpdateWithWhereUniqueWithoutAuthorInput
  upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput[] | PostUpsertWithWhereUniqueWithoutAuthorInput
}

export interface PostCreateWithoutAuthorInput {
  isPublished?: Boolean
  title: String
  text: String
}

export interface ProductSubscriptionWhereInput {
  AND?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  OR?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ProductWhereInput
}

export interface ProductUpdateWithWhereUniqueWithoutSellerInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutSellerDataInput
}

export interface PostWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpdateOneWithoutProductsInput {
  create?: UserCreateWithoutProductsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutProductsDataInput
  upsert?: UserUpsertWithoutProductsInput
}

export interface UserUpdateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export interface PostUpdateInput {
  isPublished?: Boolean
  title?: String
  text?: String
  author?: UserUpdateOneWithoutPostsInput
}

export interface ProductUpdateManyWithoutSellerInput {
  create?: ProductCreateWithoutSellerInput[] | ProductCreateWithoutSellerInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  update?: ProductUpdateWithWhereUniqueWithoutSellerInput[] | ProductUpdateWithWhereUniqueWithoutSellerInput
  upsert?: ProductUpsertWithWhereUniqueWithoutSellerInput[] | ProductUpsertWithWhereUniqueWithoutSellerInput
}

export interface PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export interface ProductWhereUniqueInput {
  id?: ID_Input
}

export interface PostSubscriptionWhereInput {
  AND?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput
  OR?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PostWhereInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  name?: String
  posts?: PostUpdateManyWithoutAuthorInput
  products?: ProductUpdateManyWithoutSellerInput
}

export interface PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface ProductPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  pictureUrl: String
  price: Float
}

/*
 * An edge in a connection.

 */
export interface PostEdge {
  node: Post
  cursor: String
}

export interface PostPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  isPublished: Boolean
  title: String
  text: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface Post extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  isPublished: Boolean
  title: String
  text: String
  author: User
}

/*
 * A connection to a list of items.

 */
export interface PostConnection {
  pageInfo: PageInfo
  edges: PostEdge[]
  aggregate: AggregatePost
}

export interface AggregateProduct {
  count: Int
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  name: String
  posts?: Post[]
  products?: Product[]
}

/*
 * A connection to a list of items.

 */
export interface ProductConnection {
  pageInfo: PageInfo
  edges: ProductEdge[]
  aggregate: AggregateProduct
}

export interface BatchPayload {
  count: Long
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface AggregatePost {
  count: Int
}

export interface PostSubscriptionPayload {
  mutation: MutationType
  node?: Post
  updatedFields?: String[]
  previousValues?: PostPreviousValues
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface Product extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  pictureUrl: String
  price: Float
  seller: User
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  name: String
}

export interface ProductSubscriptionPayload {
  mutation: MutationType
  node?: Product
  updatedFields?: String[]
  previousValues?: ProductPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface AggregateUser {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface ProductEdge {
  node: Product
  cursor: String
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

export type DateTime = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  posts: (args: { where?: PostWhereInput, orderBy?: PostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Post[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  products: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Product[]>
  post: (args: { where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Post | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  product: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  postsConnection: (args: { where?: PostWhereInput, orderBy?: PostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<PostConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  productsConnection: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ProductConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createPost: (args: { data: PostCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Post>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createProduct: (args: { data: ProductCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  updatePost: (args: { data: PostUpdateInput, where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Post | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateProduct: (args: { data: ProductUpdateInput, where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  deletePost: (args: { where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Post | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteProduct: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  upsertPost: (args: { where: PostWhereUniqueInput, create: PostCreateInput, update: PostUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Post>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertProduct: (args: { where: ProductWhereUniqueInput, create: ProductCreateInput, update: ProductUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  updateManyPosts: (args: { data: PostUpdateInput, where?: PostWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyProducts: (args: { data: ProductUpdateInput, where?: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyPosts: (args: { where?: PostWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyProducts: (args: { where?: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  post: (args: { where?: PostSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<PostSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  product: (args: { where?: ProductSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ProductSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Post: (where: PostWhereInput): Promise<boolean> => super.existsDelegate('query', 'posts', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    Product: (where: ProductWhereInput): Promise<boolean> => super.existsDelegate('query', 'products', { where }, {}, '{ id }')
  }

  query: Query = {
    posts: (args, info): Promise<Post[]> => super.delegate('query', 'posts', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    products: (args, info): Promise<Product[]> => super.delegate('query', 'products', args, {}, info),
    post: (args, info): Promise<Post | null> => super.delegate('query', 'post', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    product: (args, info): Promise<Product | null> => super.delegate('query', 'product', args, {}, info),
    postsConnection: (args, info): Promise<PostConnection> => super.delegate('query', 'postsConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    productsConnection: (args, info): Promise<ProductConnection> => super.delegate('query', 'productsConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createPost: (args, info): Promise<Post> => super.delegate('mutation', 'createPost', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createProduct: (args, info): Promise<Product> => super.delegate('mutation', 'createProduct', args, {}, info),
    updatePost: (args, info): Promise<Post | null> => super.delegate('mutation', 'updatePost', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'updateProduct', args, {}, info),
    deletePost: (args, info): Promise<Post | null> => super.delegate('mutation', 'deletePost', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'deleteProduct', args, {}, info),
    upsertPost: (args, info): Promise<Post> => super.delegate('mutation', 'upsertPost', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertProduct: (args, info): Promise<Product> => super.delegate('mutation', 'upsertProduct', args, {}, info),
    updateManyPosts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyPosts', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyProducts', args, {}, info),
    deleteManyPosts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyPosts', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyProducts', args, {}, info)
  }

  subscription: Subscription = {
    post: (args, infoOrQuery): Promise<AsyncIterator<PostSubscriptionPayload>> => super.delegateSubscription('post', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    product: (args, infoOrQuery): Promise<AsyncIterator<ProductSubscriptionPayload>> => super.delegateSubscription('product', args, {}, infoOrQuery)
  }
}