'use client';

import styled from 'styled-components';
import { QUICKSTART_LINK } from '@/constants';

const Section = styled.section`
  display: grid;
  min-height: 360px;
  place-items: center;
  padding: 72px 24px 96px;
  background: var(--nd-page);

  @media (max-width: 600px) {
    min-height: 300px;
    padding: 56px 20px 72px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0 0 28px;
  color: var(--nd-text);
  font-size: clamp(44px, 5vw, 72px);
  font-weight: 430;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.055em;
`;

const Button = styled.a`
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-radius: 22px;
  background: var(--nd-button-bg);
  color: var(--nd-button-text);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition:
    background 180ms ease,
    transform 180ms ease;

  &:hover {
    background: var(--nd-button-hover);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const NewCta = () => {
  return (
    <Section>
      <Content>
        <Title>Try Odigos now.</Title>
        <Button href={QUICKSTART_LINK} target='_blank' rel='noopener noreferrer'>
          Get started ↗
        </Button>
      </Content>
    </Section>
  );
};
