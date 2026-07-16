'use client';

import styled from 'styled-components';
import type { ComparisonPage } from '@/constants/comparisons';

type MatrixValue = boolean | string;

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

const Description = styled.p`
  margin: 20px 0 0;
  color: var(--nd-text-secondary);
  font-size: 17px;
`;

const Scroll = styled.div`
  overflow-x: auto;
  border: 1px solid var(--nd-border);

  @media (max-width: 700px) {
    display: none;
  }
`;

const Table = styled.div`
  min-width: 720px;
`;

const Row = styled.div<{ $header?: boolean }>`
  display: grid;
  min-height: ${({ $header }) => ($header ? '74px' : '58px')};
  grid-template-columns: minmax(320px, 1.55fr) repeat(2, minmax(180px, 1fr));
  align-items: center;
  border-bottom: 1px solid var(--nd-border);
  background: ${({ $header }) => ($header ? 'var(--nd-stage)' : 'var(--nd-page)')};

  &:last-child {
    border-bottom: 0;
  }
`;

const Cell = styled.div<{ $label?: boolean; $odigos?: boolean }>`
  display: flex;
  min-width: 0;
  height: 100%;
  align-items: center;
  padding: 0 22px;
  border-left: ${({ $label }) => ($label ? '0' : '1px solid var(--nd-border)')};
  background: ${({ $odigos }) => ($odigos ? 'rgba(112, 71, 235, 0.04)' : 'transparent')};
  color: var(--nd-text-secondary);
  font-size: 14px;
`;

const ColumnName = styled.div`
  color: var(--nd-text);
  font-size: 16px;
  font-weight: 600;
`;

const Check = styled.span`
  display: grid;
  width: 23px;
  height: 23px;
  place-items: center;
  border-radius: 50%;
  background: #e2f4f1;
  color: #268f85;
  font-size: 12px;
  font-weight: 750;
`;

const Unavailable = styled.span`
  color: var(--nd-text-muted);
  font-size: 16px;
`;

const ValueTag = styled.span`
  max-width: 100%;
  padding: 5px 8px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--nd-stage);
  color: var(--nd-text-secondary);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MobileComparison = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: block;
    border: 1px solid var(--nd-border);
    background: var(--nd-page);
  }
`;

const MobileHeader = styled.div`
  position: sticky;
  top: 58px;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-bottom: 1px solid var(--nd-border);
  background: color-mix(in srgb, var(--nd-stage) 94%, transparent);
  backdrop-filter: blur(12px);
`;

const MobileColumn = styled.div<{ $odigos?: boolean }>`
  min-width: 0;
  padding: 15px 16px;
  border-left: ${({ $odigos }) => ($odigos ? '0' : '1px solid var(--nd-border)')};
  background: ${({ $odigos }) => ($odigos ? 'rgba(112, 71, 235, 0.045)' : 'transparent')};
`;

const MobileFeature = styled.div`
  border-bottom: 1px solid var(--nd-border);

  &:last-child {
    border-bottom: 0;
  }
`;

const MobileFeatureName = styled.div`
  padding: 15px 16px 10px;
  color: var(--nd-text-secondary);
  font-size: 13px;
  line-height: 1.4;
`;

const MobileValues = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const MobileValue = styled.div<{ $odigos?: boolean }>`
  display: flex;
  min-width: 0;
  min-height: 50px;
  align-items: center;
  padding: 8px 16px 14px;
  border-left: ${({ $odigos }) => ($odigos ? '0' : '1px solid var(--nd-border)')};
  background: ${({ $odigos }) => ($odigos ? 'rgba(112, 71, 235, 0.025)' : 'transparent')};
`;

const renderValue = (value: MatrixValue) => {
  if (value === true) return <Check aria-label='Supported'>✓</Check>;
  if (value === false) return <Unavailable aria-label='Not supported'>—</Unavailable>;
  return <ValueTag>{value}</ValueTag>;
};

export const NewComparisonMatrix = ({ comparison }: { comparison: ComparisonPage }) => {
  return (
    <Section>
      <Header>
        <Eyebrow>Feature matrix</Eyebrow>
        <Title>Support comparison.</Title>
        <Description>{comparison.matrixIntro}</Description>
      </Header>
      <Scroll>
        <Table role='table' aria-label={`${comparison.title} feature comparison`}>
          <Row $header role='row'>
            <Cell $label role='columnheader'>
              Capability
            </Cell>
            <Cell $odigos role='columnheader'>
              <ColumnName>Odigos</ColumnName>
            </Cell>
            <Cell role='columnheader'>
              <ColumnName>{comparison.competitorShort}</ColumnName>
            </Cell>
          </Row>
          {comparison.matrix.map(({ feature, odigos, competitor }) => (
            <Row key={feature} role='row'>
              <Cell $label role='rowheader'>
                {feature}
              </Cell>
              <Cell $odigos role='cell'>
                {renderValue(odigos)}
              </Cell>
              <Cell role='cell'>{renderValue(competitor)}</Cell>
            </Row>
          ))}
        </Table>
      </Scroll>
      <MobileComparison aria-label={`${comparison.title} feature comparison`}>
        <MobileHeader>
          <MobileColumn $odigos>
            <ColumnName>Odigos</ColumnName>
          </MobileColumn>
          <MobileColumn>
            <ColumnName>{comparison.competitorShort}</ColumnName>
          </MobileColumn>
        </MobileHeader>
        {comparison.matrix.map(({ feature, odigos, competitor }) => (
          <MobileFeature key={feature}>
            <MobileFeatureName>{feature}</MobileFeatureName>
            <MobileValues>
              <MobileValue $odigos>{renderValue(odigos)}</MobileValue>
              <MobileValue>{renderValue(competitor)}</MobileValue>
            </MobileValues>
          </MobileFeature>
        ))}
      </MobileComparison>
    </Section>
  );
};
