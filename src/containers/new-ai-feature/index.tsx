'use client';

import styled from 'styled-components';
import { DOCS_LINK } from '@/constants';

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
  grid-template-columns: minmax(0, 0.66fr) minmax(280px, 0.34fr);
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
  max-width: 380px;
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
  max-width: 370px;
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
    radial-gradient(circle at 30% 48%, rgba(80, 246, 232, 0.12), transparent 36%),
    radial-gradient(circle at 72% 46%, rgba(112, 71, 235, 0.17), transparent 38%),
    #111113;

  @media (max-width: 900px) {
    order: 2;
    min-height: 460px;
  }

  @media (max-width: 600px) {
    min-height: 350px;
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
    0 0 70px rgba(80, 218, 206, 0.08);

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

const WindowBody = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Conversation = styled.div`
  padding: 22px;
  border-right: 1px solid #deded8;

  @media (max-width: 600px) {
    padding: 17px;
    border-right: 0;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 8px;
  color: #898983;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.14em;
`;

const Prompt = styled.div`
  margin-bottom: 13px;
  padding: 11px;
  border: 1px solid #deded8;
  border-radius: 5px;
  background: #fff;
  color: #3d3d38;
  font-size: 9px;
  line-height: 1.45;
`;

const AgentReply = styled.div`
  padding: 11px;
  border: 1px solid #cfc2f1;
  border-radius: 5px;
  background: #f1ecfc;
  color: #554477;
  font-size: 9px;
  line-height: 1.45;
`;

const Activity = styled.div`
  margin-top: 13px;
  color: #777771;
  font-size: 8px;
`;

const ActivityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 0;

  &::before {
    display: grid;
    width: 13px;
    height: 13px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background: #e0f5f1;
    color: #34998f;
    content: '✓';
    font-size: 7px;
    font-weight: 700;
  }
`;

const Evidence = styled.div`
  padding: 22px;
  background: #fbfbf8;

  @media (max-width: 600px) {
    display: none;
  }
`;

const EvidenceHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const EvidenceTitle = styled.div`
  color: #292925;
  font-size: 12px;
  font-weight: 650;
`;

const Live = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #358d84;
  font-size: 8px;

  &::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #50dace;
    content: '';
  }
`;

const RootCause = styled.div`
  margin-bottom: 10px;
  padding: 11px;
  border: 1px solid #e6b9cf;
  border-radius: 5px;
  background: #fff2f7;
`;

const RootCauseLabel = styled.div`
  margin-bottom: 5px;
  color: #b24776;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.1em;
`;

const RootCauseText = styled.div`
  color: #7b3152;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.4;
`;

const Fact = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  padding: 8px 4px;
  border-bottom: 1px solid #e7e7e2;
  color: #777771;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 7px;

  span:last-child {
    color: #393935;
  }
`;

export const NewAiFeature = () => {
  return (
    <Section>
      <FeatureCard>
        <Illustration aria-label='AI uses Odigos to collect live production evidence'>
          <ProductWindow>
            <WindowBar>
              <WindowDots aria-hidden='true'>
                <WindowDot />
                <WindowDot />
                <WindowDot />
              </WindowDots>
              Odigos
            </WindowBar>
            <WindowBody>
              <Conversation>
                <Eyebrow>AI PRODUCTION ASSISTANT</Eyebrow>
                <Prompt>Why did checkout failures spike in the last five minutes?</Prompt>
                <AgentReply>I’ll collect the missing evidence from the running service.</AgentReply>
                <Activity>
                  <ActivityRow>Enabled database query capture</ActivityRow>
                  <ActivityRow>Analyzed live checkout traces</ActivityRow>
                  <ActivityRow>Found the failing operation</ActivityRow>
                </Activity>
              </Conversation>
              <Evidence>
                <EvidenceHeader>
                  <div>
                    <Eyebrow>RETURNED LIVE</Eyebrow>
                    <EvidenceTitle>Production evidence</EvidenceTitle>
                  </div>
                  <Live>Live</Live>
                </EvidenceHeader>
                <RootCause>
                  <RootCauseLabel>ROOT CAUSE</RootCauseLabel>
                  <RootCauseText>inventory_items query exceeded its connection deadline.</RootCauseText>
                </RootCause>
                <Fact>
                  <span>code.function.name</span>
                  <span>reserveInventory</span>
                </Fact>
                <Fact>
                  <span>db.operation.name</span>
                  <span>SELECT</span>
                </Fact>
                <Fact>
                  <span>server.duration</span>
                  <span>1.12s</span>
                </Fact>
              </Evidence>
            </WindowBody>
          </ProductWindow>
        </Illustration>
        <Copy>
          <Title>No model can debug evidence nobody collected.</Title>
          <Description>
            Every AI SRE reads dashboards built before the incident. Odigos lets AI ask production for exactly the
            evidence it needs, the moment it needs it. Better data beats a smarter model.
          </Description>
          <LearnLink href={DOCS_LINK} target='_blank' rel='noopener noreferrer'>
            Learn about AI-ready observability →
          </LearnLink>
        </Copy>
      </FeatureCard>
    </Section>
  );
};
