'use client';

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

const Stage = styled.div`
  display: grid;
  min-height: 360px;
  place-items: center;
  padding: 48px;
  background: var(--nd-stage);

  @media (max-width: 600px) {
    min-height: 300px;
    padding: 28px 20px;
  }
`;

const Statement = styled.p`
  max-width: 760px;
  margin: 0;
  color: var(--nd-text);
  font-size: clamp(24px, 2.5vw, 36px);
  font-weight: 520;
  line-height: 1.28;
  text-align: center;
  letter-spacing: -0.035em;
`;

export const NewStatement = () => {
  return (
    <Section aria-label='Odigos production observability statement'>
      <Stage>
        <Statement>
          Production breaks. You ask it what happened.
          <br />
          Root cause in seconds, not days.
          <br />
          No redeploy. No war room.
        </Statement>
      </Stage>
    </Section>
  );
};
