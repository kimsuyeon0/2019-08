import React from "react";
import styled from "styled-components";
import { MessageCard } from "presentation/components/snug/message-card";
import { useMessages } from "contexts/messages-context";
const ChatContentWrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: hidden;
`;

export const ChatContent: React.FC = () => {
  const messages = useMessages();

  function messageList(): React.ReactNode {
    if (!messages) return <></>;
    return messages!.map(message => (
      <MessageCard
        key={message.id}
        profileName={message.profileName}
        profileThumnail={message.profileThumnail}
        contents={message.contents}
        createdAt={message.createdAt}
        updatedAt={message.updatedAt}
      />
    ));
  }

  return <ChatContentWrapper>{messageList()}</ChatContentWrapper>;
};
