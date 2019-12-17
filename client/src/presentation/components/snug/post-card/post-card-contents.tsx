import React from "react";
import styled from "styled-components";
import { FileContents } from "./file-contents";

const PostBox = styled.section`
  width: 100%;
  height: auto;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
`;

const PostDetail = styled.section`
  width: 100%;
  height: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const PostDetailWriterName = styled.span`
  font-weight: bold;
`;

const PostDetailTimestamp = styled.span`
  color: ${({ theme }) => theme.snugSubFont};
  font-size: 0.6rem;
`;

const PostContents = styled.span`
  word-break: break-all;
  padding-top: 5px;
  padding-bottom: 5px;
`;

interface PropTypes {
  writerName: string;
  createdAt: string;
  contents: string;
  replyCount: string;
  toggleThread?(event: React.MouseEvent): void;
}

const Thread = styled.div`
  color: white;
  display: flex;
  align-items: center;
  width: 70%;
  border: 1px solid ${({ theme }) => theme.snugMenuColor};
  transition: 400ms;
  box-sizing: border-box;
  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
`;

const ReplyNumber = styled.span`
  display: inline-block;
`;

export const PostCardContents: React.FC<PropTypes> = ({
  writerName: userName,
  createdAt: timestamp,
  contents: message,
  replyCount,
  toggleThread,
  filePath
}) => {
  function toDateFormat(date: string) {
    const nowDate = new Date(date);
    const year = setFormat(nowDate.getFullYear() % 100);
    const month = setFormat(nowDate.getMonth() + 1);
    const day = setFormat(nowDate.getDate());
    const hour = setFormat(nowDate.getHours());
    const minuite = setFormat(nowDate.getHours());
    const seconds = setFormat(nowDate.getSeconds());
    return `\t ${year}/${month}/${day} ${hour}:${minuite}:${seconds}`;
  }

  function setFormat(date: number) {
    if (date >= 10) return date;
    return `0${date}`;
  }
  console.log(filePath);
  return (
    <PostBox onClick={toggleThread}>
      <PostDetail>
        <PostDetailWriterName>{userName}</PostDetailWriterName>
        <PostDetailTimestamp>{toDateFormat(timestamp)}</PostDetailTimestamp>
      </PostDetail>
      <PostContents>{message}</PostContents>
      {filePath && filePath!.trim().length > 0 ? (
        <FileContents filePath={filePath!}></FileContents>
      ) : (
        <></>
      )}
      {parseInt(replyCount) > 0 && (
        <Thread>
          <ReplyNumber>{replyCount} 댓글</ReplyNumber>
        </Thread>
      )}
    </PostBox>
  );
};

interface PropTypes {
  writerName: string;
  createdAt: string;
  contents: string;
  replyCount: string;
  toggleThread?(event: React.MouseEvent): void;
  filePath?: string;
}
