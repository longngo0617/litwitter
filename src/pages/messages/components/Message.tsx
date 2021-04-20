import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../utils/useAuth";
import moment from "moment";
interface MessageProps {
  u: string;
  message: string;
  time: string;
}

export const Message: React.FC<MessageProps> = ({ u, message, time }) => {
  const { user } = useContext(UserContext);
  const TypeOfMessage = user.username === u ? Sender : Reciever;
  const TypeOfTime = user.username === u ? TimeSender : TimeStamp;
  return (
    <Container>
      <TypeOfMessage>{message}</TypeOfMessage>
      <TypeOfTime>{moment(time).format("LT")}</TypeOfTime>
    </Container>
  );
};

const Container = styled.div``;
const MessageElement = styled.p`
  max-width: 50%;
  width: fit-content;
  padding: 12px 16px;
  border-color: rgb(29, 161, 242);
  border-radius: 16px;
  position: relative;
  margin: 10px;
  text-align: right;
  color: #fff;
  font-weight: 400;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
  line-height: 20px;
`;
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: rgb(29, 161, 242);
  border-bottom-right-radius: 0px;
  margin-right: 0px;
`;

const Reciever = styled(MessageElement)`
  background-color: #e4e6eb;
  text-align: left;
  color: #000;
  border-bottom-left-radius: 0px;
  margin-left: 0px;
`;

const TimeStamp = styled.div`
  font-weight: 400;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  color: rgb(91, 112, 131);
  line-height: 16px;
  overflow-wrap: break-word;
`;

const TimeSender = styled(TimeStamp)`
  text-align: right;
`;
