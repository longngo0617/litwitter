import { TweetBox } from "../../../components/TweetBox";
import { usePostsQuery } from "../../../generated/graphql";
import { Post } from "../../../components/Post";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { Loading } from "../../../components/Loading";
import { useIsAuth } from "../../../utils/useIsAuth";

const Feed = () => {

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: "",
    },
    notifyOnNetworkStatusChange: true,
  });
  
  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {!data && loading ? (
        <Box display="flex" justifyContent="center" marginTop="20px"><Loading blue/></Box>
      ) : (
        data!.getPosts?.posts.map((p,index) =>
          !p ? null : (
            <Post
              key={index}
              {...p}
            />
          )
        )
      )}
      {data && data.getPosts?.hasMore ? (
        <Box display="flex" p={1} m={1} justifyContent="center">
          <Button
            size="large"
            className="sidebar__tweet"
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data?.getPosts?.posts[data.getPosts?.posts.length - 1]
                      ?.createdAt,
                },
                // updateQuery: (previousValue, {fetchMoreResult}) : PostsQuery => {
                //     if(!fetchMoreResult) {
                //         return previousValue as PostsQuery;
                //     }
                //     return {
                //         __typename: 'Query',
                //         getPosts : {
                //             __typename: 'PaginatedPost',
                //             hasMore: (fetchMoreResult as PostsQuery).getPosts?.hasMore,
                //             posts: [
                //                 ...(previousValue as PostsQuery).getPosts.posts,
                //                 ...(fetchMoreResult as PostsQuery).getPosts?.posts
                //             ]
                //         }
                //     }
                // },
              });
            }}
          >
            {" "}
            Load more
          </Button>
        </Box>
      ) : null}
    </div>
  );
};

export default Feed;
