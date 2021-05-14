import { TweetBox } from "../../../components/TweetBox";
import { usePostsQuery } from "../../../generated/graphql";
import { Post } from "../../../components/Post";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { Loading } from "../../../components/Loading";
import styled from "styled-components";
const Feed = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 6,
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
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Loading blue />
        </Box>
      ) : !data?.getPosts.posts.length ? (
        <Empty>
          <div className="empty">
            <div className="empty--text">
              <span className="title">
                Bạn chưa theo dõi ai nên không thấy những bài post của họ hoặc
                là những người bạn theo dõi chưa có những bài post nào
              </span>
            </div>
            <div className="empty--text empty--info">
              <span className="info">
                Hãy theo dõi một vài người bạn có thể quen
              </span>
            </div>
            <ButtonLink>
              <Button
                href="/connect"
                color="primary"
                variant="contained"
                className="empty--link"
              >
                Đi đến theo dõi
              </Button>
            </ButtonLink>
          </div>
        </Empty>
      ) : (
        data!.getPosts?.posts.map((p, index) =>
          !p ? null : <Post key={index} post={p} />
        )
      )}

      {data && data.getPosts?.hasMore ? (
        <Box display="flex" p={1} m={1} justifyContent="center">
          <Button
            size="large"
            style={{ minWidth: "101px" }}
            className="sidebar__tweet"
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data?.getPosts?.posts[data.getPosts?.posts.length - 1]
                      ?.createdAt,
                },
              });
            }}
          >
            {" "}
            {loading ? <Loading /> : "Load more"}
          </Button>
        </Box>
      ) : null}
    </div>
  );
};
const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const ButtonLink = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
`;
export default Feed;
