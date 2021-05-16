import React from "react";
import styled from "styled-components";

interface ReadMoreProps {
  maxCharacterCount: number;
}

export const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  maxCharacterCount,
}) => {
  const text = children as string;
  const [isTruncated, setIsTruncated] = React.useState(true);
  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;
  const toggleIsTruncated = () => {
    setIsTruncated(!isTruncated);
  };
  return (
    <div>
      {resultString}...
      {text.length < 100 ? null : (
        <LinkReadMore onClick={toggleIsTruncated}>
          {" "}
          {isTruncated ? "Xem thêm" : "Ẩn bớt"}
        </LinkReadMore>
      )}
    </div>
  );
};

const LinkReadMore = styled.div`
  cursor: pointer;
  font-weight: 600;
  color: #050505;
  box-sizing: border-box;
  font-family: inherit;
  display: inline;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
