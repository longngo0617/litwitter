import React from "react";
import styled from "styled-components";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { formatDate } from "../../../utils/toErrorMap";

interface SnippetProps {
  user:any
}

export const SnippetUser: React.FC<SnippetProps> = ({user}) => {
  console.log(user)
  return (
    <Container>
      <Wrap>
        <Name>{user.displayname}</Name>
        <Username>@{user.username}</Username>
      </Wrap>
      <Wrap>
        <FollowItem>
          <Name>{user.following.length}</Name>
          <Username>Following</Username>
        </FollowItem>
        <FollowItem>
          <Name>{user.follower.length}</Name>
          <Username>Followers</Username>
        </FollowItem>
      </Wrap>
      <Wrap>
        <DateWrap>
          <IconDate />
          Tham gia {formatDate(user.createdAt)}
        </DateWrap>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  padding: 20px 16px;
  transition: 0.2s background-color;
  margin-bottom: 16px;
  border-bottom: 1px solid rgb(235, 238, 240);
  display: flex;
  justify-content: center;
  flex-direction: column;
  outline-style: none;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  flex-direction: column;
  &:hover {
    background-color: rgb(247, 249, 250);
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:5px;
`;
const DateWrap = styled.div`
  color: rgb(91, 112, 131);
  font-weight: 400;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica;
  line-height: 20px;
  overflow-wrap: break-word;
  text-align: center;
  margin-right:12px;
`;
const Name = styled.h2`
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
`;
const Username = styled.div`
  color: rgb(91, 112, 131);
  white-space: nowrap;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
  margin-left: 4px;
`;
const FollowItem = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;
const IconDate = styled(DateRangeIcon)`
  vertical-align: text-bottom;
  position: relative;
  margin-right: 4px;
  display: inline-block;
`;
