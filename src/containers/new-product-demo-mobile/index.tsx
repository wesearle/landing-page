'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { DatadogLogo, JaegerLogo } from '@/containers/new-product-demo/destination-logos';
import { SourceIcon } from '@/containers/new-product-demo/source-icon';

type Capability = 'pipeline' | 'sampling' | 'enrichment' | 'central' | 'ai';
type AiPhase = 'typing' | 'thinking' | 'findings';

const CAPABILITIES: { id: Capability; label: string; shortLabel: string }[] = [
  { id: 'pipeline', label: 'Create pipeline', shortLabel: 'Pipeline' },
  { id: 'sampling', label: 'Control sampling', shortLabel: 'Sampling' },
  { id: 'enrichment', label: 'Enrich telemetry', shortLabel: 'Enrich' },
  { id: 'central', label: 'Connect your fleet', shortLabel: 'Central' },
  { id: 'ai', label: 'Ask production', shortLabel: 'AI' },
];

const SAMPLING_OPTIONS = [
  { name: 'Health probes', operation: 'GET /healthz, /readyz', before: 1240, rows: 2 },
  { name: 'Successful HTTP', operation: 'HTTP 2xx · GET /api/products', before: 2860, rows: 4 },
  { name: 'Database polling', operation: 'SELECT queue_jobs · every 500ms', before: 780, rows: 3 },
];

const ENRICHMENT_OPTIONS = {
  'Code attributes': [
    { key: 'code.file.path', label: 'File path', value: '/app/src/routes/checkout.ts' },
    { key: 'code.function.name', label: 'Function', value: 'submitCheckout' },
    { key: 'code.line.number', label: 'Line number', value: '148' },
  ],
  'Payload collection': [
    { key: 'http.request.payload', label: 'HTTP request', value: '{"cartId":"cart_7f2","items":3}' },
    { key: 'http.response.payload', label: 'HTTP response', value: '{"orderId":"ord_2941"}' },
    { key: 'db.query.text', label: 'Database query', value: 'SELECT stock FROM inventory' },
  ],
} as const;

type EnrichmentType = keyof typeof ENRICHMENT_OPTIONS;

const AI_THINKING_STEPS = [
  'Mapping the request across services',
  'Comparing healthy and failing traces',
  'Collecting the missing runtime evidence',
];

const Frame = styled.div`
  position: relative;
  z-index: 3;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 8px;
  background: #f6f6f2;
  color: #1b1b18;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.32);
`;

const WindowBar = styled.div`
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid #dcddd7;
  background: #edede8;
  color: #666861;
  font-size: 10px;
`;

const WindowDots = styled.span`
  display: flex;
  gap: 5px;

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c5c6c0;
  }
`;

const Connected = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #238363;
  font-size: 8px;

  &::before {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #31b98b;
    content: '';
  }
`;

const CapabilityRail = styled.div`
  display: flex;
  gap: 5px;
  padding: 9px;
  overflow-x: auto;
  border-bottom: 1px solid #deded8;
  background: #f0f0eb;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CapabilityButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  flex: 0 0 auto;
  min-height: 30px;
  align-items: center;
  gap: 6px;
  padding: 0 11px;
  border: 1px solid ${({ $active }) => ($active ? '#b69df0' : '#d8d8d1')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#eee7ff' : '#fafaf7')};
  color: ${({ $active }) => ($active ? '#6430d6' : '#70716b')};
  font: inherit;
  font-size: 9px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
`;

const CapabilityNumber = styled.span<{ $active: boolean }>`
  display: inline-grid;
  width: 15px;
  height: 15px;
  border: 1px solid ${({ $active }) => ($active ? '#6f36ed' : '#c9cac3')};
  border-radius: 50%;
  place-items: center;
  background: ${({ $active }) => ($active ? '#6f36ed' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#898a84')};
  font-size: 7px;
`;

const Content = styled.div`
  padding: 18px;
  background: #fafaf7;
`;

const ResultSection = styled.div`
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #deded8;
`;

const Eyebrow = styled.div`
  margin-bottom: 7px;
  color: #8d8e88;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin: 0;
  color: #292a26;
  font-size: 22px;
  font-weight: 520;
  line-height: 1.1;
  letter-spacing: -0.035em;
`;

const Description = styled.p`
  margin: 8px 0 17px;
  color: #6d6f68;
  font-size: 10px;
  line-height: 1.5;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 7px;
  color: #555750;
  font-size: 9px;
  font-weight: 650;

  span {
    color: #9a9b95;
    font-size: 7px;
    font-weight: 400;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
`;

const Option = styled.button<{ $active: boolean; $tone?: 'purple' | 'teal' }>`
  min-width: 0;
  min-height: 50px;
  padding: 8px 9px;
  border: 1px solid ${({ $active, $tone }) => ($active ? ($tone === 'teal' ? '#61cabe' : '#a889ef') : '#d9dad4')};
  border-radius: 7px;
  background: ${({ $active, $tone }) => ($active ? ($tone === 'teal' ? '#eaf8f5' : '#f2edff') : '#fff')};
  color: #353631;
  font: inherit;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;

  small {
    display: block;
    margin-top: 3px;
    overflow: hidden;
    color: #92938d;
    font-size: 7px;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const OptionRow = styled.span`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
`;

const OptionIcon = styled.span<{ $active: boolean; $tone?: 'purple' | 'teal' }>`
  display: inline-grid;
  flex: 0 0 auto;
  width: 25px;
  height: 25px;
  border-radius: 6px;
  place-items: center;
  background: ${({ $active, $tone }) =>
    $active ? ($tone === 'teal' ? '#d6f0eb' : '#6f36ed') : '#eeeee9'};
  color: ${({ $active, $tone }) =>
    $active ? ($tone === 'teal' ? '#218d80' : '#fff') : '#777872'};

  svg {
    width: 17px;
    height: 17px;
  }
`;

const OptionCopy = styled.span`
  min-width: 0;
`;

const RadioMark = styled.span<{ $active: boolean }>`
  display: inline-grid;
  flex: 0 0 auto;
  width: 13px;
  height: 13px;
  border: 1px solid ${({ $active }) => ($active ? '#6f36ed' : '#c7c8c1')};
  border-radius: 50%;
  place-items: center;

  &::after {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #6f36ed;
    content: '';
    opacity: ${({ $active }) => ($active ? 1 : 0)};
  }
`;

const CheckMark = styled.span<{ $active: boolean }>`
  display: inline-grid;
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  border: 1px solid ${({ $active }) => ($active ? '#6f36ed' : '#c7c8c1')};
  border-radius: 4px;
  place-items: center;
  background: ${({ $active }) => ($active ? '#6f36ed' : '#fff')};
  color: #fff;
  font-size: 8px;

  &::after {
    content: '${({ $active }) => ($active ? '✓' : '')}';
  }
`;

const SegmentedControl = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 3px;
  border: 1px solid #d9dad4;
  border-radius: 7px;
  background: #eeeee9;
`;

const Segment = styled.button<{ $active: boolean }>`
  min-height: 32px;
  border: 0;
  border-radius: 5px;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#343530' : '#85867f')};
  box-shadow: ${({ $active }) => ($active ? '0 1px 3px rgba(31, 31, 28, 0.1)' : 'none')};
  font: inherit;
  font-size: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const FullOption = styled(Option)`
  width: 100%;
  min-height: 54px;

  & + & {
    margin-top: 7px;
  }
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #343530;
  font-size: 10px;
  font-weight: 650;
`;

const Live = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #238363;
  font-size: 8px;

  &::before {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #31b98b;
    content: '';
  }
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: 14px;
`;

const Metric = styled.div`
  padding: 9px;
  border: 1px solid #dddeda;
  border-radius: 6px;
  background: #fff;

  strong {
    display: block;
    color: #343530;
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 13px;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #92938d;
    font-size: 6px;
    text-transform: uppercase;
  }
`;

const Trace = styled.div`
  overflow: hidden;
  border: 1px solid #dddeda;
  border-radius: 7px;
  background: #fff;
`;

const WaterfallHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(116px, 0.95fr) minmax(120px, 1.3fr) 34px;
  align-items: center;
  gap: 7px;
  margin-bottom: 5px;
  color: #999a94;
  font-size: 6px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TimelineRuler = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'SFMono-Regular', Consolas, monospace;
  letter-spacing: 0;
  text-transform: none;
`;

const TraceRow = styled.div<{ $selected?: boolean }>`
  display: grid;
  grid-template-columns: minmax(116px, 0.95fr) minmax(120px, 1.3fr) 34px;
  min-height: 43px;
  align-items: center;
  gap: 7px;
  padding: 0 9px;
  background: ${({ $selected }) => ($selected ? '#eee9fb' : 'transparent')};
  color: #5f615a;

  & + & {
    border-top: 1px solid #ecece7;
  }
`;

const SpanIdentity = styled.div<{ $depth?: number }>`
  position: relative;
  min-width: 0;
  padding-left: ${({ $depth = 0 }) => 4 + $depth * 13}px;

  ${({ $depth = 0 }) =>
    $depth > 0 &&
    `
      &::before {
        position: absolute;
        top: 2px;
        left: ${4 + ($depth - 1) * 13}px;
        width: 9px;
        height: 10px;
        border-bottom: 1px solid #b7b9b2;
        border-left: 1px solid #b7b9b2;
        content: '';
      }
    `}
`;

const TraceSpanService = styled.div`
  overflow: hidden;
  color: #777872;
  font-size: 7px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TraceSpanOperation = styled.div`
  overflow: hidden;
  margin-top: 2px;
  color: #343530;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 8px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Timeline = styled.div`
  position: relative;
  height: 20px;
  overflow: hidden;
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent calc(25% - 1px),
      #ecece7 calc(25% - 1px),
      #ecece7 25%
    ),
    #f5f5f1;
`;

const Bar = styled.span<{ $width: number; $offset?: number; $root?: boolean }>`
  display: block;
  width: ${({ $width }) => $width}%;
  height: 8px;
  margin-left: ${({ $offset = 0 }) => $offset}%;
  border-radius: 3px;
  background: ${({ $root }) =>
    $root ? 'linear-gradient(90deg, #7047eb, #5820d5)' : 'linear-gradient(90deg, #258f83, #50bdb1)'};
  transform: translateY(6px);
`;

const Duration = styled.span`
  color: #777872;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 7px;
  text-align: right;
`;

const AttributeCard = styled.div`
  padding: 12px;
  border: 1px solid #bfe3dc;
  border-radius: 7px;
  background: #f0faf8;
`;

const Attribute = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 7px 0;
  color: #6a6b65;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 7px;

  & + & {
    border-top: 1px solid #d9ebe7;
  }

  span:last-child {
    color: #218d80;
    text-align: right;
  }
`;

const SpanDetails = styled.div`
  overflow: hidden;
  border: 1px solid #d8d7d1;
  border-radius: 7px;
  background: #fafaf7;
`;

const SpanHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 11px;
  border-bottom: 1px solid #e2e2dc;
  background: #f0f0eb;
`;

const SpanService = styled.div`
  color: #218d80;
  font-size: 8px;
  font-weight: 650;
`;

const SpanOperation = styled.div`
  margin-top: 2px;
  color: #353631;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 9px;
  font-weight: 650;
`;

const SpanId = styled.div`
  flex: 0 0 auto;
  color: #92938d;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 6px;
`;

const SpanAttributes = styled.div`
  padding: 10px 11px;
`;

const SpanAttributesLabel = styled.div`
  margin-bottom: 5px;
  color: #858780;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
`;

const SpanAttribute = styled.div<{ $added?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px;
  padding: 7px 0;
  border-top: 1px solid #ecece7;
  background: ${({ $added }) => ($added ? 'linear-gradient(90deg, rgba(111, 54, 237, 0.07), transparent)' : 'transparent')};
  color: #6f716a;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 7px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span:last-child {
    color: ${({ $added }) => ($added ? '#6f36ed' : '#343530')};
    text-align: right;
  }
`;

const FleetCard = styled.div`
  display: grid;
  grid-template-columns: 27px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 9px;
  border: 1px solid #bfe3dc;
  border-radius: 7px;
  background: #f0faf8;

  & + & {
    margin-top: 7px;
  }
`;

const FleetIcon = styled.span`
  display: grid;
  width: 27px;
  height: 27px;
  border-radius: 6px;
  place-items: center;
  background: #e7e0fb;
  color: #6f36ed;
  font-size: 8px;
  font-weight: 750;

  svg {
    width: 17px;
    height: 17px;
  }
`;

const FleetCopy = styled.div`
  min-width: 0;
  color: #343530;
  font-size: 9px;
  font-weight: 650;

  small {
    display: block;
    margin-top: 3px;
    color: #898a84;
    font-size: 7px;
    font-weight: 400;
  }
`;

const FleetState = styled.span`
  color: #238363;
  font-size: 7px;
`;

const caretBlink = keyframes`
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: 0; }
`;

const thinkingPulse = keyframes`
  0%, 100% {
    transform: scale(0.88);
    opacity: 0.45;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Question = styled.div`
  margin: 0 0 10px 18%;
  padding: 9px 11px;
  border-radius: 8px 8px 2px 8px;
  background: #292a26;
  color: #fff;
  font-size: 9px;
`;

const TypingCaret = styled.span`
  display: inline-block;
  width: 1px;
  height: 1em;
  margin-left: 2px;
  background: currentColor;
  vertical-align: -0.12em;
  animation: ${caretBlink} 700ms steps(1) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ThinkingCard = styled.div`
  display: flex;
  min-height: 88px;
  align-items: center;
  gap: 13px;
  padding: 13px;
  border: 1px solid #dddeda;
  border-radius: 2px 8px 8px 8px;
  background: #fff;
`;

const ThinkingOrb = styled.span`
  position: relative;
  display: grid;
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  place-items: center;
  background: #eee7ff;
  color: #6f36ed;
  font-size: 15px;

  &::before,
  &::after {
    position: absolute;
    border-radius: inherit;
    border: 1px solid #a889ef;
    content: '';
    inset: -4px;
    animation: ${thinkingPulse} 1.4s ease-in-out infinite;
  }

  &::after {
    inset: -8px;
    animation-delay: 350ms;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;

const ThinkingCopy = styled.div`
  min-width: 0;

  strong {
    display: block;
    color: #343530;
    font-size: 9px;
  }

  span {
    display: block;
    margin-top: 5px;
    color: #898a84;
    font-size: 8px;
  }
`;

const ThinkingDots = styled.span`
  &::after {
    content: '...';
    display: inline-block;
    width: 12px;
    overflow: hidden;
    vertical-align: bottom;
    animation: ${caretBlink} 900ms steps(3) infinite;
  }
`;

const Answer = styled.div`
  padding: 11px;
  border: 1px solid #dddeda;
  border-radius: 2px 8px 8px 8px;
  background: #fff;
  color: #5f615a;
  font-size: 8px;
  line-height: 1.5;
`;

const RootCause = styled.div`
  margin-top: 11px;
  padding: 11px;
  border: 1px solid #bfe3dc;
  border-radius: 7px;
  background: #f0faf8;

  span {
    color: #218d80;
    font-size: 7px;
    font-weight: 750;
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 5px;
    color: #292a26;
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 9px;
    line-height: 1.4;
  }
`;

const EnvironmentGlyph = ({ kind }: { kind: string }) => {
  if (kind === 'K8s') {
    return (
      <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
        <circle cx='12' cy='12' r='7' stroke='currentColor' strokeWidth='1.7' />
        <circle cx='12' cy='12' r='2.3' stroke='currentColor' strokeWidth='1.7' />
        <path
          d='M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8'
          stroke='currentColor'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
      </svg>
    );
  }

  if (kind === 'λ') {
    return (
      <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
        <path d='M7 4h4.1l6.2 16h-3.6L9.1 7.2H7V4Z' fill='currentColor' />
        <path d='M15.2 14.2H20V20h-3v-2.8h-1.8v-3Z' fill='currentColor' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <rect x='3' y='4' width='18' height='13' rx='2' stroke='currentColor' strokeWidth='1.7' />
      <path d='M8 20h8M12 17v3M7 8h5M7 11h8' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
};

export const NewProductDemoMobile = () => {
  const [capability, setCapability] = useState<Capability>('pipeline');
  const [source, setSource] = useState('frontend');
  const [destination, setDestination] = useState('Jaeger');
  const [sampling, setSampling] = useState('Health probes');
  const [samplingScope, setSamplingScope] = useState<'cluster' | 'frontend'>('cluster');
  const [enrichment, setEnrichment] = useState<EnrichmentType>('Code attributes');
  const [enrichmentScope, setEnrichmentScope] = useState<'cluster' | 'frontend'>('cluster');
  const [enrichmentSelections, setEnrichmentSelections] = useState<Record<EnrichmentType, string[]>>({
    'Code attributes': ['code.file.path', 'code.function.name'],
    'Payload collection': ['http.request.payload', 'http.response.payload'],
  });
  const [environments, setEnvironments] = useState(['K8s']);
  const [question, setQuestion] = useState('Why is checkout slow?');
  const [aiPhase, setAiPhase] = useState<AiPhase>('typing');
  const [typedQuestion, setTypedQuestion] = useState('');
  const [thinkingStep, setThinkingStep] = useState(0);

  useEffect(() => {
    if (capability !== 'ai') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedQuestion(question);
      setAiPhase('findings');
      return;
    }

    setTypedQuestion('');
    setAiPhase('typing');
    setThinkingStep(0);

    let character = 0;
    const typingTimer = window.setInterval(() => {
      character += 1;
      setTypedQuestion(question.slice(0, character));
      if (character >= question.length) window.clearInterval(typingTimer);
    }, 28);
    const typingDuration = question.length * 28;
    const thinkingTimer = window.setTimeout(() => setAiPhase('thinking'), typingDuration + 260);
    const findingsTimer = window.setTimeout(() => setAiPhase('findings'), typingDuration + 2400);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(thinkingTimer);
      window.clearTimeout(findingsTimer);
    };
  }, [capability, question]);

  useEffect(() => {
    if (aiPhase !== 'thinking') return;
    const timer = window.setInterval(
      () => setThinkingStep((current) => (current + 1) % AI_THINKING_STEPS.length),
      650,
    );
    return () => window.clearInterval(timer);
  }, [aiPhase]);

  const chooseCapability = (nextCapability: Capability) => {
    setCapability(nextCapability);
  };

  const toggleEnvironment = (environment: string) => {
    setEnvironments((current) =>
      current.includes(environment) ? current.filter((item) => item !== environment) : [...current, environment],
    );
  };
  const activeSampling = SAMPLING_OPTIONS.find(({ name }) => name === sampling) ?? SAMPLING_OPTIONS[0];
  const toggleEnrichmentOption = (key: string) => {
    setEnrichmentSelections((current) => ({
      ...current,
      [enrichment]: current[enrichment].includes(key)
        ? current[enrichment].filter((item) => item !== key)
        : [...current[enrichment], key],
    }));
  };

  const renderConfigure = () => {
    if (capability === 'pipeline') {
      return (
        <>
          <Eyebrow>Create pipeline</Eyebrow>
          <Title>Instrument a service</Title>
          <Description>Select a workload and where its traces should go.</Description>
          <Label>Source</Label>
          <OptionGrid>
            {['frontend', 'checkout', 'payment', 'inventory'].map((item) => (
              <Option key={item} $active={source === item} onClick={() => setSource(item)}>
                <OptionRow>
                  <OptionIcon $active={source === item}>
                    <SourceIcon size={17} />
                  </OptionIcon>
                  <OptionCopy>
                    {item}
                    <small>{item === 'inventory' ? 'StatefulSet' : 'Deployment'}</small>
                  </OptionCopy>
                </OptionRow>
              </Option>
            ))}
          </OptionGrid>
          <Label>Destination</Label>
          <OptionGrid>
            {[
              { name: 'Jaeger', Logo: JaegerLogo },
              { name: 'Datadog', Logo: DatadogLogo },
            ].map(({ name, Logo }) => {
              const selected = destination === name;
              return (
                <Option key={name} $active={selected} $tone='teal' onClick={() => setDestination(name)}>
                  <OptionRow>
                    <OptionIcon $active={selected} $tone='teal'>
                      <Logo size={17} />
                    </OptionIcon>
                    <OptionCopy>
                      {name}
                      <small>Traces</small>
                    </OptionCopy>
                  </OptionRow>
                </Option>
              );
            })}
          </OptionGrid>
        </>
      );
    }

    if (capability === 'sampling') {
      return (
        <>
          <Eyebrow>Sampling rule</Eyebrow>
          <Title>Remove the noise</Title>
          <Description>Choose repetitive operations to reduce at the source.</Description>
          {SAMPLING_OPTIONS.map(({ name, operation }) => (
            <FullOption key={name} $active={sampling === name} onClick={() => setSampling(name)}>
              <OptionRow>
                <RadioMark $active={sampling === name} />
                <OptionCopy>
                  {name}
                  <small>{operation}</small>
                </OptionCopy>
              </OptionRow>
            </FullOption>
          ))}
          <Label>Source scope</Label>
          <SegmentedControl>
            <Segment $active={samplingScope === 'cluster'} onClick={() => setSamplingScope('cluster')}>
              Entire cluster
            </Segment>
            <Segment $active={samplingScope === 'frontend'} onClick={() => setSamplingScope('frontend')}>
              Only frontend
            </Segment>
          </SegmentedControl>
        </>
      );
    }

    if (capability === 'enrichment') {
      return (
        <>
          <Eyebrow>Instrumentation rule</Eyebrow>
          <Title>Collect missing context</Title>
          <Description>Add evidence to live traces without restarting the application.</Description>
          {(Object.keys(ENRICHMENT_OPTIONS) as EnrichmentType[]).map((item) => (
            <FullOption key={item} $active={enrichment === item} onClick={() => setEnrichment(item)}>
              <OptionRow>
                <RadioMark $active={enrichment === item} />
                <OptionCopy>
                  {item}
                  <small>{item === 'Code attributes' ? 'Function, file, and line number' : 'Selected request fields'}</small>
                </OptionCopy>
              </OptionRow>
            </FullOption>
          ))}
          <Label>
            Attributes to collect
            <span>Select one or more</span>
          </Label>
          <OptionGrid>
            {ENRICHMENT_OPTIONS[enrichment].map((option) => {
              const selected = enrichmentSelections[enrichment].includes(option.key);
              return (
                <Option key={option.key} $active={selected} onClick={() => toggleEnrichmentOption(option.key)}>
                  <OptionRow>
                    <CheckMark $active={selected} />
                    <OptionCopy>{option.label}</OptionCopy>
                  </OptionRow>
                </Option>
              );
            })}
          </OptionGrid>
          <Label>Source scope</Label>
          <SegmentedControl>
            <Segment $active={enrichmentScope === 'cluster'} onClick={() => setEnrichmentScope('cluster')}>
              Entire cluster
            </Segment>
            <Segment $active={enrichmentScope === 'frontend'} onClick={() => setEnrichmentScope('frontend')}>
              Only frontend
            </Segment>
          </SegmentedControl>
        </>
      );
    }

    if (capability === 'central') {
      return (
        <>
          <Eyebrow>Odigos Central</Eyebrow>
          <Title>Connect your fleet</Title>
          <Description>Manage Kubernetes, VMs, and functions from one control plane.</Description>
          {[
            ['K8s', 'production-k8s', '42 services'],
            ['VM', 'payments-vms', '9 processes'],
            ['λ', 'checkout-functions', '8 functions'],
          ].map(([icon, name, meta]) => (
            <FullOption key={name} $active={environments.includes(icon)} onClick={() => toggleEnvironment(icon)}>
              <OptionRow>
                <OptionIcon $active={environments.includes(icon)}>
                  <EnvironmentGlyph kind={icon} />
                </OptionIcon>
                <OptionCopy>
                  {name}
                  <small>{meta}</small>
                </OptionCopy>
              </OptionRow>
            </FullOption>
          ))}
        </>
      );
    }

    return (
      <>
        <Eyebrow>Production assistant</Eyebrow>
        <Title>Ask production</Title>
        <Description>Choose a question for an evidence-backed investigation.</Description>
        {['Why is checkout slow?', 'Why are payments failing?', 'What changed after deploy?'].map((item) => (
          <FullOption key={item} $active={question === item} onClick={() => setQuestion(item)}>
            <OptionRow>
              <OptionIcon $active={question === item}>✦</OptionIcon>
              <OptionCopy>
                {item}
                <small>Investigate live telemetry</small>
              </OptionCopy>
            </OptionRow>
          </FullOption>
        ))}
      </>
    );
  };

  const renderResult = () => {
    if (capability === 'pipeline') {
      return (
        <>
          <ResultHeader>
            Distributed trace
            <Live>Streaming to {destination}</Live>
          </ResultHeader>
          <WaterfallHeader>
            <span>Service / operation</span>
            <TimelineRuler><span>0ms</span><span>234ms</span><span>468ms</span></TimelineRuler>
            <span />
          </WaterfallHeader>
          <Trace>
            <TraceRow>
              <SpanIdentity>
                <TraceSpanService>ingress-gateway</TraceSpanService>
                <TraceSpanOperation>HTTP POST /checkout</TraceSpanOperation>
              </SpanIdentity>
              <Timeline><Bar $width={100} $root /></Timeline>
              <Duration>468ms</Duration>
            </TraceRow>
            <TraceRow $selected>
              <SpanIdentity $depth={1}>
                <TraceSpanService>{source}</TraceSpanService>
                <TraceSpanOperation>POST /api/checkout</TraceSpanOperation>
              </SpanIdentity>
              <Timeline><Bar $width={76} $offset={8} /></Timeline>
              <Duration>352ms</Duration>
            </TraceRow>
            <TraceRow>
              <SpanIdentity $depth={2}>
                <TraceSpanService>inventory-service</TraceSpanService>
                <TraceSpanOperation>SELECT inventory_items</TraceSpanOperation>
              </SpanIdentity>
              <Timeline><Bar $width={48} $offset={20} /></Timeline>
              <Duration>224ms</Duration>
            </TraceRow>
          </Trace>
        </>
      );
    }

    if (capability === 'sampling') {
      return (
        <>
          <ResultHeader>
            Sampling preview
            <Live>Rule active</Live>
          </ResultHeader>
          <MetricGrid>
            <Metric><strong>{activeSampling.before.toLocaleString()}</strong><span>Before / min</span></Metric>
            <Metric><strong>0</strong><span>After / min</span></Metric>
            <Metric><strong>100%</strong><span>Reduction</span></Metric>
          </MetricGrid>
          <WaterfallHeader>
            <span>Service / operation</span>
            <TimelineRuler><span>0ms</span><span>234ms</span><span>468ms</span></TimelineRuler>
            <span />
          </WaterfallHeader>
          <Trace>
            <TraceRow>
              <SpanIdentity>
                <TraceSpanService>ingress-gateway</TraceSpanService>
                <TraceSpanOperation>HTTP POST /checkout</TraceSpanOperation>
              </SpanIdentity>
              <Timeline><Bar $width={100} $root /></Timeline>
              <Duration>468ms</Duration>
            </TraceRow>
            <TraceRow $selected>
              <SpanIdentity $depth={1}>
                <TraceSpanService>frontend</TraceSpanService>
                <TraceSpanOperation>POST /api/checkout</TraceSpanOperation>
              </SpanIdentity>
              <Timeline><Bar $width={76} $offset={8} /></Timeline>
              <Duration>352ms</Duration>
            </TraceRow>
            <TraceRow>
              <SpanIdentity $depth={2}>
                <TraceSpanService>inventory-service</TraceSpanService>
                <TraceSpanOperation>SELECT stock</TraceSpanOperation>
              </SpanIdentity>
              <Timeline><Bar $width={48} $offset={20} /></Timeline>
              <Duration>224ms</Duration>
            </TraceRow>
          </Trace>
        </>
      );
    }

    if (capability === 'enrichment') {
      return (
        <>
          <ResultHeader>
            Enriched span
            <Live>Live preview</Live>
          </ResultHeader>
          <SpanDetails>
            <SpanHeader>
              <div>
                <SpanService>frontend</SpanService>
                <SpanOperation>POST /api/checkout</SpanOperation>
              </div>
              <SpanId>span 7b4f1a9c3de92c</SpanId>
            </SpanHeader>
            <SpanAttributes>
              <SpanAttributesLabel>Span attributes</SpanAttributesLabel>
              <SpanAttribute>
                <span>span.kind</span>
                <span>SERVER</span>
              </SpanAttribute>
              <SpanAttribute>
                <span>http.request.method</span>
                <span>POST</span>
              </SpanAttribute>
              <SpanAttribute>
                <span>url.path</span>
                <span>/api/checkout</span>
              </SpanAttribute>
              {ENRICHMENT_OPTIONS[enrichment]
                .filter(({ key }) => enrichmentSelections[enrichment].includes(key))
                .map(({ key, value }) => (
                  <SpanAttribute key={key} $added>
                    <span>{key}</span>
                    <span>{value}</span>
                  </SpanAttribute>
                ))}
            </SpanAttributes>
          </SpanDetails>
        </>
      );
    }

    if (capability === 'central') {
      return (
        <>
          <ResultHeader>
            Unified control plane
            <Live>{environments.length} connected</Live>
          </ResultHeader>
          {[
            ['K8s', 'production-k8s', '42 services instrumented'],
            ['VM', 'payments-vms', '9 processes instrumented'],
            ['λ', 'checkout-functions', '8 functions instrumented'],
          ]
            .filter(([icon]) => environments.includes(icon))
            .map(([icon, name, meta]) => (
              <FleetCard key={name}>
                <FleetIcon><EnvironmentGlyph kind={icon} /></FleetIcon>
                <FleetCopy>{name}<small>{meta}</small></FleetCopy>
                <FleetState>Managed</FleetState>
              </FleetCard>
            ))}
        </>
      );
    }

    const payment = question.includes('payments');
    const deploy = question.includes('deploy');
    return (
      <>
        <ResultHeader>
          Production investigation
            <Live>
              {aiPhase === 'typing' ? 'Receiving question' : aiPhase === 'thinking' ? 'Investigating' : 'Evidence ready'}
            </Live>
        </ResultHeader>
          <Question>
            {typedQuestion}
            {aiPhase === 'typing' && <TypingCaret aria-hidden='true' />}
          </Question>
          {aiPhase === 'thinking' && (
            <ThinkingCard role='status'>
              <ThinkingOrb aria-hidden='true'>✦</ThinkingOrb>
              <ThinkingCopy>
                <strong>
                  Thinking
                  <ThinkingDots aria-hidden='true' />
                </strong>
                <span>{AI_THINKING_STEPS[thinkingStep]}</span>
              </ThinkingCopy>
            </ThinkingCard>
          )}
          {aiPhase === 'findings' && (
            <>
              <Answer>
                {payment
                  ? 'Payment requests expire before the upstream provider responds. The timeout changed in deployment v2.4.1.'
                  : deploy
                    ? 'Version 2.4.1 introduced a repeated inventory query in buildOrder(), increasing checkout latency.'
                    : 'Slow checkout requests spend 287ms in the inventory query. Code attributes identify reserveStock() as the affected call.'}
              </Answer>
              <RootCause>
                <span>Root cause</span>
                <strong>
                  {payment
                    ? 'payment-service · createCharge()'
                    : deploy
                      ? 'checkout-service · buildOrder()'
                      : 'inventory-service · reserveStock()'}
                </strong>
              </RootCause>
            </>
          )}
      </>
    );
  };

  return (
    <Frame>
      <WindowBar>
        <WindowDots aria-hidden='true'><i /><i /><i /></WindowDots>
        {capability === 'central' ? 'Odigos Central' : capability === 'ai' ? 'Production assistant' : 'Kubernetes cluster'}
        <Connected>Connected</Connected>
      </WindowBar>
      <CapabilityRail aria-label='Odigos capabilities'>
        {CAPABILITIES.map(({ id, shortLabel }, index) => (
          <CapabilityButton
            key={id}
            type='button'
            $active={capability === id}
            aria-pressed={capability === id}
            onClick={() => chooseCapability(id)}
          >
            <CapabilityNumber $active={capability === id}>{index + 1}</CapabilityNumber>
            {shortLabel}
          </CapabilityButton>
        ))}
      </CapabilityRail>
      <Content>
        {renderConfigure()}
        <ResultSection>{renderResult()}</ResultSection>
      </Content>
    </Frame>
  );
};
