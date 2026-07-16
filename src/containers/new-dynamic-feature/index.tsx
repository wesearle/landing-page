'use client';

import styled, { keyframes } from 'styled-components';
import { ACTIONS_LINK } from '@/constants';

const signalPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(80, 218, 206, 0); }
  50% { box-shadow: 0 0 0 5px rgba(80, 218, 206, 0.12); }
`;

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
  max-width: 360px;
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 12px;

  @media (max-width: 900px) {
    max-width: 620px;
    padding: 24px 12px 8px;
  }

  @media (max-width: 600px) {
    padding: 22px 8px 4px;
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
  font-weight: 400;
  line-height: 1.48;
  letter-spacing: -0.018em;
`;

const LearnLink = styled.a`
  color: var(--nd-accent);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
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
    radial-gradient(circle at 38% 48%, rgba(80, 246, 232, 0.12), transparent 34%),
    radial-gradient(circle at 68% 52%, rgba(112, 71, 235, 0.16), transparent 40%),
    #111113;

  &::after {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, 0.045);
    content: '';
    pointer-events: none;
  }

  @media (max-width: 900px) {
    order: 2;
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
    0 0 70px rgba(80, 218, 206, 0.08);

  @media (max-width: 600px) {
    width: 92%;
    border-radius: 6px;
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

const RulePanel = styled.div`
  padding: 24px;
  border-right: 1px solid #deded8;

  @media (max-width: 600px) {
    padding: 17px;
    border-right: 0;
    border-bottom: 1px solid #deded8;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 7px;
  color: #898983;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.14em;
`;

const PanelTitle = styled.div`
  margin-bottom: 18px;
  color: #282824;
  font-size: 15px;
  font-weight: 620;
  letter-spacing: -0.025em;
`;

const Label = styled.div`
  margin: 13px 0 6px;
  color: #74746e;
  font-size: 8px;
  font-weight: 600;
`;

const SelectBox = styled.div`
  display: flex;
  min-height: 31px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid #d8d8d2;
  border-radius: 4px;
  background: #fff;
  color: #41413d;
  font-size: 9px;
`;

const RuleOption = styled.div<{ $active?: boolean }>`
  display: flex;
  min-height: 35px;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  padding: 0 9px;
  border: 1px solid ${({ $active }) => ($active ? '#a88cec' : '#deded8')};
  border-radius: 4px;
  background: ${({ $active }) => ($active ? '#f0eafd' : '#fff')};
  color: #44443f;
  font-size: 9px;
`;

const Check = styled.span<{ $active?: boolean }>`
  display: grid;
  width: 13px;
  height: 13px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid ${({ $active }) => ($active ? '#7047eb' : '#cdcdc7')};
  border-radius: 3px;
  background: ${({ $active }) => ($active ? '#7047eb' : '#fff')};
  color: #fff;
  font-size: 8px;
`;

const PreviewPanel = styled.div`
  padding: 24px;
  background: #fbfbf8;

  @media (max-width: 600px) {
    display: none;
  }
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 17px;
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
    animation: ${signalPulse} 2.2s ease-in-out infinite;
  }
`;

const TraceOperation = styled.div`
  color: #292925;
  font-size: 12px;
  font-weight: 650;
`;

const SpanCard = styled.div`
  overflow: hidden;
  border: 1px solid #deded8;
  border-radius: 5px;
  background: #fff;
`;

const SpanHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e5e5df;
  color: #4b4b46;
  font-size: 8px;
`;

const Attribute = styled.div<{ $new?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 8px 10px;
  border-bottom: 1px solid #eeeeea;
  background: ${({ $new }) => ($new ? '#f1ecfc' : '#fff')};
  color: ${({ $new }) => ($new ? '#6040b2' : '#777771')};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 7px;

  &:last-child {
    border-bottom: 0;
  }

  span:last-child {
    overflow: hidden;
    color: #3f3f3b;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const NewDynamicFeature = () => {
  return (
    <Section>
      <FeatureCard>
        <Illustration aria-label='Odigos captures new telemetry from a running application without a redeploy'>
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
              <RulePanel>
                <Eyebrow>LIVE INSTRUMENTATION</Eyebrow>
                <PanelTitle>Capture missing signal</PanelTitle>
                <Label>Source</Label>
                <SelectBox>
                  checkout-service <span>⌄</span>
                </SelectBox>
                <Label>Collect</Label>
                <RuleOption $active>
                  <Check $active>✓</Check>
                  Code attributes
                </RuleOption>
                <RuleOption $active>
                  <Check $active>✓</Check>
                  Request payload
                </RuleOption>
              </RulePanel>
              <PreviewPanel>
                <PreviewHeader>
                  <div>
                    <Eyebrow>NEW TELEMETRY</Eyebrow>
                    <TraceOperation>POST /checkout</TraceOperation>
                  </div>
                  <Live>Live</Live>
                </PreviewHeader>
                <SpanCard>
                  <SpanHeader>
                    <span>checkout-service</span>
                    <span>span attributes</span>
                  </SpanHeader>
                  <Attribute>
                    <span>http.request.method</span>
                    <span>POST</span>
                  </Attribute>
                  <Attribute $new>
                    <span>code.function.name</span>
                    <span>processPayment</span>
                  </Attribute>
                  <Attribute $new>
                    <span>code.file.path</span>
                    <span>checkout/payment.go</span>
                  </Attribute>
                  <Attribute $new>
                    <span>request.payload</span>
                    <span>{`{"plan":"pro"}`}</span>
                  </Attribute>
                </SpanCard>
              </PreviewPanel>
            </WindowBody>
          </ProductWindow>
        </Illustration>
        <Copy>
          <Title>Get the signal you never collected. After it breaks.</Title>
          <Description>
            Old tools lock in what they capture at deploy time. Odigos turns on the eBPF probe you need while
            production is running—in real time, without a redeploy.
          </Description>
          <LearnLink href={ACTIONS_LINK} target='_blank' rel='noopener noreferrer'>
            Learn about live instrumentation →
          </LearnLink>
        </Copy>
      </FeatureCard>
    </Section>
  );
};
