import React from "react";
import { Post } from "../../../generated/graphql";
import styled from "styled-components";
import { TweetBox } from "../../../components/TweetBox";
import { PostItem } from "../../../components/PostItem";

interface DiscussProps {
  posts: [Post];
  see: boolean;
  groupId: string;
}

export const Discuss: React.FC<DiscussProps> = ({ posts, see ,groupId}) => {
  return (
    <Box style={{ backgroundColor: "#f0f2f5" }}>
      <Page>
        <Main>
          <FeedDiscuss>
              <GroupInlineCompose>
                  <div style={{marginBottom:"16px"}}>
                      <TweetBox isGroup groupId={groupId}/>
                  </div>
              </GroupInlineCompose>
              <GroupFeed>
                  <div role="feed">
                      {posts.map((post) => (
                          <PostItem post={post} key={post.id} groupId={groupId}/>
                      ))}
                  </div>
              </GroupFeed>
          </FeedDiscuss>
          <Introduce></Introduce>
        </Main>
      </Page>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Page = styled.div`
  padding: 16px;
  width: 908px;
  max-width: 100%;
  box-sizing: border-box;
`;
const Main = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  flex-wrap: wrap-reverse;
  flex-direction: row;
`;
const FeedDiscuss = styled.div`
  margin: 8px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 500px;
  max-width: 500px;
  min-width: 0;
  box-sizing: border-box;
  position: relative;
`;
const GroupInlineCompose = styled.div``;
const GroupFeed = styled.div``;
const Introduce = styled.div``;
