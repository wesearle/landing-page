'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { COMPARISONS } from '@/constants';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 72px;
  }
`;

const Card = styled.article`
  display: grid;
  min-height: 480px;
  grid-template-columns: minmax(300px, 0.42fr) minmax(0, 0.58fr);
  gap: 28px;
  padding: 28px;
  background: var(--nd-surface);

  @media (max-width: 800px) {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: 22px;
    padding: 16px;
  }
`;

const Copy = styled.div`
  display: flex;
  max-width: 470px;
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 34px 20px;

  @media (max-width: 800px) {
    padding: 24px 12px 8px;
  }
`;

const Label = styled.div`
  margin-bottom: 20px;
  color: var(--nd-accent);
  font-size: 12px;
  font-weight: 600;
`;

const Title = styled.h2`
  margin: 0 0 17px;
  color: var(--nd-text);
  font-size: clamp(34px, 4vw, 54px);
  font-weight: 450;
  line-height: 1.02;
  letter-spacing: -0.05em;
`;

const Description = styled.p`
  margin: 0 0 28px;
  color: var(--nd-text-secondary);
  font-size: 17px;
  line-height: 1.48;
`;

const ReadLink = styled(Link)`
  color: var(--nd-accent);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }
`;

const Visual = styled.div`
  position: relative;
  display: flex;
  min-height: 424px;
  align-items: center;
  justify-content: center;
  gap: clamp(22px, 4vw, 54px);
  overflow: hidden;
  padding: 40px;
  background:
    radial-gradient(circle at 50% 50%, rgba(112, 71, 235, 0.23), transparent 38%),
    #111113;

  &::before {
    position: absolute;
    inset: 0;
    opacity: 0.3;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    content: '';
    mask-image: radial-gradient(circle at center, #000, transparent 76%);
  }

  @media (max-width: 600px) {
    min-height: 310px;
    padding: 28px;
  }
`;

const LogoCard = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  width: clamp(105px, 15vw, 165px);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(32, 31, 36, 0.86);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.3);

  img {
    width: 58%;
    height: 58%;
    object-fit: contain;
  }
`;

const Versus = styled.span`
  position: relative;
  z-index: 1;
  color: #aaa9a4;
  font-size: 14px;
  font-weight: 600;
`;

export const NewComparisonsGrid = () => {
  return (
    <Section>
      {COMPARISONS.map(({ slug, title, subtitle, logos }) => (
        <Card key={slug}>
          <Copy>
            <Label>Instrumentation comparison</Label>
            <Title>{title}</Title>
            <Description>{subtitle}</Description>
            <ReadLink href={`/new/comparisons/${slug}`}>Read comparison →</ReadLink>
          </Copy>
          <Visual aria-label={`${title} logos`}>
            <LogoCard>
              <Image src={logos[0].src} alt={logos[0].alt} width={120} height={120} />
            </LogoCard>
            <Versus>vs</Versus>
            <LogoCard>
              <Image src={logos[1].src} alt={logos[1].alt} width={120} height={120} />
            </LogoCard>
          </Visual>
        </Card>
      ))}
    </Section>
  );
};
