import React from "react";
import { UserContext } from "../../utils/useAuth";
import Sidebar from "../home/components/Sidebar";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { Group, useGroupQuery } from "../../generated/graphql";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { NavLink, Route, Switch } from "react-router-dom";
import { About } from "./component/About";
import { Loading } from "../../components/Loading";
interface DetailGroupProps {}
interface ParamsProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      backgroundColor: "rgb(29, 161, 242)",
      fontWeight: 700,
    },
  })
);

export const DetailGroup: React.FC<DetailGroupProps> = () => {
  const { user } = React.useContext(UserContext);
  const classes = useStyles();
  const router = useHistory();
  const params: ParamsProps = useParams();
  const { url } = useRouteMatch();
  const { data, loading } = useGroupQuery({
    variables: {
      groupId: params.id,
    },
  });

  return (
    <div className="wrapper">
      <Sidebar {...user} />
      {!data && loading ? (
        <WrapLoading>
          <Loading blue />
        </WrapLoading>
      ) : (
        <Main style={{ flex: 1 }}>
          <div className="feed" style={{ flex: 1 }}>
            <div className="feed__header">
              <ArrowBackIcon
                className="feed__header--icon"
                onClick={() => router.goBack()}
              />
              <h2>{data?.getGroup.name}</h2>
            </div>
            <Page>
              <ImageCoverWrap>
                <div
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative", cursor: "pointer" }}>
                    <div
                      style={{
                        paddingTop: "37%",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <MainImage>
                        <div
                          style={{
                            left: "50.122%",
                            position: "absolute",
                            top: "49.7664%",
                            transform: "translate(-50.122%, -49.7664%)",
                            paddingTop: "52.1951%",
                            width: "100%",
                            overflow: "hidden",
                            height: 0,
                          }}
                        >
                          <MainImage>
                            <img src={data?.getGroup.imageCover} alt="" />
                          </MainImage>
                        </div>
                      </MainImage>
                    </div>
                  </div>
                  {/** overlay */}
                  <div
                    style={{
                      bottom: 0,
                      left: 0,
                      right: 0,
                      position: "absolute",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        padding: "0 20px",
                        backgroundImage:
                          "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.6))",
                      }}
                    >
                      <Overlay></Overlay>
                    </div>
                  </div>
                </div>
                <TitleBar>
                  <TitleBackground>
                    <Line>
                      <span>Nhóm của {data?.getGroup.leader.displayname}</span>
                    </Line>
                  </TitleBackground>
                </TitleBar>
              </ImageCoverWrap>
            </Page>
            <Page>
              <InfoGroup>
                <div style={{ width: "100%" }}>
                  <Info>
                    <InfoEach>
                      <InfoLeft>
                        <div style={{ margin: "8px 0" }}>
                          <GroupName>{data?.getGroup.name}</GroupName>
                        </div>
                        <div>
                          <Line1>
                            <span>
                              {data?.getGroup.public ? (
                                <span>
                                  {" "}
                                  <PublicIcon />
                                  Nhóm công khai
                                </span>
                              ) : (
                                <span>
                                  {" "}
                                  <LockIcon />
                                  Nhóm riêng tư
                                </span>
                              )}
                              <span style={{ margin: "0 5px" }}>•</span>
                              {data?.getGroup.countMembers} thành viên
                            </span>
                          </Line1>
                        </div>
                      </InfoLeft>
                    </InfoEach>
                    <InfoEach style={{ justifyContent: "flex-end" }}>
                      <InfoRight>
                        <ItemRight>
                          <MemberWrap>
                            <AvatarGroup max={13} style={{zIndex:0}}>
                              {/* {data?.getGroup.members.map((member) => (
                              <UserAvatar
                                alt="Remy Sharp"
                                src={member?.profile?.avatar || ""}
                                key={member?.id}
                              />
                            ))} */}
                              <UserAvatar alt="Remy Sharp" src="/per1.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per2.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                              <UserAvatar alt="Remy Sharp" src="/per3.jpeg" />
                            </AvatarGroup>
                          </MemberWrap>
                        </ItemRight>
                        <ItemRight>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<AddIcon />}
                          >
                            Mời
                          </Button>
                        </ItemRight>
                      </InfoRight>
                    </InfoEach>
                  </Info>
                </div>
              </InfoGroup>
            </Page>
            <div className="profile__wrapper">
              <nav className="profile__nav">
                <div className="profile__nav--item">
                  <NavLink
                    to={`${url}/about`}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="link--title">
                      <span>Giới thiệu</span>
                    </div>
                  </NavLink>
                </div>
                <div className="profile__nav--item">
                  <NavLink exact to={`${url}`} className="link">
                    <div className="link--title">
                      <span>Thảo luận</span>
                    </div>
                  </NavLink>
                </div>
                <div className="profile__nav--item">
                  <NavLink exact to={`${url}/members`} className="link">
                    <div className="link--title">
                      <span>Thành viên</span>
                    </div>
                  </NavLink>
                </div>
              </nav>
            </div>
            <Switch>
              <Route path={`${url}/about`}>
                <About about={data?.getGroup as Group} url={`${url}/members`}/>
              </Route>
              <Route path={`${url}/members`}></Route>
              <Route exact path={url}></Route>
            </Switch>
          </div>
        </Main>
      )}
    </div>
  );
};
const Main = styled.div`
  flex-shrink: 1;
  flex: 1;
  user-select: text;
  display: flex;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: stretch;
  box-sizing: border-box;
  position: relative;
`;
const ImageCoverWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 1;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: 940px;
  position: relative;
`;
const MainImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-shrink: 1;
  flex-grow: 1;
  flex-direction: column;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    object-fit: cover;
    bottom: 0;
    box-sizing: border-box;
  }
`;
const Overlay = styled.div`
  padding: 16px 12px 0;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  flex-wrap: nowrap;
  flex-direction: row;
  box-sizing: border-box;
  margin-bottom: -6px;
  margin-left: -6px;
  margin-top: -6px;
  margin-right: -6px;
`;
const TitleBar = styled.div`
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
  width: 100%;
`;
const TitleBackground = styled.div`
  padding: 16px 0;
  position: relative;
  background-color: rgb(29, 161, 242);
`;

const Line = styled.div`
  padding: 6px 16px;
  span {
    color: #fff;
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
  padding: 0;
  span {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 1.0625rem;
    color: #65676b;
  }
`;
const InfoGroup = styled.div`
  max-width: 908px;
  padding: 0 16px;
  display: flex;
  position: relative;
  flex-basis: 0;
  flex-shrink: 1;
  flex-grow: 1;
  flex-direction: column;
`;
const Info = styled.div`
  padding-top: 16px;
  display: flex;
  position: relative;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: -6px;
  margin-left: -6px;
  margin-top: -6px;
  margin-right: -6px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const InfoEach = styled.div`
  min-width: 320px;
  position: relative;
  padding: 6px 6px 16px;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 1;
  flex-grow: 9999;
  max-width: 100%;
  flex-direction: column;
`;
const InfoLeft = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  margin: -8px 0;
`;
const InfoRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin-top: -6px;
  margin-right: -6px;
  margin-bottom: -6px;
  margin-left: -6px;
  box-sizing: border-box;
  flex-wrap: nowrap;
`;
const GroupName = styled.h2`
  color: #050505;
  word-break: break-word;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  text-align: left;
  max-width: 100%;
  word-wrap: break-word;
  display: block;
  font-size: 1.75rem;
  line-height: 1.1429;
`;
const ItemRight = styled.div`
  padding: 6px;
  display: flex;
  max-width: 100%;
  flex-direction: column;
`;
const MemberWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;
const UserAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
`;
const WrapLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width:100%;
`;
