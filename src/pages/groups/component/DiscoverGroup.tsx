import React from "react";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar, Button } from "@material-ui/core";
import styled from "styled-components";
import { Group, useGroupsQuery, User } from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { UserContext } from "../../../utils/useAuth";

interface DiscoverGroupProps {}

export const DiscoverGroup: React.FC<DiscoverGroupProps> = () => {
  const { data, loading } = useGroupsQuery();
  const { user } = React.useContext(UserContext);
  if (data) {
    const gro = !!(data?.getGroups[1] as Group).members.find(
      (e) => e?.username === user.username
    );
    console.log(gro);
  }
  return (
    <div>
      {!data && loading ? (
        <WrapLoading>
          <Loading blue />
        </WrapLoading>
      ) : (
        <Page>
          {data?.getGroups
            .filter(
              (g) =>
                !(g as Group).members.find(
                  (e) => e?.username === user.username
                )
            )
            .map((g) => (
              <GroupItem key={g?.id}>
                <GroupContainer>
                  <Item>
                    <div>
                      <Linkk>
                        <div
                          style={{
                            paddingBottom: "56.25%",
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          <Image>
                            <img src={g?.imageCover} alt="" />
                          </Image>
                        </div>
                      </Linkk>
                      <div style={{ padding: "12px 16px 0" }}>
                        <div style={{ paddingBottom: "4px" }}>
                          <TextWrap>
                            <Line>
                              <span>{g?.name}</span>
                            </Line>
                            <Line1>
                              <span>
                                {g?.countMembers} thành viên
                                <span style={{ margin: "0 5px" }}>•</span>
                                10 bài viết / ngày
                              </span>
                            </Line1>
                          </TextWrap>
                        </div>
                      </div>
                    </div>
                    <Content>
                      <div style={{ marginTop: "-15px" }}>
                        <div style={{ padding: "12px 16px 0" }}>
                          {g?.members.length ? (
                            <MemberWrap>
                              <div
                                style={{ minWidth: "64px", marginRight: "8px" }}
                              >
                                <AvatarGroup max={3}>
                                  {g?.members.map((member) => (
                                    <UserAvatar
                                      alt="Remy Sharp"
                                      src={member?.profile?.avatar || ""}
                                      key={member?.id}
                                    />
                                  ))}
                                </AvatarGroup>
                              </div>
                              <TextWrap>
                                <Line1>
                                  <span>
                                    {g.members[0]?.displayname} và{" "}
                                    {g.members.length} nguời khác là thành viên
                                  </span>
                                </Line1>
                              </TextWrap>
                            </MemberWrap>
                          ) : null}
                        </div>
                      </div>
                    </Content>
                    <div style={{ padding: "16px" }}>
                      <ButtonJoin variant="contained">Tham gia nhóm</ButtonJoin>
                    </div>
                  </Item>
                </GroupContainer>
              </GroupItem>
            ))}
        </Page>
      )}
    </div>
  );
};
const Page = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const GroupItem = styled.div`
  box-sizing: border-box;
  min-width: 308px;
  padding: 4px;
  overflow: hidden;
  flex: 1;
  cursor: pointer;
`;
const GroupContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-grow: 1;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;
const Linkk = styled.a`
  text-decoration: none;
  display: inline;
  border: 0;
  background-color: transparent;
  color: inherit;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: inherit;
  width: 100%;
`;
const Image = styled.div`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    border: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Content = styled.div`
  padding-top: 8px;
`;

const TextWrap = styled.div``;
const Line = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 1.0625rem;
    line-height: 1.1765;
  }
`;
const Line1 = styled(Line)`
  margin-top: 0;
  margin-bottom: 4px;
  span {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 13px;
    color: #65676b;
  }
`;
const MemberWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;
const UserAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
`;
const ButtonJoin = styled(Button)`
  width: 100%;
  box-shadow: none;
`;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
