import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import Hash from "assets/hash-white.png";
import { History } from "history";
import { match } from "react-router";
import { ChannelMatchType } from "prop-types/channel-match-type";
import {
  usePathParameter,
  usePathParameterDispatch
} from "contexts/path-parameter-context";

interface styledWrrapperProps {
  on: string;
}

const Wrapper = styled.section<styledWrrapperProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  padding: 0px 20px;
  ${({ on, theme }) => {
    if (on === "true")
      return css`
        background-color: ${theme.sidebarSelect};
        color: ${theme.sidebarSelectFont};
      `;
    return css`
      &:hover {
        background-color: ${theme.sidbarHover};
      }
    `;
  }}
`;

interface PropsTypes {
  id: number;
  title: string;
  history: History<any>;
  match: match<ChannelMatchType>;
}

export const ChannelTitle: React.FC<PropsTypes> = props => {
  const [on, setOn] = useState<string>("false");
  const pathParameter = usePathParameter();
  const pathParameterDispatch = usePathParameterDispatch();
  const { history, match, id } = props;

  useEffect(() => {
    history.push(
      `/snug/${pathParameter.snugId}/channel/${
        pathParameter.channelId ? pathParameter.channelId : 0
      }`
    );
    if (pathParameter.channelId === id) return setOn("true");
    setOn("false");
  }, [pathParameter.channelId, pathParameter.snugId, history, id]);

  const onClickEventHandler = () => {
    if (match.params.channelId === id.toString()) return;
    pathParameterDispatch({
      type: "IN",
      channelId: id
    });
  };

  return (
    <Wrapper onClick={onClickEventHandler} on={on}>
      <IconBox imageSrc={Hash} size={"15px"} />
      {props.title}
    </Wrapper>
  );
};
