import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDeleteRoomChatMutation } from "../../../generated/graphql";

interface PopupLeaveProps {
  fc: () => void;
  id: string;
}

export const PopupLeave: React.FC<PopupLeaveProps> = ({ fc, id }) => {
  const [deleteRoomChat] = useDeleteRoomChatMutation();
  const router = useHistory();
  return (
    <Container>
      <Overlay />
      <Box>
        <Title>Rời khỏi cuộc trò chuyện?</Title>
        <Content>
          Cuộc trò chuyện này sẽ bị xóa khỏi hộp thư đến của bạn. Những người
          khác trong cuộc trò chuyện sẽ vẫn có thể nhìn thấy nó.
        </Content>
        <ButtonWrap>
          <ButtonCancel onClick={fc}>Trở lại</ButtonCancel>
          <ButtonLeave
            onClick={async () => {
              await deleteRoomChat({
                variables: { id },
              });
              fc();
              router.push("/messages");
            }}
          >
            Rời khỏi
          </ButtonLeave>
        </ButtonWrap>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Box = styled.div`
  width: 320px;
  max-width: 80vw;
  min-height: calc(185px);
  background-color: rgba(255, 255, 255, 1);
  padding: 32px 20px;
  z-index: 1;
  border-radius: 16px;
`;
const Title = styled.h2`
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  text-align: center;
  overflow-wrap: break-word;
`;
const Content = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: rgb(91, 112, 131);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  text-align: center;
  overflow-wrap: break-word;
`;
const ButtonWrap = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  align-items: stretch;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: 40px;
  border-radius: 9999px;
  min-width: calc(64.4px);
  flex-grow: 1;
  padding: 0 1em;
  text-align: center;
  font-weight: 700;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  transition: 0.2s background-color;
`;
const ButtonCancel = styled(Button)`
  background-color: rgb(235, 238, 240);
  color: rgb(0, 0, 0);
  margin-right: 16px;
  &:hover {
    background-color: rgba(212, 214, 216);
  }
`;
const ButtonLeave = styled(Button)`
  background-color: rgb(224, 36, 94);
  color: rgb(255, 255, 255);
  &:hover {
    background-color: rgba(202, 32, 85);
  }
`;
