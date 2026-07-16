'use client';

import styled from 'styled-components';

const Hero = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 88px 0 92px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 60px 0 68px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 20px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
`;

const Title = styled.h1`
  max-width: 940px;
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.06em;
  text-wrap: balance;
`;

const Description = styled.p`
  max-width: 720px;
  margin: 32px 0 0;
  color: var(--nd-text-secondary);
  font-size: clamp(18px, 1.65vw, 22px);
  line-height: 1.48;
  letter-spacing: -0.02em;
`;

export const NewAboutHero = () => {
  return (
    <Hero>
      <Eyebrow>About Odigos</Eyebrow>
      <Title>We brought observability to AI.</Title>
      <Description>
        AI writes code now, and it ships to production faster than any team can watch it. The tools meant to catch it
        were built for software people typed by hand.
      </Description>
    </Hero>
  );
};
