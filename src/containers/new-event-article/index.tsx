'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Preview from '@uiw/react-markdown-preview';
import styled from 'styled-components';
import { HtmlEmbed } from '@/components';
import { useNewColorMode } from '@/contexts/useNewColorMode';
import { formatEventDateRange, isValidImageSrc } from '@/functions';
import type { EventPost } from '@/types';
import { NewEventMap } from '@/containers/new-event-map';
import { NewEventRegistration } from '@/containers/new-event-registration';

const FALLBACK_COVER = '/assets/blogs/odigos-blog-kubernetes-fleet.png';

const Article = styled.article`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 54px 0 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 40px 0 72px;
  }
`;

const Back = styled(Link)`
  display: inline-flex;
  margin-bottom: 58px;
  color: var(--nd-text-secondary);
  font-size: 13px;
  text-decoration: none;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(380px, 0.92fr);
  gap: clamp(36px, 6vw, 86px);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.header`
  max-width: 720px;
`;

const Eyebrow = styled.div`
  margin-bottom: 20px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(40px, 4.7vw, 68px);
  font-weight: 420;
  line-height: 1;
  letter-spacing: -0.057em;
  text-wrap: balance;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin-top: 30px;
  color: var(--nd-text-secondary);
  font-size: 13px;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;

  span:first-child {
    color: var(--nd-accent);
  }
`;

const Cover = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 6px;
  background: var(--nd-surface);

  img {
    object-fit: cover;
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: clamp(40px, 6vw, 86px);
  margin-top: 96px;
  align-items: start;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  min-width: 0;

  .wmde-markdown {
    background: transparent !important;
    color: var(--nd-text-secondary) !important;
    font-family: inherit;
    font-size: 17px;
    line-height: 1.75;
  }

  .wmde-markdown h1,
  .wmde-markdown h2,
  .wmde-markdown h3 {
    border-bottom: 0;
    color: var(--nd-text);
    font-weight: 560;
    letter-spacing: -0.035em;
  }

  .wmde-markdown h2 {
    margin-top: 2em;
    font-size: 32px;
  }

  .wmde-markdown a {
    color: var(--nd-accent);
  }

  .wmde-markdown code {
    background: var(--nd-stage);
    color: var(--nd-text-secondary);
  }

  .wmde-markdown pre {
    background: #171719 !important;
  }

  .wmde-markdown pre code {
    background: transparent;
    color: #e7e7e2;
  }
`;

const Embed = styled.div`
  margin-top: 48px;
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 88px;

  @media (max-width: 950px) {
    position: static;
  }
`;

export const NewEventArticle = ({ event }: { event: EventPost }) => {
  const { resolvedMode } = useNewColorMode();
  const initialCover = event.image && isValidImageSrc(event.image) ? event.image : FALLBACK_COVER;
  const [cover, setCover] = useState(initialCover);
  const date = formatEventDateRange(event.eventStartDate, event.eventEndDate);

  return (
    <Article>
      <Back href='/new/events'>← All events</Back>
      <Hero>
        <Header>
          <Eyebrow>Odigos event</Eyebrow>
          <Title>{event.title}</Title>
          <Meta>
            <MetaRow>
              <span>○</span>
              <span>{date || 'Date to be announced'}</span>
            </MetaRow>
            <MetaRow>
              <span>◇</span>
              <span>{event.location || 'Location to be announced'}</span>
            </MetaRow>
            {event.booth && (
              <MetaRow>
                <span>□</span>
                <span>Booth {event.booth}</span>
              </MetaRow>
            )}
          </Meta>
        </Header>
        <Cover>
          <Image
            src={cover}
            alt=''
            fill
            priority
            sizes='(max-width: 900px) 100vw, 46vw'
            onError={() => setCover(FALLBACK_COVER)}
          />
        </Cover>
      </Hero>
      <Body>
        <Content>
          {event.content && (
            <Preview
              source={event.content}
              style={{ background: 'transparent', color: 'var(--nd-text-secondary)' }}
              wrapperElement={{ 'data-color-mode': resolvedMode }}
            />
          )}
          {event.customHtml && (
            <Embed>
              <HtmlEmbed html={event.customHtml} />
            </Embed>
          )}
        </Content>
        <Sidebar>
          <NewEventRegistration
            eventName={event.title}
            hubspotFormId={event.hubspotFormId}
            hubspotPortalId={event.hubspotPortalId}
          />
          <NewEventMap location={event.location} />
        </Sidebar>
      </Body>
    </Article>
  );
};
