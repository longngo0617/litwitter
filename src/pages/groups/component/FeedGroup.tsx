import React from "react";
import { usePostOfMyGroupQuery } from "../../../generated/graphql";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import { Loading } from "../../../components/Loading";
import { Button } from "@material-ui/core";
import { Post } from "../../../components/Post";

interface FeedGroupProps {}

export const FeedGroup: React.FC<FeedGroupProps> = ({}) => {
  const { data, loading } = usePostOfMyGroupQuery();

  return (
    <Container>
      {!data && loading ? (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Loading blue />
        </Box>
      ) : !data?.getPostInMyGroup.length ? (
        <Empty>
          <div className="empty">
            <div className="empty--text">
              <span className="title">
                Bạn chưa tham gia nhóm nào nên không thấy những bài post của họ
              </span>
            </div>
            <div className="empty--text empty--info">
              <span className="info">Hãy tham gia một vài nhóm</span>
            </div>
            <ButtonLink>
              <Button
                href="/groups/discover"
                color="primary"
                variant="contained"
                className="empty--link"
              >
                Khám phá
              </Button>
            </ButtonLink>
          </div>
        </Empty>
      ) : (
        data!.getPostInMyGroup?.map((p, index) =>
          !p ? null : <Post key={index} {...p} />
        )
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
`;
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
