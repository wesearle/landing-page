'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { CUSTOMERS } from '@/constants';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 36px 0 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 24px 0 72px;
  }
`;

const Heading = styled.h2`
  margin: 0 0 24px;
  color: var(--nd-text);
  font-size: 14px;
  font-weight: 450;
  line-height: 1.4;
  text-align: center;
  letter-spacing: -0.01em;
`;

const ClientGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 7px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ClientCard = styled.a`
  display: flex;
  min-width: 0;
  height: 104px;
  align-items: center;
  justify-content: center;
  padding: 22px;
  overflow: hidden;
  border: 1px solid var(--nd-border);
  border-radius: 2px;
  background: var(--nd-surface);
  transition:
    background 180ms ease,
    transform 180ms ease;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    filter: grayscale(1) brightness(0.2);
    opacity: 0.88;
    transition: opacity 180ms ease;
  }

  html[data-new-theme='dark'] & img {
    filter: grayscale(1) brightness(0) invert(1);
  }

  &:hover {
    background: var(--nd-stage);
    transform: translateY(-2px);

    img {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 2px;
  }

  @media (max-width: 800px) {
    height: 92px;
    padding: 18px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const NewClients = () => {
  return (
    <Section aria-labelledby='clients-heading'>
      <Heading id='clients-heading'>Trusted in production by teams that build at scale</Heading>
      <ClientGrid>
        {CUSTOMERS.map(({ src, alt, href, width, height }) => (
          <ClientCard key={alt} href={href} target='_blank' rel='noopener noreferrer' aria-label={`Visit ${alt}`}>
            <Image src={src} alt={alt} width={width} height={height} />
          </ClientCard>
        ))}
      </ClientGrid>
    </Section>
  );
};
