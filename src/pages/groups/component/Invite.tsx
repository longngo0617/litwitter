import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import {
  useAcceptInviteMutation,
  useInvitesQuery,
  InvitesDocument,
  useRemoveInviteMutation,
} from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";

interface InviteProps {}

export const Invite: React.FC<InviteProps> = () => {
  const { data, loading } = useInvitesQuery();
  const [acceptInvite] = useAcceptInviteMutation();
  const [removeInvite] = useRemoveInviteMutation();
  if (!data && loading) {
    return (
      <WrapLoading>
        <Loading blue />
      </WrapLoading>
    );
  }

  return (
    <Container>
      {!data?.getMyInvites.length ? (
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
                <span>Hiện không có lời mời </span>
              </Topic>
            </div>
          </Mess>
        </EmptyRequest>
      ) : (
        <InviteItem>
          {data?.getMyInvites.map((invite) => (
            <MemberWrap key={invite?.id}>
              <JoinLeft>
                <Avatar src={invite?.imageCover || ""} />
                <Content>
                  <span>{invite?.from.displayname}</span> đã mời bạn tham gia
                  nhóm <span>{invite?.name}</span>
                </Content>
              </JoinLeft>
              <JoinRight>
                <ButtonJoin
                  variant="contained"
                  onClick={async () => {
                    await acceptInvite({
                      variables: {
                        groupId: invite?.groupId as string,
                        userId: invite?.to.id as string,
                        inviteId: invite?.id as string,
                      },
                      refetchQueries: [{ query: InvitesDocument }],
                    });
                  }}
                >
                  Chấp nhận
                </ButtonJoin>
                <Button
                  variant="contained"
                  onClick={async () => {
                    await removeInvite({
                      variables: {
                        inviteId: invite?.id as string,
                      },
                      refetchQueries: [{ query: InvitesDocument }],
                    });
                  }}
                >
                  Xoá
                </Button>
              </JoinRight>
            </MemberWrap>
          ))}
        </InviteItem>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

const InviteItem = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e6ecf0;
  padding-bottom: 10px;
  cursor: pointer;
  background-color: #fff;
`;
const MemberWrap = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
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
