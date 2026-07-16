'use client';

import styled, { keyframes } from 'styled-components';
import { NewProductDemo } from '@/containers/new-product-demo';
import { NewProductDemoMobile } from '@/containers/new-product-demo-mobile';

const drift = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(2%, -3%, 0) scale(1.05);
  }
`;

const flow = keyframes`
  to {
    stroke-dashoffset: -48;
  }
`;

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 72px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 48px;
  }
`;

const Stage = styled.div`
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: clamp(430px, 58vw, 720px);
  overflow: hidden;
  border: 1px solid var(--nd-border);
  border-radius: 8px;
  background:
    radial-gradient(circle at 50% 38%, rgba(139, 85, 255, 0.3), transparent 30%),
    radial-gradient(circle at 18% 76%, rgba(80, 246, 232, 0.19), transparent 34%),
    radial-gradient(circle at 86% 22%, rgba(116, 52, 255, 0.2), transparent 29%),
    linear-gradient(145deg, #171619 0%, #100f12 52%, #17141c 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 24px 70px rgba(30, 23, 48, 0.15);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    opacity: 0.42;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: radial-gradient(ellipse at center, #000 18%, transparent 78%);
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 8%;
    left: 30%;
    width: 42%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: rgba(124, 73, 255, 0.18);
    filter: blur(90px);
    animation: ${drift} 12s ease-in-out infinite;
  }

  @media (max-width: 800px) {
    min-height: 0;
    border-radius: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

const FlowMap = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.78;
`;

const StaticPath = styled.path`
  fill: none;
  stroke: rgba(231, 225, 255, 0.14);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
`;

const AnimatedPath = styled.path`
  fill: none;
  stroke: url(#flow-gradient);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-dasharray: 2 22;
  vector-effect: non-scaling-stroke;
  animation: ${flow} 3.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Node = styled.circle`
  fill: #18171b;
  stroke: rgba(234, 228, 255, 0.42);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
`;

const NodeCore = styled.circle`
  fill: #8b55ff;
  filter: drop-shadow(0 0 7px rgba(139, 85, 255, 0.9));
`;

const CyanCore = styled(NodeCore)`
  fill: #50f6e8;
  filter: drop-shadow(0 0 7px rgba(80, 246, 232, 0.85));
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(15, 14, 17, 0.16), transparent 22%, transparent 75%, rgba(15, 14, 17, 0.42)),
    linear-gradient(90deg, rgba(15, 14, 17, 0.35), transparent 20%, transparent 80%, rgba(15, 14, 17, 0.35));
`;

const DesktopDemo = styled.div`
  display: contents;

  @media (max-width: 800px) {
    display: none;
  }
`;

const MobileDemo = styled.div`
  display: none;

  @media (max-width: 800px) {
    position: relative;
    z-index: 2;
    display: block;
    padding: 14px;
  }
`;

export const NewInteractiveStage = () => {
  return (
    <Section>
      <Stage aria-label='Odigos interactive product demo'>
        <FlowMap viewBox='0 0 1200 720' preserveAspectRatio='xMidYMid slice' aria-hidden='true'>
          <defs>
            <linearGradient id='flow-gradient' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0' stopColor='#50f6e8' stopOpacity='0.2' />
              <stop offset='0.5' stopColor='#50f6e8' />
              <stop offset='1' stopColor='#8b55ff' stopOpacity='0.25' />
            </linearGradient>
          </defs>

          <StaticPath d='M-40 160 C180 160 220 320 440 320 S720 205 1240 205' />
          <StaticPath d='M-20 540 C205 540 265 390 470 390 S745 520 1220 520' />
          <StaticPath d='M120 40 C120 240 350 255 350 410 S500 670 500 760' />
          <StaticPath d='M1040 -30 C1040 185 850 250 850 390 S720 640 720 760' />
          <StaticPath d='M-20 350 C220 350 305 250 520 250 S790 350 1220 350' />

          <AnimatedPath d='M-40 160 C180 160 220 320 440 320 S720 205 1240 205' />
          <AnimatedPath d='M-20 540 C205 540 265 390 470 390 S745 520 1220 520' />
          <AnimatedPath d='M-20 350 C220 350 305 250 520 250 S790 350 1220 350' />

          <Node cx='120' cy='160' r='11' />
          <CyanCore cx='120' cy='160' r='3' />
          <Node cx='275' cy='275' r='8' />
          <CyanCore cx='275' cy='275' r='2.5' />
          <Node cx='350' cy='410' r='10' />
          <NodeCore cx='350' cy='410' r='3' />
          <Node cx='850' cy='390' r='10' />
          <NodeCore cx='850' cy='390' r='3' />
          <Node cx='1040' cy='205' r='11' />
          <NodeCore cx='1040' cy='205' r='3' />
          <Node cx='1010' cy='520' r='9' />
          <NodeCore cx='1010' cy='520' r='2.5' />
        </FlowMap>
        <DesktopDemo>
          <NewProductDemo />
        </DesktopDemo>
        <MobileDemo>
          <NewProductDemoMobile />
        </MobileDemo>
        <Vignette />
      </Stage>
    </Section>
  );
};
