'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { INVESTORS } from '@/constants';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 72px;
  }
`;

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 44px;
`;

const Eyebrow = styled.div`
  margin-bottom: 14px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--nd-text);
  font-size: clamp(38px, 4.5vw, 64px);
  font-weight: 430;
  line-height: 1.02;
  letter-spacing: -0.055em;
`;

const Description = styled.p`
  max-width: 650px;
  margin: 22px 0 0;
  color: var(--nd-text-secondary);
  font-size: 18px;
  line-height: 1.48;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.a`
  display: flex;
  min-height: 340px;
  min-width: 0;
  flex-direction: column;
  padding: 24px;
  background: var(--nd-surface);
  color: inherit;
  text-decoration: none;
  transition:
    background 180ms ease,
    transform 180ms ease;

  &:hover {
    background: var(--nd-stage);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const LogoArea = styled.div`
  display: flex;
  height: 112px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: auto;

  img {
    width: auto;
    max-width: 150px;
    height: 58px;
    object-fit: contain;
    object-position: left center;
    filter: grayscale(1) brightness(0.2);
  }

  html[data-new-theme='dark'] & img {
    filter: grayscale(1) brightness(0) invert(1);
  }
`;

const Name = styled.h3`
  margin: 30px 0 10px;
  color: var(--nd-text);
  font-size: 18px;
  font-weight: 550;
  letter-spacing: -0.025em;
`;

const CardDescription = styled.p`
  margin: 0;
  color: var(--nd-text-secondary);
  font-size: 13px;
  line-height: 1.45;
`;

export const NewAboutInvestors = () => {
  return (
    <Section>
      <Header>
        <Eyebrow>Investors</Eyebrow>
        <Title>Backed by infrastructure investors.</Title>
        <Description>
          The funds that backed the last generation of infrastructure companies are backing the one that replaces
          them.
        </Description>
      </Header>
      <Grid>
        {INVESTORS.map(({ name, description, url, image }) => (
          <Card key={name} href={url} target='_blank' rel='noopener noreferrer'>
            <LogoArea>
              <Image src={image} alt={name} width={150} height={58} />
            </LogoArea>
            <Name>{name}</Name>
            <CardDescription>{description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};
