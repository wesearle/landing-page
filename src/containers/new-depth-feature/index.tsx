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

  @media (max-width: 600px) {
    padding: 22px 8px 4px;
  }
`;

const Title = styled.h2`
  max-width: 330px;
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
    radial-gradient(circle at 64% 53%, rgba(112, 71, 235, 0.14), transparent 42%),
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
    min-height: 320px;
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
    0 0 70px rgba(112, 71, 235, 0.12);

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

const TraceBody = styled.div`
  padding: 27px 28px 30px;

  @media (max-width: 600px) {
    padding: 18px 16px 20px;
  }
`;

const ComparisonLabel = styled.div<{ $accent?: boolean }>`
  margin-bottom: 8px;
  color: ${({ $accent }) => ($accent ? '#5c38c8' : '#8b8b84')};
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.16em;
`;

const SlowRequest = styled.div`
  display: grid;
  grid-template-columns: 90px minmax(70px, 1fr) 38px 18px;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border: 1px dashed #d8d3e7;
  border-radius: 5px;
  color: #777771;
  font-size: 9px;
  opacity: 0.72;
`;

const SlowBar = styled.span`
  height: 7px;
  border-radius: 10px;
  background: #8361d6;
`;

const Unknown = styled.span`
  color: #7047eb;
  font-size: 15px;
  font-weight: 700;
`;

const RevealArrow = styled.div`
  height: 32px;
  padding-left: 18px;
  color: #30bdb1;
  font-size: 22px;
  line-height: 32px;
`;

const TraceCard = styled.div`
  padding: 13px 14px 12px;
  border: 1px solid #deded8;
  border-radius: 6px;
  background: #fff;
`;

const TraceHeading = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 14px;
  color: #292925;
`;

const Operation = styled.div`
  font-size: 12px;
  font-weight: 650;
`;

const Duration = styled.div`
  color: #7047eb;
  font-size: 11px;
  font-weight: 650;
`;

const TraceRow = styled.div`
  display: grid;
  min-height: 25px;
  grid-template-columns: 140px minmax(0, 1fr) 38px;
  gap: 10px;
  align-items: center;
  color: #4e4e49;
  font-size: 9px;

  @media (max-width: 600px) {
    grid-template-columns: 105px minmax(0, 1fr) 30px;
    gap: 6px;
  }
`;

const SpanName = styled.span<{ $depth?: number; $hot?: boolean }>`
  position: relative;
  padding-left: ${({ $depth = 0 }) => 10 + $depth * 9}px;
  overflow: hidden;
  color: ${({ $hot }) => ($hot ? '#9b315f' : '#454541')};
  font-weight: ${({ $hot }) => ($hot ? 650 : 500)};
  text-overflow: ellipsis;
  white-space: nowrap;

  &::before {
    position: absolute;
    top: 50%;
    left: ${({ $depth = 0 }) => $depth * 9}px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ $hot }) => ($hot ? '#f05f9b' : '#43cbbf')};
    content: '';
    transform: translateY(-50%);
  }
`;

const SpanTimeline = styled.div`
  position: relative;
  height: 7px;
  border-radius: 10px;
  background: #f0f0eb;
`;

const SpanBar = styled.span<{ $offset: number; $width: number; $hot?: boolean; $root?: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $offset }) => $offset}%;
  width: ${({ $width }) => $width}%;
  min-width: 5px;
  border-radius: 10px;
  background: ${({ $hot, $root }) =>
    $hot
      ? 'linear-gradient(90deg, #f069a3, #8b55ff)'
      : $root
        ? 'linear-gradient(90deg, #50dace, #8b74f5)'
        : '#57c9c0'};
  box-shadow: ${({ $hot }) => ($hot ? '0 0 10px rgba(240, 105, 163, 0.45)' : 'none')};
`;

const SpanDuration = styled.span`
  color: #777771;
  text-align: right;
`;

const RootCause = styled.div`
  margin: -2px 0 5px 37px;
  color: #d54f89;
  font-size: 7px;
  font-weight: 600;

  @media (max-width: 600px) {
    margin-left: 28px;
  }
`;

export const NewDepthFeature = () => {
  return (
    <Section>
      <FeatureCard>
        <Copy>
          <Title>See the exact call that broke production.</Title>
          <Description>
            Other tools tell you a request was slow. Odigos shows you the function, query, or call that caused it
            across AI-written code, compiled binaries, and legacy services—without manual instrumentation.
          </Description>
          <LearnLink href={DOCS_LINK} target='_blank' rel='noopener noreferrer'>
            Learn about deep application visibility →
          </LearnLink>
        </Copy>
        <Illustration aria-label='Odigos reveals the exact operation behind a slow distributed trace'>
          <ProductWindow>
            <WindowBar>
              <WindowDots aria-hidden='true'>
                <WindowDot />
                <WindowDot />
                <WindowDot />
              </WindowDots>
              Odigos
            </WindowBar>
            <TraceBody>
              <ComparisonLabel>OTHER TOOLS</ComparisonLabel>
              <SlowRequest>
                <span>GET /checkout</span>
                <SlowBar />
                <span>1.4s</span>
                <Unknown>?</Unknown>
              </SlowRequest>
              <RevealArrow aria-hidden='true'>↓</RevealArrow>
              <ComparisonLabel $accent>WITH ODIGOS</ComparisonLabel>
              <TraceCard>
                <TraceHeading>
                  <Operation>GET /checkout</Operation>
                  <Duration>1.4s</Duration>
                </TraceHeading>
                <TraceRow>
                  <SpanName>GET /checkout</SpanName>
                  <SpanTimeline>
                    <SpanBar $offset={0} $width={100} $root />
                  </SpanTimeline>
                  <SpanDuration>1.4s</SpanDuration>
                </TraceRow>
                <TraceRow>
                  <SpanName $depth={1}>auth.verify</SpanName>
                  <SpanTimeline>
                    <SpanBar $offset={4} $width={18} />
                  </SpanTimeline>
                  <SpanDuration>90ms</SpanDuration>
                </TraceRow>
                <TraceRow>
                  <SpanName $depth={2} $hot>
                    db.query orders
                  </SpanName>
                  <SpanTimeline>
                    <SpanBar $offset={11} $width={84} $hot />
                  </SpanTimeline>
                  <SpanDuration>1.1s</SpanDuration>
                </TraceRow>
                <RootCause>the exact call that broke production</RootCause>
                <TraceRow>
                  <SpanName $depth={2}>redis.get session</SpanName>
                  <SpanTimeline>
                    <SpanBar $offset={14} $width={14} />
                  </SpanTimeline>
                  <SpanDuration>30ms</SpanDuration>
                </TraceRow>
                <TraceRow>
                  <SpanName $depth={1}>payment.charge</SpanName>
                  <SpanTimeline>
                    <SpanBar $offset={21} $width={24} />
                  </SpanTimeline>
                  <SpanDuration>0.2s</SpanDuration>
                </TraceRow>
              </TraceCard>
            </TraceBody>
          </ProductWindow>
        </Illustration>
      </FeatureCard>
    </Section>
  );
};
