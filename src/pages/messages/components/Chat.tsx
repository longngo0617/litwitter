import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
interface ChatProps {}

export const Chat: React.FC<ChatProps> = () => {
  return (
    <Container>
      <Item>
        <UserAvatar />
        <UserInfo>
          <UserInfoLeft>
            <Name>Vỹ</Name>
            <Username>@vyhungle</Username>
          </UserInfoLeft>
        </UserInfo>
      </Item>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  border-bottom: 1px solid rgb(235, 238, 240);
  word-break: break-word;
  transitions: 0.2s background-color;
  &:hover {
    background-color: rgb(247, 249, 250);
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
`;
const UserAvatar = styled(Avatar)`
  flex-basic: 48px;
  margin-right: 12px;
  -webkit-box-flex: 0;
  flex-grow: 0;
`;
const UserInfo = styled.div`
  flex-basic: 0px;
  flex-grow: 1;
  -webkit-box-flex: 1;
  display: flex;
  align-items: center;
`;

const UserInfoLeft = styled.div``;

const Name = styled.span`
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
`;

const Username = styled.span`
  color: rgb(91, 112, 131);
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 20px;
  overflow-wrap: break-word;
  margin-left: 4px;
`;
