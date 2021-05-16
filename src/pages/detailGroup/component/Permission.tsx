import React from "react";
import styled from "styled-components";

interface PermissionProps {}

export const Permission: React.FC<PermissionProps> = ({}) => {
  return (
    <Page>
      <Container>
        <Image>
          <img src="/permission.svg" alt="" width="112" height="112" />
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
              <span>Đây là nhóm riêng tư</span>
            </Topic>
            <Content>
              <span>Hãy tham gia nhóm này để xem hoặc cùng thảo luận nhé.</span>
            </Content>
          </div>
        </Mess>
      </Container>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  background-color: #fff;
`;
const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    text-align:center;
  }
`;
const Content = styled.div`
  margin: 5px 0;
  span {
    color: #65676b;
    word-break: break-word;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 1.0625rem;
    line-height: 1.1765;
    text-align:center;
  }
`;
