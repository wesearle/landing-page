'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import {
  ACTIONS_LINK,
  BENCHMARKS_LINK,
  INFO_SECTIONS_2,
  INSTALL_LINK,
  MULTI_CLUSTER_LINK,
  SYSTEM_REQUIREMENTS_LINK,
} from '@/constants';

const SECTION_LINKS = [
  { label: 'Explore automatic instrumentation', href: INSTALL_LINK },
  { label: 'View supported environments', href: SYSTEM_REQUIREMENTS_LINK },
  { label: 'See performance benchmarks', href: BENCHMARKS_LINK },
  { label: 'Explore centralized management', href: MULTI_CLUSTER_LINK },
  { label: 'Learn about data streams', href: ACTIONS_LINK },
  { label: 'Learn about dynamic rules', href: ACTIONS_LINK },
];

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 76px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 48px;
  }
`;

const Intro = styled.div`
  max-width: 760px;
  padding: 8px 0 56px;
`;

const Eyebrow = styled.div`
  margin-bottom: 14px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
`;

const IntroTitle = styled.h2`
  margin: 0;
  color: var(--nd-text);
  font-size: clamp(38px, 4.5vw, 64px);
  font-weight: 430;
  line-height: 1.02;
  letter-spacing: -0.055em;
`;

const Card = styled.article<{ $reverse: boolean }>`
  display: grid;
  min-height: 540px;
  grid-template-columns: minmax(300px, 0.4fr) minmax(0, 0.6fr);
  gap: 28px;
  margin-bottom: 28px;
  padding: 28px;
  background: var(--nd-surface);

  & > :first-child {
    order: ${({ $reverse }) => ($reverse ? 2 : 1)};
  }

  & > :last-child {
    order: ${({ $reverse }) => ($reverse ? 1 : 2)};
  }

  @media (max-width: 900px) {
    min-height: auto;
    grid-template-columns: 1fr;

    & > :first-child,
    & > :last-child {
      order: initial;
    }
  }

  @media (max-width: 600px) {
    gap: 22px;
    padding: 16px;
  }
`;

const Copy = styled.div`
  display: flex;
  max-width: 430px;
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 34px 18px;

  @media (max-width: 900px) {
    max-width: 700px;
    padding: 24px 12px 8px;
  }
`;

const Number = styled.div`
  margin-bottom: 22px;
  color: var(--nd-text-muted);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`;

const Title = styled.h3`
  margin: 0 0 17px;
  color: var(--nd-text);
  font-size: clamp(28px, 2.5vw, 40px);
  font-weight: 520;
  line-height: 1.05;
  letter-spacing: -0.045em;
`;

const Description = styled.p`
  margin: 0 0 22px;
  color: var(--nd-text-secondary);
  font-size: 17px;
  line-height: 1.48;
  letter-spacing: -0.015em;
`;

const Bullets = styled.ul`
  display: flex;
  margin: 0 0 26px;
  padding: 0;
  flex-direction: column;
  gap: 11px;
  list-style: none;
`;

const Bullet = styled.li`
  position: relative;
  padding-left: 18px;
  color: var(--nd-text-secondary);
  font-size: 14px;
  line-height: 1.45;

  &::before {
    position: absolute;
    top: 0.62em;
    left: 1px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--nd-accent);
    content: '';
  }

  strong {
    color: var(--nd-text-strong);
    font-weight: 600;
  }
`;

const LearnLink = styled.a`
  color: var(--nd-accent);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }
`;

const Illustration = styled.div`
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 484px;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 52% 45%, rgba(112, 71, 235, 0.2), transparent 42%),
    radial-gradient(circle at 25% 75%, rgba(80, 246, 232, 0.1), transparent 32%),
    #111113;

  &::before {
    position: absolute;
    inset: 0;
    opacity: 0.28;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 44px 44px;
    content: '';
    mask-image: radial-gradient(circle at center, #000, transparent 75%);
  }

  @media (max-width: 900px) {
    min-height: 460px;
  }

  @media (max-width: 600px) {
    min-height: 330px;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: min(88%, 620px);
  aspect-ratio: 1;

  img {
    object-fit: contain;
  }
`;

const formatBullet = (value: string): ReactNode[] =>
  value
    .split(/(<strong>.*?<\/strong>)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith('<strong>') ? <strong key={`${part}-${index}`}>{part.replace(/<\/?strong>/g, '')}</strong> : part,
    );

export const NewProductSections = () => {
  return (
    <Section>
      <Intro>
        <Eyebrow>One production data layer</Eyebrow>
        <IntroTitle>Observe every service. Control every signal.</IntroTitle>
      </Intro>
      {INFO_SECTIONS_2.map(({ title, descriptions, bullets, imageSrc }, index) => (
        <Card key={title} $reverse={index % 2 === 1}>
          <Copy>
            <Number>{String(index + 1).padStart(2, '0')}</Number>
            <Title>{title}</Title>
            <Description>{descriptions[0]}</Description>
            <Bullets>
              {bullets.map((bullet) => (
                <Bullet key={bullet}>{formatBullet(bullet)}</Bullet>
              ))}
            </Bullets>
            <LearnLink href={SECTION_LINKS[index].href} target='_blank' rel='noopener noreferrer'>
              {SECTION_LINKS[index].label} →
            </LearnLink>
          </Copy>
          <Illustration>
            <ImageWrap>
              <Image src={imageSrc} alt='' fill sizes='(max-width: 900px) 90vw, 55vw' />
            </ImageWrap>
          </Illustration>
        </Card>
      ))}
    </Section>
  );
};
