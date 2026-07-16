'use client';

import styled from 'styled-components';
import { CONTACT_SALES_LINK, QUICKSTART_LINK } from '@/constants';

const Hero = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 84px 0 58px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 58px 0 42px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 20px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
  letter-spacing: 0.02em;
`;

const Title = styled.h1`
  max-width: 880px;
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.06em;
  text-wrap: balance;
`;

const Description = styled.p`
  max-width: 650px;
  margin: 30px 0 0;
  color: var(--nd-text-secondary);
  font-size: clamp(18px, 1.65vw, 22px);
  line-height: 1.45;
  letter-spacing: -0.02em;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 42px;

  @media (max-width: 600px) {
    align-items: flex-start;
    gap: 8px;
  }
`;

const Action = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 25px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-border)')};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-stage)')};
  color: ${({ $primary }) => ($primary ? 'var(--nd-button-text)' : 'var(--nd-text-strong)')};
  font-size: 17px;
  text-decoration: none;
  transition:
    background 160ms ease,
    transform 160ms ease;

  &:hover {
    background: ${({ $primary }) => ($primary ? 'var(--nd-button-hover)' : 'var(--nd-surface)')};
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    width: auto;
    min-height: 46px;
    padding: 0 18px;
    font-size: 14px;
  }
`;

export const NewProductHero = () => {
  return (
    <Hero>
      <Eyebrow>Odigos platform</Eyebrow>
      <Title>See what your AI shipped.</Title>
      <Description>
        Capture traces, metrics, and logs from every running service—without changing code, restarting workloads, or
        locking your telemetry to one vendor.
      </Description>
      <Actions>
        <Action $primary href={QUICKSTART_LINK} target='_blank' rel='noopener noreferrer'>
          Get started →
        </Action>
        <Action href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
          Request a demo →
        </Action>
      </Actions>
    </Hero>
  );
};
