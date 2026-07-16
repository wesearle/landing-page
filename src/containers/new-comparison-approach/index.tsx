'use client';

import Image from 'next/image';
import styled from 'styled-components';
import type { ComparisonPage, ComparisonPillar } from '@/constants/comparisons';

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
  max-width: 800px;
  margin-bottom: 42px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article<{ $featured?: boolean }>`
  padding: clamp(28px, 4vw, 48px);
  background: ${({ $featured }) => ($featured ? '#171719' : 'var(--nd-surface)')};
  color: ${({ $featured }) => ($featured ? '#f7f7f2' : 'var(--nd-text)')};
`;

const Name = styled.h3`
  margin: 0;
  font-size: 34px;
  font-weight: 480;
  letter-spacing: -0.045em;
`;

const Tagline = styled.div<{ $featured?: boolean }>`
  margin-top: 9px;
  color: ${({ $featured }) => ($featured ? '#9c82e7' : 'var(--nd-accent)')};
  font-size: 13px;
  font-weight: 550;
`;

const Description = styled.p<{ $featured?: boolean }>`
  min-height: 68px;
  margin: 20px 0 0;
  color: ${({ $featured }) => ($featured ? '#aaa9a4' : 'var(--nd-text-secondary)')};
  font-size: 15px;
  line-height: 1.5;
`;

const DocsLink = styled.a`
  display: inline-flex;
  margin-top: 14px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const Points = styled.div`
  display: grid;
  gap: 1px;
  margin-top: 34px;
`;

const Point = styled.div<{ $featured?: boolean }>`
  display: grid;
  min-height: 92px;
  grid-template-columns: 38px 1fr;
  gap: 13px;
  align-items: center;
  padding: 15px;
  background: ${({ $featured }) => ($featured ? '#222226' : 'var(--nd-page)')};
`;

const Icon = styled.div<{ $featured?: boolean }>`
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 5px;
  background: ${({ $featured }) => ($featured ? '#302a41' : 'var(--nd-stage)')};

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    filter: ${({ $featured }) => ($featured ? 'none' : 'brightness(0.3)')};
  }
`;

const PointTitle = styled.div`
  margin-bottom: 3px;
  font-size: 13px;
  font-weight: 600;
`;

const PointBody = styled.div<{ $featured?: boolean }>`
  color: ${({ $featured }) => ($featured ? '#9e9d98' : 'var(--nd-text-secondary)')};
  font-size: 11px;
  line-height: 1.4;
`;

const PillarCard = ({ pillar, featured }: { pillar: ComparisonPillar; featured?: boolean }) => (
  <Card $featured={featured}>
    <Name>{pillar.name}</Name>
    <Tagline $featured={featured}>{pillar.tagline}</Tagline>
    <Description $featured={featured}>{pillar.description}</Description>
    {pillar.docsUrl && (
      <DocsLink href={pillar.docsUrl} target='_blank' rel='noopener noreferrer'>
        {pillar.docsLabel} →
      </DocsLink>
    )}
    <Points>
      {pillar.points.map(({ title, body, icon }) => (
        <Point key={title} $featured={featured}>
          <Icon $featured={featured}>
            <Image src={icon} alt='' width={18} height={18} />
          </Icon>
          <div>
            <PointTitle>{title}</PointTitle>
            <PointBody $featured={featured}>{body}</PointBody>
          </div>
        </Point>
      ))}
    </Points>
  </Card>
);

export const NewComparisonApproach = ({ comparison }: { comparison: ComparisonPage }) => {
  return (
    <Section>
      <Header>
        <Eyebrow>Approach</Eyebrow>
        <Title>Fundamentally different instrumentation models.</Title>
      </Header>
      <Grid>
        <PillarCard pillar={comparison.odigos} featured />
        <PillarCard pillar={comparison.competitor} />
      </Grid>
    </Section>
  );
};
