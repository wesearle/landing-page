'use client';

import styled from 'styled-components';
import { CONTACT_SALES_LINK, QUICKSTART_LINK } from '@/constants';

const Hero = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 88px 0 74px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 60px 0 54px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 20px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
`;

const Title = styled.h1`
  max-width: 960px;
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.06em;
  text-wrap: balance;
`;

const Description = styled.p`
  max-width: 740px;
  margin: 32px 0 0;
  color: var(--nd-text-secondary);
  font-size: clamp(18px, 1.65vw, 22px);
  line-height: 1.48;
  letter-spacing: -0.02em;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 40px;

  @media (max-width: 600px) {
    align-items: flex-start;
    gap: 8px;
  }
`;

const Action = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-border)')};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-stage)')};
  color: ${({ $primary }) => ($primary ? 'var(--nd-button-text)' : 'var(--nd-text-strong)')};
  font-size: 16px;
  text-decoration: none;

  &:hover {
    opacity: 0.82;
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

export const NewPricingHero = () => {
  return (
    <Hero>
      <Eyebrow>Pricing</Eyebrow>
      <Title>Start free. Scale to production.</Title>
      <Description>
        Run Odigos open source yourself, or start a 14-day Enterprise trial with full eBPF depth, multi-cluster
        control, security, and support. No credit card.
      </Description>
      <Actions>
        <Action $primary href={QUICKSTART_LINK} target='_blank' rel='noopener noreferrer'>
          Start with open source →
        </Action>
        <Action href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
          Talk to sales →
        </Action>
      </Actions>
    </Hero>
  );
};
