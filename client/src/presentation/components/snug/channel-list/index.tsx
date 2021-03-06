import React, { useEffect } from "react";
import styled from "styled-components";
import { ChannelHeader } from "./channel-header";
import { ChannelTitle } from "./channel-title";
import {
  useChannels,
  useChannelDispatch,
  Channels
} from "contexts/channel-context";
import { match } from "react-router";
import { ChannelMatchType } from "prop-types/channel-match-type";
import { History } from "history";
import { Context } from "context.instance";
import { usePathParameter } from "contexts/path-parameter-context";
import { usePathParameterDispatch } from "contexts/path-parameter-context";
import { SideButtons } from "presentation/components/snug/channel-list/side-button";
import Axios from "axios";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PublicityWrapper = styled.section`
  padding: 10px 0px;
  height: auto;
  border-bottom: 1px solid ${({ theme }) => theme.snugBorderColor};
`;

const PrivacyWrapper = styled.section`
  padding: 10px 0px;
  height: auto;
`;

const TitleWrapper = styled.section`
  font-size: 1rem;
  margin: 0.75rem;
`;

interface PropTypes {
  match: match<ChannelMatchType>;
  history: History<any>;
  Application: Context;
}

const pickPrivacy = (channels: Channels) =>
  channels.filter(channel => channel.privacy);

const pickPublicity = (channels: Channels) =>
  channels.filter(channel => !channel.privacy);

export const ChannelList: React.FC<PropTypes> = ({
  match,
  history,
  Application
}) => {
  const channels = useChannels();
  const dispatch = useChannelDispatch();
  const pathPrameter = usePathParameter();
  const pathParameterDispatch = usePathParameterDispatch();

  useEffect(() => {
    pathParameterDispatch({
      type: "GETSNUGID",
      snugId: Number(match.params.snugId)
    });
  }, [pathParameterDispatch, match.params.snugId]);

  useEffect(() => {
    const source = Axios.CancelToken.source();

    (async function() {
      const snugId = Number(match.params.snugId);
      try {
        const channels = await Application.services.channelService.getParticipatingChannelList(snugId, source.token);
        dispatch &&
          dispatch({
            type: "MULTI",
            channels: channels
          });
      } catch (error) {
        const homeUrl = "/";
        history.push(homeUrl);
      }
    })();

    return function cleanup() {
      source.cancel();
    };
  }, [
    match.params.snugId,
    Application.services.channelService,
    dispatch,
    history
  ]);

  const publicChannels = pickPublicity(channels);
  const privateChannels = pickPrivacy(channels);

  return (
    <Wrapper>
      <ChannelHeader />
      <PublicityWrapper>
        <TitleWrapper>공유 채널</TitleWrapper>
        {publicChannels &&
          publicChannels.map(channel => (
            <ChannelTitle
              key={channel.id!}
              id={channel.id!}
              title={channel.title!}
              match={match}
              history={history}
            />
          ))}
      </PublicityWrapper>
      <PrivacyWrapper>
        <TitleWrapper>개인 채널</TitleWrapper>
        {privateChannels &&
          privateChannels.map(channel => (
            <ChannelTitle
              key={channel.id!}
              id={channel.id!}
              title={channel.title!}
              match={match}
              history={history}
            />
          ))}
      </PrivacyWrapper>
      <SideButtons
        message={"초대하기"}
        onClick={() =>
          (window.location.href = `/invite-users/${pathPrameter.snugId!}`)
        }
      />
    </Wrapper>
  );
};
