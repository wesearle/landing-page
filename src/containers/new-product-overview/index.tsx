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

const Stage = styled.div`
  position: relative;
  min-height: clamp(450px, 61vw, 760px);
  overflow: hidden;
  padding: clamp(28px, 5vw, 72px);
  border: 1px solid var(--nd-border);
  border-radius: 8px;
  background:
    radial-gradient(circle at 50% 35%, rgba(112, 71, 235, 0.28), transparent 34%),
    radial-gradient(circle at 18% 74%, rgba(80, 246, 232, 0.14), transparent 30%),
    #111113;

  &::before {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 52px 52px;
    content: '';
    mask-image: radial-gradient(ellipse at center, #000, transparent 78%);
  }

  @media (max-width: 600px) {
    min-height: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;

    &::before {
      display: none;
    }
  }
`;

const ProductWindow = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 9px;
  background: #18191d;
  box-shadow:
    0 34px 90px rgba(0, 0, 0, 0.46),
    0 0 80px rgba(112, 71, 235, 0.12);
`;

const WindowBar = styled.div`
  position: relative;
  display: flex;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #a9a9a2;
  font-size: 9px;
`;

const Dots = styled.div`
  position: absolute;
  left: 13px;
  display: flex;
  gap: 5px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #55555b;
  }
`;

const Preview = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;

  img {
    object-fit: cover;
  }
`;

export const NewProductOverview = () => {
  return (
    <Section>
      <Stage aria-label='Odigos telemetry pipeline product interface'>
        <ProductWindow>
          <WindowBar>
            <Dots aria-hidden='true'>
              <span />
              <span />
              <span />
            </Dots>
            Production cluster
          </WindowBar>
          <Preview>
            <Image
              src='/assets/renders/product_preview.png'
              alt='Odigos production cluster data stream with sources, actions, and destinations'
              fill
              priority
              sizes='(max-width: 800px) 100vw, 1280px'
            />
          </Preview>
        </ProductWindow>
      </Stage>
    </Section>
  );
};
