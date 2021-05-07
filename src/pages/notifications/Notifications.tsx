import React, { useContext } from "react";
import styled from "styled-components";
import { WithSide } from "../../utils/withSide";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import { Avatar, Link } from "@material-ui/core";
import { useNotificationsQuery, Notification } from "../../generated/graphql";
import { UserContext } from "../../utils/useAuth";
import { useHistory } from "react-router-dom";

interface NotificationsProps {}

export const Notifications: React.FC<NotificationsProps> = () => {
  const { data, loading }: any = useNotificationsQuery();
  const { user, setNotiFalse } = useContext(UserContext);
  const router = useHistory();

  if (data) {
    const watched = Array.from(data.getNotification.notifications).filter(
      (t: any) => t.watched === false
    ).length;
    if (watched > 0) {
      setNotiFalse();
    }
  }

  return (
    <WithSide>
      <div className="feed">
        <div className="feed__header">
          <ArrowBackIcon
            className="feed__header--icon"
            onClick={() => router.goBack()}
          />
          <h2>Notifications</h2>
        </div>
        {!data && loading
          ? null
          : data?.getNotification.notifications
              .filter((t: Notification) => t.username !== user.username)
              .map((noti: Notification) => (
                <Page key={noti.id}>
                  <NotificationsItem>
                    <NotiLeft>
                      {noti.type === "Following" ? (
                        <IconPerson />
                      ) : noti.type === "Like" ? (
                        <IconHeart />
                      ) : (
                        <AvatarUserLeft src={noti.avatar || ""} />
                      )}
                    </NotiLeft>
                    <NotiRight>
                      <div
                        style={{ paddingRight: "20px", marginBottom: "12px" }}
                      >
                        {noti.type !== "Comment" && (
                          <WrapAvatar>
                            <AvatarUser src={noti.avatar || ""} />
                          </WrapAvatar>
                        )}
                      </div>
                      <Text>
                        <div>
                          <Linkk href={`/users/${noti.username}`}>
                            <span>
                              <span>{noti.displayname}</span>
                            </span>
                          </Linkk>
                        </div>
                        <span>
                          <span>
                            <span>{noti.title}</span>
                          </span>
                        </span>
                      </Text>
                    </NotiRight>
                  </NotificationsItem>
                </Page>
              ))}
      </div>
    </WithSide>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const NotificationsItem = styled.div`
  display: flex;
  align-items: stretch;
  padding: 12px 16px;
  cursor: pointer;
  transition: 0.2s background-color;
  border-bottom: 1px solid rgb(235, 238, 240);
`;

const NotiRight = styled.div`
  flex-basis: 0px;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;
const NotiLeft = styled.div`
  display: flex;
  align-items: flex-end;
  flex-basis: 48px;
  flex-grow: 0;
  flex-direction: column;
  margin-right: 12px;
`;
const IconHeart = styled(FavoriteIcon)`
  color: rgb(224, 36, 94);
  width: 30px;
  height: 30px;
`;
const IconPerson = styled(PersonIcon)`
  color: rgb(29, 161, 242);
  width: 30px;
  height: 30px;
`;
const WrapAvatar = styled.div`
  display: flex;
  height: 32px;
  flex-wrap: wrap;
  overflow: hidden;
`;
const AvatarUser = styled(Avatar)`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
const AvatarUserLeft = styled(AvatarUser)`
  width: 48px;
  height: 48px;
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
  > div {
    display: inline-flex;
  }
  > span {
    color: inherit;
    font: inherit;
    white-space: inherit;
    font-family: inherit;
    overflow-wrap: break-word;
  }
`;
const Linkk = styled(Link)`
  font-weight: 600;
  color: rgb(15, 20, 25);
  margin-right: 4px;
`;
const CommentContent = styled.div`
  color: rgb(91, 112, 131);
  font-weight: 400;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
  > span {
    color: inherit;
    font: inherit;
    white-space: inherit;
    font-family: inherit;
    overflow-wrap: break-word;
  }
`;
