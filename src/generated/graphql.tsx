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
  image?: Maybe<Scalars['String']>;
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
  content: Scalars['String'];
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
  address: Scalars['String'];
  createdAt: Scalars['String'];
  image: Scalars['String'];
  category: Scalars['String'];
  seller: User;
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
  getGroups?: Maybe<Array<Maybe<GroupChat>>>;
  getGroup?: Maybe<GroupChat>;
  getGroupChat?: Maybe<Array<Maybe<GroupChat>>>;
  getNotification?: Maybe<Notifications>;
  getProducts?: Maybe<Array<Maybe<Product>>>;
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


export type QueryGetGroupArgs = {
  groupId: Scalars['ID'];
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
  createRoomChat: RoomChat;
  deleteRoomChat?: Maybe<Scalars['String']>;
  createContentChat: RoomChat;
  createGroupChat: GroupChat;
  createContentGroupChat: GroupChat;
  createMember: GroupChat;
  following: User;
  editProfile: User;
  createProduct: ProductResponse;
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
  image?: Maybe<Scalars['String']>;
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


export type MutationDeleteRoomChatArgs = {
  roomId: Scalars['ID'];
};


export type MutationCreateContentChatArgs = {
  roomId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreateGroupChatArgs = {
  body: Scalars['String'];
};


export type MutationCreateContentGroupChatArgs = {
  groupId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreateMemberArgs = {
  groupId: Scalars['String'];
  username: Scalars['String'];
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
  image: Scalars['String'];
  price: Scalars['String'];
  address: Scalars['String'];
  body: Scalars['String'];
  category: Scalars['String'];
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
  & Pick<Chat, 'id' | 'username' | 'displayname' | 'createdAt' | 'content'>
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

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  image: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'createdAt' | 'username' | 'image' | 'likeCount' | 'commentCount'>
  ) }
);

export type CreateRoomChatMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type CreateRoomChatMutation = (
  { __typename?: 'Mutation' }
  & { createRoomChat: (
    { __typename?: 'RoomChat' }
    & RegularRoomChatFragment
  ) }
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

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String'];
  roomId: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { createContentChat: (
    { __typename?: 'RoomChat' }
    & RegularRoomChatFragment
  ) }
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
export const ChatSnippetFragmentDoc = gql`
    fragment ChatSnippet on Chat {
  id
  username
  displayname
  createdAt
  content
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
export const CreatePostDocument = gql`
    mutation createPost($body: String!, $image: String!) {
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
export const CreateRoomChatDocument = gql`
    mutation createRoomChat($userId: String!) {
  createRoomChat(userId: $userId) {
    ...RegularRoomChat
  }
}
    ${RegularRoomChatFragmentDoc}`;
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
export const SendMessageDocument = gql`
    mutation SendMessage($content: String!, $roomId: String!) {
  createContentChat(content: $content, roomId: $roomId) {
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