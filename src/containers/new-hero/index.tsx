'use client';

import styled from 'styled-components';
import { CONTACT_SALES_LINK, QUICKSTART_LINK } from '@/constants';

const Hero = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 78px 0 54px;
  color: var(--nd-text-strong);

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 58px 0 42px;
  }
`;

const Content = styled.div`
  max-width: 780px;
`;

const Title = styled.h1`
  max-width: 760px;
  margin: 0;
  font-size: clamp(44px, 5.15vw, 74px);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.055em;
  text-wrap: balance;

  @media (max-width: 800px) {
    font-size: clamp(42px, 11vw, 58px);
    line-height: 1.02;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 48px;

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;
    margin-top: 36px;
  }
`;

const ActionLink = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 54px;
  padding: 0 25px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-border)')};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-stage)')};
  color: ${({ $primary }) => ($primary ? 'var(--nd-button-text)' : 'var(--nd-text-strong)')};
  font-size: 17px;
  font-weight: 400;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;

  &:hover {
    background: ${({ $primary }) => ($primary ? 'var(--nd-button-hover)' : 'var(--nd-surface)')};
    border-color: ${({ $primary }) => ($primary ? 'var(--nd-button-hover)' : 'var(--nd-border)')};
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Arrow = styled.span`
  font-size: 21px;
  line-height: 0;
  transform: translateY(-1px);
`;

export const NewHero = () => {
  return (
    <Hero>
      <Content>
        <Title>Ask production anything.</Title>

        <Actions>
          <ActionLink $primary href={QUICKSTART_LINK} target='_blank' rel='noopener noreferrer'>
            Get started
            <Arrow aria-hidden='true'>→</Arrow>
          </ActionLink>

          <ActionLink href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
            Request a demo
            <Arrow aria-hidden='true'>→</Arrow>
          </ActionLink>
        </Actions>
      </Content>
    </Hero>
  );
};
