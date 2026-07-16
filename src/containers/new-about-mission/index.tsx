'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 72px;
  }
`;

const Card = styled.div`
  display: grid;
  min-height: 610px;
  grid-template-columns: minmax(300px, 0.42fr) minmax(0, 0.58fr);
  gap: 28px;
  padding: 28px;
  background: var(--nd-surface);

  @media (max-width: 900px) {
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
  max-width: 500px;
  align-self: center;
  flex-direction: column;
  padding: 34px 20px;

  @media (max-width: 900px) {
    max-width: 720px;
    padding: 24px 12px 8px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 18px;
  color: var(--nd-accent);
  font-size: 12px;
  font-weight: 550;
`;

const Title = styled.h2`
  margin: 0 0 24px;
  color: var(--nd-text);
  font-size: clamp(34px, 3.7vw, 54px);
  font-weight: 450;
  line-height: 1.03;
  letter-spacing: -0.05em;
`;

const Paragraph = styled.p`
  margin: 0 0 18px;
  color: var(--nd-text-secondary);
  font-size: 17px;
  line-height: 1.52;
  letter-spacing: -0.015em;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Visual = styled.div`
  position: relative;
  display: grid;
  min-height: 554px;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 50%, rgba(112, 71, 235, 0.24), transparent 38%),
    radial-gradient(circle at 25% 75%, rgba(80, 246, 232, 0.11), transparent 30%),
    #111113;

  &::before {
    position: absolute;
    inset: 0;
    opacity: 0.34;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    content: '';
    mask-image: radial-gradient(circle at center, #000, transparent 76%);
  }

  @media (max-width: 600px) {
    min-height: 360px;
  }
`;

const Logo = styled(Image)`
  position: relative;
  z-index: 1;
  width: min(68%, 420px);
  height: auto;
  opacity: 0.9;
  filter: drop-shadow(0 0 32px rgba(112, 71, 235, 0.28));
`;

export const NewAboutMission = () => {
  return (
    <Section>
      <Card>
        <Copy>
          <Eyebrow>Our mission</Eyebrow>
          <Title>We rebuilt the layer underneath.</Title>
          <Paragraph>
            Out-of-process eBPF sees inside any running service, captures any signal on demand, and physically cannot
            take production down. Deep, safe, and dynamic at the same time—for the first time.
          </Paragraph>
          <Paragraph>
            Every AI that runs production will need this. We built it first, and it already runs inside some of the
            most demanding production environments on earth.
          </Paragraph>
        </Copy>
        <Visual aria-hidden='true'>
          <Logo src='/assets/odigos/logo_grid.svg' alt='' width={481} height={481} />
        </Visual>
      </Card>
    </Section>
  );
};
