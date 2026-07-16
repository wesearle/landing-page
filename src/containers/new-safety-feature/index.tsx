'use client';

import styled from 'styled-components';
import { BENCHMARKS_LINK } from '@/constants';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 72px;
  }
`;

const FeatureCard = styled.div`
  display: grid;
  min-height: 580px;
  grid-template-columns: minmax(280px, 0.34fr) minmax(0, 0.66fr);
  gap: 28px;
  padding: 28px;
  overflow: hidden;
  background: var(--nd-surface);

  @media (max-width: 900px) {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: 24px;
    padding: 16px;
  }
`;

const Copy = styled.div`
  display: flex;
  max-width: 360px;
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 12px;

  @media (max-width: 900px) {
    max-width: 620px;
    padding: 24px 12px 8px;
  }
`;

const Title = styled.h2`
  max-width: 350px;
  margin: 0 0 18px;
  color: var(--nd-text);
  font-size: clamp(28px, 2.45vw, 40px);
  font-weight: 520;
  line-height: 1.04;
  letter-spacing: -0.045em;
`;

const Description = styled.p`
  margin: 0 0 24px;
  color: var(--nd-text-secondary);
  font-size: 18px;
  line-height: 1.48;
  letter-spacing: -0.018em;
`;

const LearnLink = styled.a`
  color: var(--nd-accent);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid var(--nd-accent);
    outline-offset: 4px;
  }
`;

const Illustration = styled.div`
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 524px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 70% 35%, rgba(112, 71, 235, 0.16), transparent 35%),
    radial-gradient(circle at 30% 68%, rgba(80, 246, 232, 0.1), transparent 34%),
    #111113;

  &::after {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, 0.045);
    content: '';
    pointer-events: none;
  }

  @media (max-width: 900px) {
    min-height: 460px;
  }

  @media (max-width: 600px) {
    min-height: 340px;
  }
`;

const ProductWindow = styled.div`
  width: min(88%, 650px);
  overflow: hidden;
  border: 1px solid rgba(26, 26, 23, 0.18);
  border-radius: 8px;
  background: #f8f8f4;
  box-shadow:
    0 34px 80px rgba(0, 0, 0, 0.38),
    0 0 70px rgba(112, 71, 235, 0.1);

  @media (max-width: 600px) {
    width: 92%;
  }
`;

const WindowBar = styled.div`
  position: relative;
  display: flex;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #deded8;
  color: #6f6f69;
  font-size: 9px;
  font-weight: 500;
`;

const WindowDots = styled.div`
  position: absolute;
  left: 12px;
  display: flex;
  gap: 5px;
`;

const WindowDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c8c8c1;
`;

const Dashboard = styled.div`
  padding: 25px;

  @media (max-width: 600px) {
    padding: 17px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Eyebrow = styled.div`
  margin-bottom: 6px;
  color: #898983;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.14em;
`;

const DashboardTitle = styled.div`
  color: #282824;
  font-size: 16px;
  font-weight: 620;
  letter-spacing: -0.025em;
`;

const Protected = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #358d84;
  font-size: 8px;

  &::before {
    display: grid;
    width: 16px;
    height: 16px;
    place-items: center;
    border-radius: 50%;
    background: #dff5f1;
    content: '✓';
    font-size: 9px;
    font-weight: 700;
  }
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
  margin-bottom: 16px;
`;

const Metric = styled.div`
  padding: 12px;
  border: 1px solid #deded8;
  border-radius: 5px;
  background: #fff;
`;

const MetricLabel = styled.div`
  margin-bottom: 6px;
  color: #85857f;
  font-size: 7px;
`;

const MetricValue = styled.div`
  color: #343430;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -0.03em;
`;

const Guardrails = styled.div`
  overflow: hidden;
  border: 1px solid #deded8;
  border-radius: 5px;
  background: #fff;
`;

const GuardrailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #e7e7e2;
  color: #454540;
  font-size: 9px;
  font-weight: 600;
`;

const GuardrailRow = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 9px 12px;
  border-bottom: 1px solid #eeeeea;
  color: #5d5d57;
  font-size: 8px;

  &:last-child {
    border-bottom: 0;
  }
`;

const Check = styled.span`
  display: grid;
  width: 14px;
  height: 14px;
  place-items: center;
  border-radius: 3px;
  background: #e7f7f4;
  color: #2f998f;
  font-size: 8px;
  font-weight: 700;
`;

const State = styled.span`
  color: #8a8a84;
  font-size: 7px;
`;

export const NewSafetyFeature = () => {
  return (
    <Section>
      <FeatureCard>
        <Copy>
          <Title>Safe enough to let AI run production.</Title>
          <Description>
            Odigos runs out of process in an eBPF sandbox enforced by the Linux kernel. Under 1% overhead, no code
            changes, and no restarts—so production keeps running at full speed.
          </Description>
          <LearnLink href={BENCHMARKS_LINK} target='_blank' rel='noopener noreferrer'>
            Explore performance and safety →
          </LearnLink>
        </Copy>
        <Illustration aria-label='Odigos safety and performance guardrails'>
          <ProductWindow>
            <WindowBar>
              <WindowDots aria-hidden='true'>
                <WindowDot />
                <WindowDot />
                <WindowDot />
              </WindowDots>
              Odigos
            </WindowBar>
            <Dashboard>
              <Header>
                <div>
                  <Eyebrow>RUNTIME SAFETY</Eyebrow>
                  <DashboardTitle>Production guardrails</DashboardTitle>
                </div>
                <Protected>Protected</Protected>
              </Header>
              <MetricGrid>
                <Metric>
                  <MetricLabel>CPU overhead</MetricLabel>
                  <MetricValue>0.7%</MetricValue>
                </Metric>
                <Metric>
                  <MetricLabel>Code changes</MetricLabel>
                  <MetricValue>0</MetricValue>
                </Metric>
                <Metric>
                  <MetricLabel>Restarts</MetricLabel>
                  <MetricValue>0</MetricValue>
                </Metric>
              </MetricGrid>
              <Guardrails>
                <GuardrailHeader>
                  <span>eBPF sandbox</span>
                  <Protected>Active</Protected>
                </GuardrailHeader>
                <GuardrailRow>
                  <Check>✓</Check>
                  <span>Kernel-enforced memory isolation</span>
                  <State>Enabled</State>
                </GuardrailRow>
                <GuardrailRow>
                  <Check>✓</Check>
                  <span>Automatic overhead limits</span>
                  <State>Enabled</State>
                </GuardrailRow>
                <GuardrailRow>
                  <Check>✓</Check>
                  <span>AI action policy controls</span>
                  <State>Enabled</State>
                </GuardrailRow>
              </Guardrails>
            </Dashboard>
          </ProductWindow>
        </Illustration>
      </FeatureCard>
    </Section>
  );
};
