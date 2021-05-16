import { Avatar, Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Loading } from "../../../components/Loading";
import {
  JoinsDocument,
  useAcceptJoinMutation,
  useJoinsQuery,
  useRemoveJoinMutation,
} from "../../../generated/graphql";

interface MemberRequestProps {
  groupId: string;
}

export const MemberRequest: React.FC<MemberRequestProps> = ({ groupId }) => {
  const { data, loading } = useJoinsQuery({
    variables: {
      groupId,
    },
  });
  const [acceptJoin] = useAcceptJoinMutation();
  const [removeJoin] = useRemoveJoinMutation();
  if (!data && loading) {
    return (
      <WrapLoading>
        <Loading blue />
      </WrapLoading>
    );
  }

  return (
    <Container>
      <Page>
        {!data?.getJoinInGroup.length ? (
          <EmptyRequest>
            <Image>
              <img src="/null_people.svg" alt="" width="112" height="112" />
            </Image>
            <Mess>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "-5px 0",
                }}
              >
                <Topic>
                  <span>Không có thành viên đang chờ nào</span>
                </Topic>
              </div>
            </Mess>
          </EmptyRequest>
        ) : (
          data?.getJoinInGroup.map((join) => (
            <MemberBackGround>
              <MemberWrap>
                <JoinLeft>
                  <Avatar src={join?.member.profile?.avatar || ""} />
                  <Content>
                    <span>{join?.member.displayname}</span> muốn tham gia nhóm{" "}
                    <span>{join?.name}</span>
                  </Content>
                </JoinLeft>
                <JoinRight>
                  <ButtonJoin
                    variant="contained"
                    onClick={async () => {
                      await acceptJoin({
                        variables: {
                          groupId,
                          userId: join?.member.id as string,
                          joinId: join?.id as string,
                        },
                        refetchQueries: [
                          { query: JoinsDocument, variables: { groupId } },
                        ],
                      });
                    }}
                  >
                    Chấp nhận
                  </ButtonJoin>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () =>
                      await removeJoin({
                        variables: {
                          joinId: join?.id as string,
                        },
                        refetchQueries: [
                          { query: JoinsDocument, variables: { groupId } },
                        ],
                      })
                    }
                  >
                    Từ chối
                  </Button>
                </JoinRight>
              </MemberWrap>
            </MemberBackGround>
          ))
        )}
      </Page>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f0f2f5;
  min-height: 350px;
`;
const Page = styled.div`
  padding: 16px;
  width: 908px;
  max-width: 100%;
  box-sizing: border-box;
`;
const MemberBackGround = styled.div`
  background-color: #fff;
  border-radius: 12px;
`;
const MemberWrap = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  flex-direction: row;
  padding: 16px;
`;

const JoinRight = styled.div`
  display: flex;
  flex-direction: row;
`;
const ButtonJoin = styled(Button)`
  background-color: rgb(29, 161, 242);
  color: #fff;
  margin: 0 10px;
  transition-duration: 0.2s;
  transition-property: background-color, box-shadow;
  &:hover {
    background-color: rgb(26, 145, 218);
  }
`;
const Content = styled.div`
  margin: 5px;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: inline-block;
    font-size: 15px;
    line-height: 1;
  }
`;
const JoinLeft = styled.div`
  display: flex;
  align-items: stretch;
`;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const EmptyRequest = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.div`
  margin-bottom: 20px;
  img {
    vertical-align: -0.25em;
  }
`;
const Mess = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -6px;
  margin-bottom: -6px;
`;
const Topic = styled.div`
  margin: 5px 0;
  span {
    color: #65676b;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 1.25rem;
    line-height: 1.2;
    text-align: center;
  }
`;
