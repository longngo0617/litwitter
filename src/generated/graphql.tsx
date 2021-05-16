import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
  image?: Maybe<Array<Maybe<Scalars['String']>>>;
  verified?: Maybe<Scalars['Boolean']>;
  comments: Array<Maybe<Comment>>;
  likes: Array<Maybe<Like>>;
  likeCount: Scalars['Int'];
  commentCount: Scalars['Int'];
  displayname: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  url: Scalars['String'];
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
  displayname: Scalars['String'];
  body: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
  displayname: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type RoomChat = {
  __typename?: 'RoomChat';
  id: Scalars['ID'];
  content: Array<Maybe<Chat>>;
  members: Array<Maybe<User>>;
};

export type GroupChat = {
  __typename?: 'GroupChat';
  id: Scalars['ID'];
  body: Scalars['String'];
  leader: Scalars['String'];
  members: Array<Maybe<Member>>;
  content: Array<Maybe<Chat>>;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  username: Scalars['String'];
  displayname: Scalars['String'];
  createdAt: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  following?: Maybe<Array<Follow>>;
  follower?: Maybe<Array<Maybe<Follow>>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user: User;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  price: Scalars['String'];
  body: Scalars['String'];
  address?: Maybe<Location>;
  createdAt: Scalars['String'];
  image?: Maybe<Array<Maybe<Scalars['String']>>>;
  category?: Maybe<Category>;
  seller: User;
  describe?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID'];
  location: Scalars['String'];
  zipcode: Scalars['String'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  error?: Maybe<Array<FieldError>>;
  product?: Maybe<Product>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  story?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
};

export type Follow = {
  __typename?: 'Follow';
  id: Scalars['ID'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  displayname: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  story?: Maybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  type: Scalars['String'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  displayname: Scalars['String'];
  username: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  whose: Scalars['String'];
  watched: Scalars['Boolean'];
};

export type Notifications = {
  __typename?: 'Notifications';
  count: Scalars['String'];
  notifications?: Maybe<Array<Maybe<Notification>>>;
};

export type TypeGroup = {
  __typename?: 'TypeGroup';
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID'];
  leader: User;
  admins?: Maybe<Array<Maybe<User>>>;
  members: Array<Maybe<User>>;
  typeGroup: TypeGroup;
  name: Scalars['String'];
  imageCover: Scalars['String'];
  countMembers: Scalars['String'];
  public: Scalars['Boolean'];
  describe: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  createdAt: Scalars['String'];
};

export type PostInGroup = {
  __typename?: 'PostInGroup';
  groupId: Scalars['String'];
  groupName: Scalars['String'];
  post: Post;
};

export type GroupResponse = {
  __typename?: 'GroupResponse';
  error?: Maybe<Array<FieldError>>;
  group?: Maybe<Group>;
};

export type Invite = {
  __typename?: 'Invite';
  id: Scalars['ID'];
  groupId: Scalars['String'];
  name: Scalars['String'];
  imageCover: Scalars['String'];
  to: User;
  from: User;
};

export type Join = {
  __typename?: 'Join';
  id: Scalars['ID'];
  groupId: Scalars['String'];
  name: Scalars['String'];
  imageCover: Scalars['String'];
  member: User;
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  displayname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPosts: PaginatedPost;
  getPost: Post;
  getMyPosts: PaginatedPost;
  getChats?: Maybe<Array<Maybe<RoomChat>>>;
  getChat?: Maybe<RoomChat>;
  getChatReverse?: Maybe<RoomChat>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  getUser?: Maybe<User>;
  getMyUser?: Maybe<User>;
  getUserFollowing?: Maybe<Array<Maybe<User>>>;
  getRoomChat?: Maybe<Array<Maybe<RoomChat>>>;
  findUsers?: Maybe<Array<Maybe<User>>>;
  getNotification?: Maybe<Notifications>;
  getProduct?: Maybe<Product>;
  getMyProducts?: Maybe<Array<Maybe<Product>>>;
  getProducts?: Maybe<Array<Maybe<Product>>>;
  getCategories?: Maybe<Array<Maybe<Category>>>;
  getLocations?: Maybe<Array<Maybe<Location>>>;
  getTypeGroup: Array<Maybe<TypeGroup>>;
  getGroups: Array<Maybe<Group>>;
  getMyGroups: Array<Maybe<Group>>;
  getPostInMyGroup: Array<Maybe<PostInGroup>>;
  getGroup: Group;
  getCommentInGroup: Array<Maybe<Comment>>;
  getPostInGroup: Post;
  findGroups: Array<Maybe<Group>>;
  getMyInvites: Array<Maybe<Invite>>;
  getJoinInGroup: Array<Maybe<Join>>;
};


export type QueryGetPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetPostArgs = {
  postId: Scalars['ID'];
};


export type QueryGetMyPostsArgs = {
  username: Scalars['String'];
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetChatArgs = {
  roomId?: Maybe<Scalars['ID']>;
};


export type QueryGetChatReverseArgs = {
  roomId?: Maybe<Scalars['ID']>;
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryFindUsersArgs = {
  displayname: Scalars['String'];
};


export type QueryGetProductArgs = {
  productId: Scalars['ID'];
};


export type QueryGetProductsArgs = {
  category?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
};


export type QueryGetGroupArgs = {
  groupId: Scalars['String'];
};


export type QueryGetCommentInGroupArgs = {
  groupId: Scalars['String'];
  postId: Scalars['String'];
};


export type QueryGetPostInGroupArgs = {
  groupId: Scalars['String'];
  postId: Scalars['String'];
};


export type QueryFindGroupsArgs = {
  name: Scalars['String'];
};


export type QueryGetJoinInGroupArgs = {
  groupId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  Upload?: Maybe<Scalars['String']>;
  findUsers?: Maybe<Array<Maybe<User>>>;
  createPost: Post;
  deletePost: Scalars['String'];
  createComment: Post;
  deleteComment: Post;
  likePost: Post;
  createRoomChat: Scalars['String'];
  createRoomChatUsername: RoomChat;
  deleteRoomChat?: Maybe<Scalars['String']>;
  createContentChat: RoomChat;
  following: User;
  editProfile: User;
  createProduct: ProductResponse;
  setWatchedTrue?: Maybe<Array<Maybe<Notification>>>;
  deleteProduct: Scalars['String'];
  createGroup: GroupResponse;
  createPostInGroup: Scalars['Boolean'];
  likePostInGroup: Scalars['String'];
  CommentPostInGroup: Scalars['Boolean'];
  createInvite: Scalars['Boolean'];
  acceptInvite: Scalars['Boolean'];
  removeInvite: Scalars['Boolean'];
  createJoin: Scalars['Boolean'];
  acceptJoin: Scalars['Boolean'];
  removeJoin: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  registerInput?: Maybe<RegisterInput>;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUploadArgs = {
  file: Scalars['String'];
};


export type MutationFindUsersArgs = {
  displayname: Scalars['String'];
};


export type MutationCreatePostArgs = {
  body?: Maybe<Scalars['String']>;
  image?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['String'];
  body: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  postId: Scalars['ID'];
  commentId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationCreateRoomChatArgs = {
  userId: Scalars['String'];
};


export type MutationCreateRoomChatUsernameArgs = {
  username: Scalars['String'];
};


export type MutationDeleteRoomChatArgs = {
  roomId: Scalars['ID'];
};


export type MutationCreateContentChatArgs = {
  roomId: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};


export type MutationFollowingArgs = {
  username?: Maybe<Scalars['String']>;
};


export type MutationEditProfileArgs = {
  avatar?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  story?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
};


export type MutationCreateProductArgs = {
  image: Array<Maybe<Scalars['String']>>;
  price: Scalars['String'];
  address: Scalars['String'];
  body: Scalars['String'];
  category: Scalars['String'];
  describe?: Maybe<Scalars['String']>;
};


export type MutationDeleteProductArgs = {
  productId: Scalars['ID'];
};


export type MutationCreateGroupArgs = {
  name: Scalars['String'];
  describe: Scalars['String'];
  imageCover: Scalars['String'];
  typeGroup: Scalars['String'];
  public: Scalars['Boolean'];
};


export type MutationCreatePostInGroupArgs = {
  groupId: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  image?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationLikePostInGroupArgs = {
  groupId: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCommentPostInGroupArgs = {
  groupId: Scalars['String'];
  postId: Scalars['String'];
  body: Scalars['String'];
};


export type MutationCreateInviteArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationAcceptInviteArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
  inviteId: Scalars['String'];
};


export type MutationRemoveInviteArgs = {
  inviteId: Scalars['String'];
};


export type MutationCreateJoinArgs = {
  groupId: Scalars['String'];
};


export type MutationAcceptJoinArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
  joinId: Scalars['String'];
};


export type MutationRemoveJoinArgs = {
  joinId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newPost: Post;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type ChatSnippetFragment = (
  { __typename?: 'Chat' }
  & Pick<Chat, 'id' | 'username' | 'displayname' | 'createdAt' | 'content' | 'image'>
);

export type CommentSnippetFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'avatar' | 'username' | 'displayname' | 'createdAt' | 'body'>
);

export type RegularFollowFragment = (
  { __typename?: 'Follow' }
  & Pick<Follow, 'id' | 'username' | 'createdAt' | 'displayname' | 'avatar' | 'story'>
);

export type LikeSnippetFragment = (
  { __typename?: 'Like' }
  & Pick<Like, 'id' | 'avatar' | 'username' | 'displayname' | 'createdAt'>
);

export type NotificationSnippetFragment = (
  { __typename?: 'Notification' }
  & Pick<Notification, 'id' | 'displayname' | 'avatar' | 'username' | 'title' | 'createdAt' | 'watched' | 'whose' | 'type'>
);

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'body' | 'createdAt' | 'username' | 'displayname' | 'verified' | 'image' | 'avatar' | 'likeCount' | 'commentCount'>
  & { likes: Array<Maybe<(
    { __typename?: 'Like' }
    & LikeSnippetFragment
  )>>, comments: Array<Maybe<(
    { __typename?: 'Comment' }
    & CommentSnippetFragment
  )>> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularGroupFragment = (
  { __typename?: 'Group' }
  & Pick<Group, 'id' | 'name' | 'imageCover' | 'public' | 'describe' | 'createdAt' | 'countMembers'>
  & { leader: (
    { __typename?: 'User' }
    & RegularUserFragment
  ), admins?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>>, members: Array<Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>, typeGroup: (
    { __typename?: 'TypeGroup' }
    & Pick<TypeGroup, 'name' | 'slug'>
  ), posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )>>> }
);

export type RegularInviteFragment = (
  { __typename?: 'Invite' }
  & Pick<Invite, 'id' | 'groupId' | 'name' | 'imageCover'>
  & { to: (
    { __typename?: 'User' }
    & RegularUserFragment
  ), from: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularJoinFragment = (
  { __typename?: 'Join' }
  & Pick<Join, 'name' | 'id' | 'groupId' | 'imageCover'>
  & { member: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularProductFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'price' | 'body' | 'createdAt' | 'image' | 'describe'>
  & { address?: Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, 'location' | 'zipcode'>
  )>, category?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'name' | 'slug'>
  )>, seller: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularRoomChatFragment = (
  { __typename?: 'RoomChat' }
  & Pick<RoomChat, 'id'>
  & { content: Array<Maybe<(
    { __typename?: 'Chat' }
    & ChatSnippetFragment
  )>>, members: Array<Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'token' | 'displayname'>
  & { profile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'avatar' | 'dateOfBirth' | 'fullName' | 'story' | 'coverImage'>
  )>, following?: Maybe<Array<(
    { __typename?: 'Follow' }
    & RegularFollowFragment
  )>>, follower?: Maybe<Array<Maybe<(
    { __typename?: 'Follow' }
    & RegularFollowFragment
  )>>> }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { error?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type AcceptInviteMutationVariables = Exact<{
  groupId: Scalars['String'];
  userId: Scalars['String'];
  inviteId: Scalars['String'];
}>;


export type AcceptInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptInvite'>
);

export type AcceptJoinMutationVariables = Exact<{
  groupId: Scalars['String'];
  userId: Scalars['String'];
  joinId: Scalars['String'];
}>;


export type AcceptJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptJoin'>
);

export type CommentMutationVariables = Exact<{
  id: Scalars['String'];
  body: Scalars['String'];
}>;


export type CommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'commentCount'>
    & { comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'body' | 'createdAt' | 'username'>
    )>> }
  ) }
);

export type CreateCommentInGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
  postId: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateCommentInGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'CommentPostInGroup'>
);

export type CreateGroupMutationVariables = Exact<{
  imageCover: Scalars['String'];
  name: Scalars['String'];
  typeGroup: Scalars['String'];
  public: Scalars['Boolean'];
  describe: Scalars['String'];
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'GroupResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, group?: Maybe<(
      { __typename?: 'Group' }
      & RegularGroupFragment
    )> }
  ) }
);

export type CreateInviteMutationVariables = Exact<{
  groupId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createInvite'>
);

export type CreateJoinMutationVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type CreateJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createJoin'>
);

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  image?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'createdAt' | 'username' | 'image' | 'likeCount' | 'commentCount'>
  ) }
);

export type CreatePostInGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
  body: Scalars['String'];
  image?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type CreatePostInGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPostInGroup'>
);

export type CreateProductMutationVariables = Exact<{
  image: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  price: Scalars['String'];
  address: Scalars['String'];
  body: Scalars['String'];
  category: Scalars['String'];
  describe?: Maybe<Scalars['String']>;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'ProductResponse' }
    & { product?: Maybe<(
      { __typename?: 'Product' }
      & RegularProductFragment
    )>, error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type CreateRoomChatMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type CreateRoomChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createRoomChat'>
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID'];
  commentId: Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'commentCount'>
    & { comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'username' | 'createdAt' | 'body'>
    )>> }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type DeleteRoomChatMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRoomChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRoomChat'>
);

export type EditProfileMutationVariables = Exact<{
  avatar?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  story?: Maybe<Scalars['String']>;
  imageCover?: Maybe<Scalars['String']>;
}>;


export type EditProfileMutation = (
  { __typename?: 'Mutation' }
  & { editProfile: (
    { __typename?: 'User' }
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'avatar' | 'dateOfBirth' | 'fullName' | 'story' | 'coverImage'>
    )> }
  ) }
);

export type FollowUserMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
}>;


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & { following: (
    { __typename?: 'User' }
    & { following?: Maybe<Array<(
      { __typename?: 'Follow' }
      & RegularFollowFragment
    )>> }
  ) }
);

export type LikeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'Post' }
    & PostSnippetFragment
  ) }
);

export type LikePostInGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type LikePostInGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likePostInGroup'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  registerInput?: Maybe<RegisterInput>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RemoveInviteMutationVariables = Exact<{
  inviteId: Scalars['String'];
}>;


export type RemoveInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeInvite'>
);

export type RemoveJoinMutationVariables = Exact<{
  joinId: Scalars['String'];
}>;


export type RemoveJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeJoin'>
);

export type SendMessageMutationVariables = Exact<{
  content?: Maybe<Scalars['String']>;
  roomId: Scalars['String'];
  image?: Maybe<Scalars['String']>;
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { createContentChat: (
    { __typename?: 'RoomChat' }
    & RegularRoomChatFragment
  ) }
);

export type CategoriesAndLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesAndLocationsQuery = (
  { __typename?: 'Query' }
  & { getCategories?: Maybe<Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'slug'>
  )>>>, getLocations?: Maybe<Array<Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, 'id' | 'location' | 'zipcode'>
  )>>> }
);

export type ChatQueryVariables = Exact<{
  roomId?: Maybe<Scalars['ID']>;
}>;


export type ChatQuery = (
  { __typename?: 'Query' }
  & { getChat?: Maybe<(
    { __typename?: 'RoomChat' }
    & RegularRoomChatFragment
  )> }
);

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = (
  { __typename?: 'Query' }
  & { getRoomChat?: Maybe<Array<Maybe<(
    { __typename?: 'RoomChat' }
    & RegularRoomChatFragment
  )>>> }
);

export type GroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupQuery = (
  { __typename?: 'Query' }
  & { getGroup: (
    { __typename?: 'Group' }
    & RegularGroupFragment
  ) }
);

export type GroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupsQuery = (
  { __typename?: 'Query' }
  & { getGroups: Array<Maybe<(
    { __typename?: 'Group' }
    & RegularGroupFragment
  )>> }
);

export type InvitesQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitesQuery = (
  { __typename?: 'Query' }
  & { getMyInvites: Array<Maybe<(
    { __typename?: 'Invite' }
    & RegularInviteFragment
  )>> }
);

export type JoinsQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type JoinsQuery = (
  { __typename?: 'Query' }
  & { getJoinInGroup: Array<Maybe<(
    { __typename?: 'Join' }
    & RegularJoinFragment
  )>> }
);

export type MeProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeProductsQuery = (
  { __typename?: 'Query' }
  & { getMyProducts?: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & RegularProductFragment
  )>>> }
);

export type MyGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyGroupsQuery = (
  { __typename?: 'Query' }
  & { getMyGroups: Array<Maybe<(
    { __typename?: 'Group' }
    & RegularGroupFragment
  )>> }
);

export type MyPostsQueryVariables = Exact<{
  username: Scalars['String'];
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type MyPostsQuery = (
  { __typename?: 'Query' }
  & { getMyPosts: (
    { __typename?: 'PaginatedPost' }
    & Pick<PaginatedPost, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { getNotification?: Maybe<(
    { __typename?: 'Notifications' }
    & Pick<Notifications, 'count'>
    & { notifications?: Maybe<Array<Maybe<(
      { __typename?: 'Notification' }
      & NotificationSnippetFragment
    )>>> }
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & PostSnippetFragment
  ) }
);

export type PostOfMyGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type PostOfMyGroupQuery = (
  { __typename?: 'Query' }
  & { getPostInMyGroup: Array<Maybe<(
    { __typename?: 'PostInGroup' }
    & Pick<PostInGroup, 'groupId' | 'groupName'>
    & { post: (
      { __typename?: 'Post' }
      & PostSnippetFragment
    ) }
  )>> }
);

export type PostsQueryVariables = Exact<{
  cursor: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: (
    { __typename?: 'PaginatedPost' }
    & Pick<PaginatedPost, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'Product' }
    & RegularProductFragment
  )> }
);

export type ProductsQueryVariables = Exact<{
  category?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { getProducts?: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & RegularProductFragment
  )>>> }
);

export type TypeGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type TypeGroupQuery = (
  { __typename?: 'Query' }
  & { getTypeGroup: Array<Maybe<(
    { __typename?: 'TypeGroup' }
    & Pick<TypeGroup, 'name' | 'slug'>
  )>> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>> }
);

export const NotificationSnippetFragmentDoc = gql`
    fragment NotificationSnippet on Notification {
  id
  displayname
  avatar
  username
  title
  createdAt
  watched
  whose
  type
  title
}
    `;
export const RegularFollowFragmentDoc = gql`
    fragment RegularFollow on Follow {
  id
  username
  createdAt
  displayname
  avatar
  story
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  createdAt
  profile {
    avatar
    dateOfBirth
    fullName
    story
    coverImage
  }
  token
  displayname
  following {
    ...RegularFollow
  }
  follower {
    ...RegularFollow
  }
}
    ${RegularFollowFragmentDoc}`;
export const LikeSnippetFragmentDoc = gql`
    fragment LikeSnippet on Like {
  id
  avatar
  username
  displayname
  createdAt
}
    `;
export const CommentSnippetFragmentDoc = gql`
    fragment CommentSnippet on Comment {
  id
  avatar
  username
  displayname
  createdAt
  body
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  body
  createdAt
  username
  displayname
  verified
  image
  avatar
  likeCount
  likes {
    ...LikeSnippet
  }
  commentCount
  comments {
    ...CommentSnippet
  }
}
    ${LikeSnippetFragmentDoc}
${CommentSnippetFragmentDoc}`;
export const RegularGroupFragmentDoc = gql`
    fragment RegularGroup on Group {
  id
  name
  imageCover
  public
  describe
  createdAt
  countMembers
  leader {
    ...RegularUser
  }
  admins {
    ...RegularUser
  }
  members {
    ...RegularUser
  }
  typeGroup {
    name
    slug
  }
  posts {
    ...PostSnippet
  }
}
    ${RegularUserFragmentDoc}
${PostSnippetFragmentDoc}`;
export const RegularInviteFragmentDoc = gql`
    fragment RegularInvite on Invite {
  id
  groupId
  name
  imageCover
  to {
    ...RegularUser
  }
  from {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularJoinFragmentDoc = gql`
    fragment RegularJoin on Join {
  name
  id
  groupId
  imageCover
  member {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularProductFragmentDoc = gql`
    fragment RegularProduct on Product {
  id
  price
  body
  address {
    location
    zipcode
  }
  createdAt
  image
  category {
    name
    slug
  }
  seller {
    ...RegularUser
  }
  describe
}
    ${RegularUserFragmentDoc}`;
export const ChatSnippetFragmentDoc = gql`
    fragment ChatSnippet on Chat {
  id
  username
  displayname
  createdAt
  content
  image
}
    `;
export const RegularRoomChatFragmentDoc = gql`
    fragment RegularRoomChat on RoomChat {
  id
  content {
    ...ChatSnippet
  }
  members {
    ...RegularUser
  }
}
    ${ChatSnippetFragmentDoc}
${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  error {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AcceptInviteDocument = gql`
    mutation acceptInvite($groupId: String!, $userId: String!, $inviteId: String!) {
  acceptInvite(groupId: $groupId, userId: $userId, inviteId: $inviteId)
}
    `;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      userId: // value for 'userId'
 *      inviteId: // value for 'inviteId'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, options);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const AcceptJoinDocument = gql`
    mutation acceptJoin($groupId: String!, $userId: String!, $joinId: String!) {
  acceptJoin(groupId: $groupId, userId: $userId, joinId: $joinId)
}
    `;
export type AcceptJoinMutationFn = Apollo.MutationFunction<AcceptJoinMutation, AcceptJoinMutationVariables>;

/**
 * __useAcceptJoinMutation__
 *
 * To run a mutation, you first call `useAcceptJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptJoinMutation, { data, loading, error }] = useAcceptJoinMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      userId: // value for 'userId'
 *      joinId: // value for 'joinId'
 *   },
 * });
 */
export function useAcceptJoinMutation(baseOptions?: Apollo.MutationHookOptions<AcceptJoinMutation, AcceptJoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptJoinMutation, AcceptJoinMutationVariables>(AcceptJoinDocument, options);
      }
export type AcceptJoinMutationHookResult = ReturnType<typeof useAcceptJoinMutation>;
export type AcceptJoinMutationResult = Apollo.MutationResult<AcceptJoinMutation>;
export type AcceptJoinMutationOptions = Apollo.BaseMutationOptions<AcceptJoinMutation, AcceptJoinMutationVariables>;
export const CommentDocument = gql`
    mutation Comment($id: String!, $body: String!) {
  createComment(postId: $id, body: $body) {
    id
    comments {
      body
      createdAt
      username
    }
    commentCount
  }
}
    `;
export type CommentMutationFn = Apollo.MutationFunction<CommentMutation, CommentMutationVariables>;

/**
 * __useCommentMutation__
 *
 * To run a mutation, you first call `useCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentMutation, { data, loading, error }] = useCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCommentMutation(baseOptions?: Apollo.MutationHookOptions<CommentMutation, CommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentMutation, CommentMutationVariables>(CommentDocument, options);
      }
export type CommentMutationHookResult = ReturnType<typeof useCommentMutation>;
export type CommentMutationResult = Apollo.MutationResult<CommentMutation>;
export type CommentMutationOptions = Apollo.BaseMutationOptions<CommentMutation, CommentMutationVariables>;
export const CreateCommentInGroupDocument = gql`
    mutation createCommentInGroup($groupId: String!, $postId: String!, $body: String!) {
  CommentPostInGroup(groupId: $groupId, postId: $postId, body: $body)
}
    `;
export type CreateCommentInGroupMutationFn = Apollo.MutationFunction<CreateCommentInGroupMutation, CreateCommentInGroupMutationVariables>;

/**
 * __useCreateCommentInGroupMutation__
 *
 * To run a mutation, you first call `useCreateCommentInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentInGroupMutation, { data, loading, error }] = useCreateCommentInGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      postId: // value for 'postId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateCommentInGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentInGroupMutation, CreateCommentInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentInGroupMutation, CreateCommentInGroupMutationVariables>(CreateCommentInGroupDocument, options);
      }
export type CreateCommentInGroupMutationHookResult = ReturnType<typeof useCreateCommentInGroupMutation>;
export type CreateCommentInGroupMutationResult = Apollo.MutationResult<CreateCommentInGroupMutation>;
export type CreateCommentInGroupMutationOptions = Apollo.BaseMutationOptions<CreateCommentInGroupMutation, CreateCommentInGroupMutationVariables>;
export const CreateGroupDocument = gql`
    mutation createGroup($imageCover: String!, $name: String!, $typeGroup: String!, $public: Boolean!, $describe: String!) {
  createGroup(
    imageCover: $imageCover
    name: $name
    typeGroup: $typeGroup
    public: $public
    describe: $describe
  ) {
    error {
      ...RegularError
    }
    group {
      ...RegularGroup
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularGroupFragmentDoc}`;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      imageCover: // value for 'imageCover'
 *      name: // value for 'name'
 *      typeGroup: // value for 'typeGroup'
 *      public: // value for 'public'
 *      describe: // value for 'describe'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateInviteDocument = gql`
    mutation createInvite($groupId: String!, $userId: String!) {
  createInvite(groupId: $groupId, userId: $userId)
}
    `;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const CreateJoinDocument = gql`
    mutation createJoin($groupId: String!) {
  createJoin(groupId: $groupId)
}
    `;
export type CreateJoinMutationFn = Apollo.MutationFunction<CreateJoinMutation, CreateJoinMutationVariables>;

/**
 * __useCreateJoinMutation__
 *
 * To run a mutation, you first call `useCreateJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJoinMutation, { data, loading, error }] = useCreateJoinMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateJoinMutation(baseOptions?: Apollo.MutationHookOptions<CreateJoinMutation, CreateJoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJoinMutation, CreateJoinMutationVariables>(CreateJoinDocument, options);
      }
export type CreateJoinMutationHookResult = ReturnType<typeof useCreateJoinMutation>;
export type CreateJoinMutationResult = Apollo.MutationResult<CreateJoinMutation>;
export type CreateJoinMutationOptions = Apollo.BaseMutationOptions<CreateJoinMutation, CreateJoinMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($body: String!, $image: [String]) {
  createPost(body: $body, image: $image) {
    id
    body
    createdAt
    username
    image
    likeCount
    commentCount
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreatePostInGroupDocument = gql`
    mutation createPostInGroup($groupId: String!, $body: String!, $image: [String]) {
  createPostInGroup(groupId: $groupId, body: $body, image: $image)
}
    `;
export type CreatePostInGroupMutationFn = Apollo.MutationFunction<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>;

/**
 * __useCreatePostInGroupMutation__
 *
 * To run a mutation, you first call `useCreatePostInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostInGroupMutation, { data, loading, error }] = useCreatePostInGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      body: // value for 'body'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostInGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>(CreatePostInGroupDocument, options);
      }
export type CreatePostInGroupMutationHookResult = ReturnType<typeof useCreatePostInGroupMutation>;
export type CreatePostInGroupMutationResult = Apollo.MutationResult<CreatePostInGroupMutation>;
export type CreatePostInGroupMutationOptions = Apollo.BaseMutationOptions<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($image: [String]!, $price: String!, $address: String!, $body: String!, $category: String!, $describe: String) {
  createProduct(
    image: $image
    category: $category
    address: $address
    price: $price
    describe: $describe
    body: $body
  ) {
    product {
      ...RegularProduct
    }
    error {
      ...RegularError
    }
  }
}
    ${RegularProductFragmentDoc}
${RegularErrorFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      image: // value for 'image'
 *      price: // value for 'price'
 *      address: // value for 'address'
 *      body: // value for 'body'
 *      category: // value for 'category'
 *      describe: // value for 'describe'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateRoomChatDocument = gql`
    mutation createRoomChat($userId: String!) {
  createRoomChat(userId: $userId)
}
    `;
export type CreateRoomChatMutationFn = Apollo.MutationFunction<CreateRoomChatMutation, CreateRoomChatMutationVariables>;

/**
 * __useCreateRoomChatMutation__
 *
 * To run a mutation, you first call `useCreateRoomChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomChatMutation, { data, loading, error }] = useCreateRoomChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateRoomChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomChatMutation, CreateRoomChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomChatMutation, CreateRoomChatMutationVariables>(CreateRoomChatDocument, options);
      }
export type CreateRoomChatMutationHookResult = ReturnType<typeof useCreateRoomChatMutation>;
export type CreateRoomChatMutationResult = Apollo.MutationResult<CreateRoomChatMutation>;
export type CreateRoomChatMutationOptions = Apollo.BaseMutationOptions<CreateRoomChatMutation, CreateRoomChatMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: ID!, $commentId: ID!) {
  deleteComment(postId: $id, commentId: $commentId) {
    id
    comments {
      id
      username
      createdAt
      body
    }
    commentCount
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(postId: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteProductDocument = gql`
    mutation deleteProduct($id: ID!) {
  deleteProduct(productId: $id)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteRoomChatDocument = gql`
    mutation deleteRoomChat($id: ID!) {
  deleteRoomChat(roomId: $id)
}
    `;
export type DeleteRoomChatMutationFn = Apollo.MutationFunction<DeleteRoomChatMutation, DeleteRoomChatMutationVariables>;

/**
 * __useDeleteRoomChatMutation__
 *
 * To run a mutation, you first call `useDeleteRoomChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomChatMutation, { data, loading, error }] = useDeleteRoomChatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoomChatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomChatMutation, DeleteRoomChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomChatMutation, DeleteRoomChatMutationVariables>(DeleteRoomChatDocument, options);
      }
export type DeleteRoomChatMutationHookResult = ReturnType<typeof useDeleteRoomChatMutation>;
export type DeleteRoomChatMutationResult = Apollo.MutationResult<DeleteRoomChatMutation>;
export type DeleteRoomChatMutationOptions = Apollo.BaseMutationOptions<DeleteRoomChatMutation, DeleteRoomChatMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($avatar: String, $dateOfBirth: String, $fullName: String!, $story: String, $imageCover: String) {
  editProfile(
    avatar: $avatar
    dateOfBirth: $dateOfBirth
    fullName: $fullName
    story: $story
    coverImage: $imageCover
  ) {
    profile {
      avatar
      dateOfBirth
      fullName
      story
      coverImage
    }
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      fullName: // value for 'fullName'
 *      story: // value for 'story'
 *      imageCover: // value for 'imageCover'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($username: String) {
  following(username: $username) {
    following {
      ...RegularFollow
    }
  }
}
    ${RegularFollowFragmentDoc}`;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const LikeDocument = gql`
    mutation Like($id: ID!) {
  likePost(postId: $id) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LikePostInGroupDocument = gql`
    mutation likePostInGroup($groupId: String!, $postId: String!) {
  likePostInGroup(groupId: $groupId, postId: $postId)
}
    `;
export type LikePostInGroupMutationFn = Apollo.MutationFunction<LikePostInGroupMutation, LikePostInGroupMutationVariables>;

/**
 * __useLikePostInGroupMutation__
 *
 * To run a mutation, you first call `useLikePostInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostInGroupMutation, { data, loading, error }] = useLikePostInGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostInGroupMutation(baseOptions?: Apollo.MutationHookOptions<LikePostInGroupMutation, LikePostInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostInGroupMutation, LikePostInGroupMutationVariables>(LikePostInGroupDocument, options);
      }
export type LikePostInGroupMutationHookResult = ReturnType<typeof useLikePostInGroupMutation>;
export type LikePostInGroupMutationResult = Apollo.MutationResult<LikePostInGroupMutation>;
export type LikePostInGroupMutationOptions = Apollo.BaseMutationOptions<LikePostInGroupMutation, LikePostInGroupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput) {
  register(registerInput: $registerInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveInviteDocument = gql`
    mutation removeInvite($inviteId: String!) {
  removeInvite(inviteId: $inviteId)
}
    `;
export type RemoveInviteMutationFn = Apollo.MutationFunction<RemoveInviteMutation, RemoveInviteMutationVariables>;

/**
 * __useRemoveInviteMutation__
 *
 * To run a mutation, you first call `useRemoveInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeInviteMutation, { data, loading, error }] = useRemoveInviteMutation({
 *   variables: {
 *      inviteId: // value for 'inviteId'
 *   },
 * });
 */
export function useRemoveInviteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveInviteMutation, RemoveInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveInviteMutation, RemoveInviteMutationVariables>(RemoveInviteDocument, options);
      }
export type RemoveInviteMutationHookResult = ReturnType<typeof useRemoveInviteMutation>;
export type RemoveInviteMutationResult = Apollo.MutationResult<RemoveInviteMutation>;
export type RemoveInviteMutationOptions = Apollo.BaseMutationOptions<RemoveInviteMutation, RemoveInviteMutationVariables>;
export const RemoveJoinDocument = gql`
    mutation removeJoin($joinId: String!) {
  removeJoin(joinId: $joinId)
}
    `;
export type RemoveJoinMutationFn = Apollo.MutationFunction<RemoveJoinMutation, RemoveJoinMutationVariables>;

/**
 * __useRemoveJoinMutation__
 *
 * To run a mutation, you first call `useRemoveJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeJoinMutation, { data, loading, error }] = useRemoveJoinMutation({
 *   variables: {
 *      joinId: // value for 'joinId'
 *   },
 * });
 */
export function useRemoveJoinMutation(baseOptions?: Apollo.MutationHookOptions<RemoveJoinMutation, RemoveJoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveJoinMutation, RemoveJoinMutationVariables>(RemoveJoinDocument, options);
      }
export type RemoveJoinMutationHookResult = ReturnType<typeof useRemoveJoinMutation>;
export type RemoveJoinMutationResult = Apollo.MutationResult<RemoveJoinMutation>;
export type RemoveJoinMutationOptions = Apollo.BaseMutationOptions<RemoveJoinMutation, RemoveJoinMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($content: String, $roomId: String!, $image: String) {
  createContentChat(content: $content, roomId: $roomId, image: $image) {
    ...RegularRoomChat
  }
}
    ${RegularRoomChatFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      roomId: // value for 'roomId'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const CategoriesAndLocationsDocument = gql`
    query CategoriesAndLocations {
  getCategories {
    id
    name
    slug
  }
  getLocations {
    id
    location
    zipcode
  }
}
    `;

/**
 * __useCategoriesAndLocationsQuery__
 *
 * To run a query within a React component, call `useCategoriesAndLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesAndLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesAndLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesAndLocationsQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesAndLocationsQuery, CategoriesAndLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesAndLocationsQuery, CategoriesAndLocationsQueryVariables>(CategoriesAndLocationsDocument, options);
      }
export function useCategoriesAndLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesAndLocationsQuery, CategoriesAndLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesAndLocationsQuery, CategoriesAndLocationsQueryVariables>(CategoriesAndLocationsDocument, options);
        }
export type CategoriesAndLocationsQueryHookResult = ReturnType<typeof useCategoriesAndLocationsQuery>;
export type CategoriesAndLocationsLazyQueryHookResult = ReturnType<typeof useCategoriesAndLocationsLazyQuery>;
export type CategoriesAndLocationsQueryResult = Apollo.QueryResult<CategoriesAndLocationsQuery, CategoriesAndLocationsQueryVariables>;
export const ChatDocument = gql`
    query Chat($roomId: ID) {
  getChat(roomId: $roomId) {
    ...RegularRoomChat
  }
}
    ${RegularRoomChatFragmentDoc}`;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useChatQuery(baseOptions?: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const ChatsDocument = gql`
    query Chats {
  getRoomChat {
    ...RegularRoomChat
  }
}
    ${RegularRoomChatFragmentDoc}`;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const GroupDocument = gql`
    query Group($groupId: String!) {
  getGroup(groupId: $groupId) {
    ...RegularGroup
  }
}
    ${RegularGroupFragmentDoc}`;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;
export const GroupsDocument = gql`
    query Groups {
  getGroups {
    ...RegularGroup
  }
}
    ${RegularGroupFragmentDoc}`;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
      }
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const InvitesDocument = gql`
    query invites {
  getMyInvites {
    ...RegularInvite
  }
}
    ${RegularInviteFragmentDoc}`;

/**
 * __useInvitesQuery__
 *
 * To run a query within a React component, call `useInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvitesQuery(baseOptions?: Apollo.QueryHookOptions<InvitesQuery, InvitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvitesQuery, InvitesQueryVariables>(InvitesDocument, options);
      }
export function useInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvitesQuery, InvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvitesQuery, InvitesQueryVariables>(InvitesDocument, options);
        }
export type InvitesQueryHookResult = ReturnType<typeof useInvitesQuery>;
export type InvitesLazyQueryHookResult = ReturnType<typeof useInvitesLazyQuery>;
export type InvitesQueryResult = Apollo.QueryResult<InvitesQuery, InvitesQueryVariables>;
export const JoinsDocument = gql`
    query Joins($groupId: String!) {
  getJoinInGroup(groupId: $groupId) {
    ...RegularJoin
  }
}
    ${RegularJoinFragmentDoc}`;

/**
 * __useJoinsQuery__
 *
 * To run a query within a React component, call `useJoinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJoinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinsQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useJoinsQuery(baseOptions: Apollo.QueryHookOptions<JoinsQuery, JoinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JoinsQuery, JoinsQueryVariables>(JoinsDocument, options);
      }
export function useJoinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JoinsQuery, JoinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JoinsQuery, JoinsQueryVariables>(JoinsDocument, options);
        }
export type JoinsQueryHookResult = ReturnType<typeof useJoinsQuery>;
export type JoinsLazyQueryHookResult = ReturnType<typeof useJoinsLazyQuery>;
export type JoinsQueryResult = Apollo.QueryResult<JoinsQuery, JoinsQueryVariables>;
export const MeProductsDocument = gql`
    query MeProducts {
  getMyProducts {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useMeProductsQuery__
 *
 * To run a query within a React component, call `useMeProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeProductsQuery(baseOptions?: Apollo.QueryHookOptions<MeProductsQuery, MeProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeProductsQuery, MeProductsQueryVariables>(MeProductsDocument, options);
      }
export function useMeProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeProductsQuery, MeProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeProductsQuery, MeProductsQueryVariables>(MeProductsDocument, options);
        }
export type MeProductsQueryHookResult = ReturnType<typeof useMeProductsQuery>;
export type MeProductsLazyQueryHookResult = ReturnType<typeof useMeProductsLazyQuery>;
export type MeProductsQueryResult = Apollo.QueryResult<MeProductsQuery, MeProductsQueryVariables>;
export const MyGroupsDocument = gql`
    query myGroups {
  getMyGroups {
    ...RegularGroup
  }
}
    ${RegularGroupFragmentDoc}`;

/**
 * __useMyGroupsQuery__
 *
 * To run a query within a React component, call `useMyGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyGroupsQuery(baseOptions?: Apollo.QueryHookOptions<MyGroupsQuery, MyGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyGroupsQuery, MyGroupsQueryVariables>(MyGroupsDocument, options);
      }
export function useMyGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyGroupsQuery, MyGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyGroupsQuery, MyGroupsQueryVariables>(MyGroupsDocument, options);
        }
export type MyGroupsQueryHookResult = ReturnType<typeof useMyGroupsQuery>;
export type MyGroupsLazyQueryHookResult = ReturnType<typeof useMyGroupsLazyQuery>;
export type MyGroupsQueryResult = Apollo.QueryResult<MyGroupsQuery, MyGroupsQueryVariables>;
export const MyPostsDocument = gql`
    query myPosts($username: String!, $cursor: String, $limit: Int!) {
  getMyPosts(username: $username, cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useMyPostsQuery__
 *
 * To run a query within a React component, call `useMyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPostsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMyPostsQuery(baseOptions: Apollo.QueryHookOptions<MyPostsQuery, MyPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPostsQuery, MyPostsQueryVariables>(MyPostsDocument, options);
      }
export function useMyPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPostsQuery, MyPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPostsQuery, MyPostsQueryVariables>(MyPostsDocument, options);
        }
export type MyPostsQueryHookResult = ReturnType<typeof useMyPostsQuery>;
export type MyPostsLazyQueryHookResult = ReturnType<typeof useMyPostsLazyQuery>;
export type MyPostsQueryResult = Apollo.QueryResult<MyPostsQuery, MyPostsQueryVariables>;
export const NotificationsDocument = gql`
    query notifications {
  getNotification {
    count
    notifications {
      ...NotificationSnippet
    }
  }
}
    ${NotificationSnippetFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const PostDocument = gql`
    query Post($id: ID!) {
  getPost(postId: $id) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostOfMyGroupDocument = gql`
    query postOfMyGroup {
  getPostInMyGroup {
    groupId
    groupName
    post {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostOfMyGroupQuery__
 *
 * To run a query within a React component, call `usePostOfMyGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostOfMyGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostOfMyGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostOfMyGroupQuery(baseOptions?: Apollo.QueryHookOptions<PostOfMyGroupQuery, PostOfMyGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostOfMyGroupQuery, PostOfMyGroupQueryVariables>(PostOfMyGroupDocument, options);
      }
export function usePostOfMyGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostOfMyGroupQuery, PostOfMyGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostOfMyGroupQuery, PostOfMyGroupQueryVariables>(PostOfMyGroupDocument, options);
        }
export type PostOfMyGroupQueryHookResult = ReturnType<typeof usePostOfMyGroupQuery>;
export type PostOfMyGroupLazyQueryHookResult = ReturnType<typeof usePostOfMyGroupLazyQuery>;
export type PostOfMyGroupQueryResult = Apollo.QueryResult<PostOfMyGroupQuery, PostOfMyGroupQueryVariables>;
export const PostsDocument = gql`
    query Posts($cursor: String!, $limit: Int!) {
  getPosts(cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  getProduct(productId: $id) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products($category: String = "", $address: String = "", $sort: Int = 0) {
  getProducts(category: $category, address: $address, sort: $sort) {
    ...RegularProduct
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      category: // value for 'category'
 *      address: // value for 'address'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const TypeGroupDocument = gql`
    query typeGroup {
  getTypeGroup {
    name
    slug
  }
}
    `;

/**
 * __useTypeGroupQuery__
 *
 * To run a query within a React component, call `useTypeGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useTypeGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTypeGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function useTypeGroupQuery(baseOptions?: Apollo.QueryHookOptions<TypeGroupQuery, TypeGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TypeGroupQuery, TypeGroupQueryVariables>(TypeGroupDocument, options);
      }
export function useTypeGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TypeGroupQuery, TypeGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TypeGroupQuery, TypeGroupQueryVariables>(TypeGroupDocument, options);
        }
export type TypeGroupQueryHookResult = ReturnType<typeof useTypeGroupQuery>;
export type TypeGroupLazyQueryHookResult = ReturnType<typeof useTypeGroupLazyQuery>;
export type TypeGroupQueryResult = Apollo.QueryResult<TypeGroupQuery, TypeGroupQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  getUser(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  getUsers {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;