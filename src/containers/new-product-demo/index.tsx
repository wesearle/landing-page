'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { DatadogLogo, JaegerLogo, TempoLogo } from './destination-logos';
import { SourceIcon } from './source-icon';

const Frame = styled.div`
  position: absolute;
  z-index: 3;
  inset: 7% 5%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background: #f6f6f2;
  color: #1b1b18;
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.38),
    0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 800px) {
    inset: 4%;
  }
`;

const WindowBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  border-bottom: 1px solid #dcddd7;
  background: #ededE8;
  font-size: 12px;
  color: #5e605a;
`;

const WindowControls = styled.div`
  position: absolute;
  left: 14px;
  display: flex;
  gap: 6px;
`;

const WindowDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c5c6c0;
`;

const ClusterStatus = styled.span`
  position: absolute;
  right: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #73756e;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #31b98b;
    box-shadow: 0 0 0 3px rgba(49, 185, 139, 0.12);
  }

  @media (max-width: 580px) {
    display: none;
  }
`;

const DemoBody = styled.div`
  display: grid;
  grid-template-columns: minmax(165px, 0.58fr) minmax(280px, 0.94fr) minmax(430px, 1.88fr);
  flex: 1;
  min-height: 0;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;

const StepsPanel = styled.aside`
  padding: 20px 14px;
  border-right: 1px solid #dcddd7;
  background: #f0f0eb;

  @media (max-width: 800px) {
    padding: 13px;
    border-right: 0;
    border-bottom: 1px solid #dcddd7;
  }
`;

const Eyebrow = styled.div`
  margin: 0 8px 14px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #91928c;
  text-transform: uppercase;

  @media (max-width: 800px) {
    margin-bottom: 8px;
  }
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Step = styled.button<{ $active?: boolean }>`
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 8px;
  width: 100%;
  padding: 10px 8px;
  border: 1px solid ${({ $active }) => ($active ? '#d8d8d1' : 'transparent')};
  border-radius: 7px;
  background: ${({ $active }) => ($active ? '#fafaf7' : 'transparent')};
  color: #292a26;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background 150ms ease;

  &:not(:disabled):hover {
    border-color: #d8d8d1;
    background: #f7f7f3;
  }

  &:focus-visible {
    outline: 2px solid #6f36ed;
    outline-offset: 2px;
  }

  &:disabled {
    color: #a5a69f;
    cursor: not-allowed;
    opacity: 0.72;
  }

  @media (max-width: 800px) {
    grid-template-columns: 18px 1fr;
    padding: 8px 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const StepNumber = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ $active }) => ($active ? '#282924' : '#c9cac3')};
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#282924' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#898a84')};
  font-size: 9px;

  @media (max-width: 800px) {
    width: 17px;
    height: 17px;
  }
`;

const StepTitle = styled.div`
  font-size: 11px;
  font-weight: 500;
  line-height: 1.35;
`;

const StepState = styled.div`
  margin-top: 3px;
  font-size: 9px;
  color: #a0a19b;

  @media (max-width: 520px) {
    display: none;
  }
`;

const WorkPanel = styled.section`
  padding: clamp(22px, 3vw, 40px);
  border-right: 1px solid #dcddd7;
  background: #fafaf7;

  @media (max-width: 800px) {
    border-right: 0;
    border-bottom: 1px solid #dcddd7;
  }
`;

const PanelLabel = styled.div`
  margin-bottom: 9px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #8d8e88;
  text-transform: uppercase;
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-size: clamp(21px, 2vw, 28px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.035em;
`;

const PanelDescription = styled.p`
  max-width: 390px;
  margin: 10px 0 24px;
  color: #6d6f68;
  font-size: 12px;
  line-height: 1.55;
`;

const SelectionGroup = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const SelectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
  color: #555750;
  font-size: 10px;
  font-weight: 600;
`;

const SelectionHint = styled.span`
  color: #a0a19a;
  font-size: 8px;
  font-weight: 400;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
`;

const SourceOption = styled.button<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) 14px;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 9px;
  border: 1px solid ${({ $selected }) => ($selected ? '#a889ef' : '#d9dad4')};
  border-radius: 7px;
  background: ${({ $selected }) => ($selected ? '#f2edff' : '#fff')};
  color: #2d2e29;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background 150ms ease;

  &:hover {
    border-color: #a889ef;
  }

  &:focus-visible {
    outline: 2px solid #6f36ed;
    outline-offset: 2px;
  }
`;

const ServiceIcon = styled.span<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${({ $selected }) => ($selected ? '#6f36ed' : '#eeeee9')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#777872')};
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
`;

const OptionText = styled.span`
  min-width: 0;
`;

const OptionName = styled.span`
  display: block;
  overflow: hidden;
  font-size: 9px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const OptionMeta = styled.span`
  display: block;
  margin-top: 2px;
  color: #999a94;
  font-size: 7px;
`;

const Checkbox = styled.span<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  border: 1px solid ${({ $selected }) => ($selected ? '#6f36ed' : '#c7c8c1')};
  border-radius: 4px;
  background: ${({ $selected }) => ($selected ? '#6f36ed' : '#fff')};
  color: #fff;
  font-size: 8px;

  &::after {
    content: '${({ $selected }) => ($selected ? '✓' : '')}';
  }
`;

const DestinationRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
`;

const DestinationOption = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  padding: 9px;
  border: 1px solid ${({ $selected }) => ($selected ? '#61cabe' : '#d9dad4')};
  border-radius: 7px;
  background: ${({ $selected }) => ($selected ? '#eaf8f5' : '#fff')};
  color: #353631;
  cursor: pointer;

  &:hover {
    border-color: #61cabe;
  }

  &:focus-visible {
    outline: 2px solid #218d80;
    outline-offset: 2px;
  }
`;

const DestinationHeader = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  width: 100%;
`;

const DestinationIcon = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
`;

const DestinationName = styled.span`
  overflow: hidden;
  width: 100%;
  font-size: 9px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ResultsPanel = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #f4f4ef;
`;

const ResultsTabs = styled.div`
  display: flex;
  align-items: center;
  min-height: 36px;
  border-bottom: 1px solid #dcddd7;
`;

const ResultTab = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-right: 1px solid #dcddd7;
  background: #fafaf7;
  color: #555750;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 9px;
`;

const ResultContent = styled.div`
  flex: 1;
  padding: clamp(16px, 2vw, 28px);
  overflow: auto;
`;

const ResultHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 11px;
  font-weight: 600;
`;

const Status = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ $active }) => ($active ? '#238363' : '#92938d')};
  font-size: 9px;
  font-weight: 500;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? '#31b98b' : '#bfc0ba')};
  }
`;

const TraceOverview = styled.div`
  margin-bottom: 18px;
  padding: 14px;
  border: 1px solid #dddeda;
  border-radius: 8px;
  background: #fafaf7;
`;

const TraceTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
`;

const TraceOperation = styled.div`
  color: #292a26;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const TraceTimestamp = styled.div`
  margin-top: 4px;
  color: #8b8c86;
  font-size: 8px;
`;

const TraceTotal = styled.div`
  color: #6f36ed;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
`;

const TraceTotalLabel = styled.div`
  margin-top: 2px;
  color: #999a94;
  font-family: inherit;
  font-size: 7px;
  font-weight: 400;
  text-transform: uppercase;
`;

const TraceFacts = styled.div`
  display: grid;
  grid-template-columns: minmax(110px, 1.5fr) repeat(2, minmax(70px, 0.7fr)) minmax(105px, 1fr);
  gap: 12px;
  margin-top: 13px;
  padding-top: 11px;
  border-top: 1px solid #e3e3de;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 9px;
  }
`;

const TraceFact = styled.div`
  min-width: 0;
`;

const TraceFactLabel = styled.div`
  margin-bottom: 3px;
  color: #a0a19a;
  font-size: 7px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const TraceFactValue = styled.div`
  overflow: hidden;
  color: #666861;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TraceDestination = styled(TraceFactValue)`
  color: #218d80;
`;

const traceIn = keyframes`
  from {
    opacity: 0.2;
    transform: scaleX(0.08);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
`;

const traceStream = keyframes`
  from {
    background-position: 120% 0;
  }
  to {
    background-position: -120% 0;
  }
`;

const WaterfallHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 0.9fr) minmax(180px, 1.45fr) 42px;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  color: #999a94;
  font-size: 7px;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  @media (max-width: 1080px) {
    grid-template-columns: minmax(122px, 0.85fr) minmax(170px, 1.4fr) 40px;
  }
`;

const TimelineRuler = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 7px;
  letter-spacing: 0;
  text-transform: none;
`;

const TraceWaterfall = styled.div`
  overflow: hidden;
  border: 1px solid #dddeda;
  border-radius: 7px;
  background: #fafaf7;
`;

const SpanRow = styled.button<{ $selected?: boolean }>`
  display: grid;
  grid-template-columns: minmax(140px, 0.9fr) minmax(180px, 1.45fr) 42px;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 34px;
  padding: 0 10px;
  border: 0;
  background: ${({ $selected }) => ($selected ? '#eee9fb' : 'transparent')};
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 150ms ease;

  & + & {
    border-top: 1px solid #e6e6e1;
  }

  &:hover {
    background: ${({ $selected }) => ($selected ? '#e9e1fb' : '#f2f2ed')};
  }

  &:focus-visible {
    position: relative;
    z-index: 1;
    outline: 2px solid #6f36ed;
    outline-offset: -2px;
  }

  @media (max-width: 1080px) {
    grid-template-columns: minmax(122px, 0.85fr) minmax(170px, 1.4fr) 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const RootSpanRow = styled(SpanRow).attrs({ as: 'div' })`
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

const SpanIdentity = styled.div<{ $depth: number }>`
  position: relative;
  min-width: 0;
  padding-left: ${({ $depth }) => `${$depth * 13}px`};

  ${({ $depth }) =>
    $depth > 0 &&
    `
      &::before {
        content: '';
        position: absolute;
        top: 1px;
        left: ${($depth - 1) * 13 + 3}px;
        width: 7px;
        height: 8px;
        border-bottom: 1px solid #bfc0ba;
        border-left: 1px solid #bfc0ba;
      }
    `}
`;

const SpanService = styled.div`
  overflow: hidden;
  color: #7e8079;
  font-size: 7px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SpanName = styled.div`
  overflow: hidden;
  margin-top: 2px;
  color: #41423d;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 8px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Timeline = styled.div`
  position: relative;
  height: 13px;
  border-right: 1px solid rgba(80, 81, 76, 0.06);
  border-left: 1px solid rgba(80, 81, 76, 0.06);
  background:
    linear-gradient(90deg, rgba(80, 81, 76, 0.06) 1px, transparent 1px) 0 0 / 25% 100%,
    rgba(233, 233, 228, 0.58);
`;

const SpanBar = styled.span<{ $offset: number; $width: number; $index: number; $root?: boolean }>`
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: ${({ $offset }) => `${$offset}%`};
  width: ${({ $width }) => `${$width}%`};
  border-radius: 2px;
  background: ${({ $root }) =>
    $root
      ? 'linear-gradient(100deg, #5623c7 0%, #7741eb 38%, #9b78f2 50%, #7741eb 62%, #5623c7 100%)'
      : 'linear-gradient(100deg, #218d80 0%, #38b9a9 38%, #77eadc 50%, #38b9a9 62%, #218d80 100%)'};
  background-size: 240% 100%;
  box-shadow: 0 0 7px ${({ $root }) => ($root ? 'rgba(111, 54, 237, 0.2)' : 'rgba(33, 141, 128, 0.18)')};
  transform-origin: left center;
  animation:
    ${traceIn} 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both,
    ${traceStream} 2.8s linear infinite;
  animation-delay:
    ${({ $index }) => `${$index * 130}ms`},
    ${({ $index }) => `${700 + $index * 130}ms`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Duration = styled.span`
  color: #72746d;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 8px;
  text-align: right;
`;

const SpanDetails = styled.section`
  margin-top: 10px;
  overflow: hidden;
  border: 1px solid #d8d7d1;
  border-radius: 7px;
  background: #fafaf7;
`;

const SpanDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 11px;
  border-bottom: 1px solid #e2e2dc;
  background: #f0f0eb;
`;

const SpanDetailsTitle = styled.div`
  min-width: 0;
`;

const SpanDetailsService = styled.div`
  overflow: hidden;
  color: #218d80;
  font-size: 8px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SpanDetailsOperation = styled.div`
  overflow: hidden;
  margin-top: 2px;
  color: #353631;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 9px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SpanDetailsId = styled.div`
  flex: 0 0 auto;
  color: #92938d;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 7px;
`;

const AttributeSections = styled.div<{ $single?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $single }) => ($single ? '1fr' : 'repeat(2, minmax(0, 1fr))')};

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const AttributeSection = styled.div`
  min-width: 0;
  padding: 9px 11px;

  & + & {
    border-left: 1px solid #e2e2dc;
  }

  @media (max-width: 1080px) {
    & + & {
      border-top: 1px solid #e2e2dc;
      border-left: 0;
    }
  }
`;

const AttributeSectionLabel = styled.div`
  margin-bottom: 5px;
  color: #858780;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
`;

const AttributeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const attributeAdded = keyframes`
  0% {
    background: rgba(111, 54, 237, 0.18);
  }
  100% {
    background: transparent;
  }
`;

const AttributeRow = styled.tr<{ $added?: boolean }>`
  animation: ${({ $added }) => ($added ? attributeAdded : 'none')} 1.8s ease-out both;

  & + & {
    border-top: 1px solid #ecece7;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AttributeKey = styled.th`
  width: 54%;
  padding: 4px 7px 4px 0;
  overflow: hidden;
  color: #6f716a;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 7px;
  font-weight: 500;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AttributeValue = styled.td`
  padding: 4px 0;
  overflow: hidden;
  color: #343530;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 7px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RuleOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const RuleOption = styled.button<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  gap: 9px;
  padding: 10px;
  border: 1px solid ${({ $selected }) => ($selected ? '#a889ef' : '#d9dad4')};
  border-radius: 7px;
  background: ${({ $selected }) => ($selected ? '#f2edff' : '#fff')};
  color: #2d2e29;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    border-color: #a889ef;
  }

  &:focus-visible {
    outline: 2px solid #6f36ed;
    outline-offset: 2px;
  }
`;

const Radio = styled.span<{ $selected: boolean }>`
  position: relative;
  width: 12px;
  height: 12px;
  margin-top: 1px;
  border: 1px solid ${({ $selected }) => ($selected ? '#6f36ed' : '#bfc0ba')};
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: ${({ $selected }) => ($selected ? '#6f36ed' : 'transparent')};
  }
`;

const RuleName = styled.span`
  display: block;
  font-size: 9px;
  font-weight: 600;
`;

const RuleOperation = styled.span`
  display: block;
  margin-top: 3px;
  overflow: hidden;
  color: #858780;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 7px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SegmentedControl = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 3px;
  border: 1px solid #d9dad4;
  border-radius: 7px;
  background: #eeeee9;
`;

const Segment = styled.button<{ $selected: boolean }>`
  padding: 7px 5px;
  border: 0;
  border-radius: 5px;
  background: ${({ $selected }) => ($selected ? '#fff' : 'transparent')};
  color: ${({ $selected }) => ($selected ? '#343530' : '#858780')};
  box-shadow: ${({ $selected }) => ($selected ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none')};
  font-size: 8px;
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #6f36ed;
    outline-offset: 1px;
  }
`;

const EnrichmentOptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
`;

const EnrichmentCheck = styled.button<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  align-items: center;
  gap: 7px;
  padding: 8px;
  border: 1px solid ${({ $selected }) => ($selected ? '#a889ef' : '#d9dad4')};
  border-radius: 6px;
  background: ${({ $selected }) => ($selected ? '#f2edff' : '#fff')};
  color: #444640;
  font: inherit;
  font-size: 8px;
  text-align: left;
  cursor: pointer;

  &:hover {
    border-color: #a889ef;
  }

  &:focus-visible {
    outline: 2px solid #6f36ed;
    outline-offset: 2px;
  }
`;

const SamplingSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 16px;
`;

const SamplingMetric = styled.div<{ $accent?: boolean }>`
  padding: 10px;
  border: 1px solid ${({ $accent }) => ($accent ? '#bfe3dc' : '#dddeda')};
  border-radius: 7px;
  background: ${({ $accent }) => ($accent ? '#eaf8f5' : '#fafaf7')};
`;

const MetricValue = styled.div<{ $accent?: boolean }>`
  color: ${({ $accent }) => ($accent ? '#218d80' : '#343530')};
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 15px;
  font-weight: 600;
`;

const MetricLabel = styled.div`
  margin-top: 3px;
  color: #8b8c86;
  font-size: 7px;
  text-transform: uppercase;
`;

const StaticSpanRow = styled(SpanRow).attrs({ as: 'div' })`
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

const NoisySpanRow = styled.div<{ $hidden: boolean; $index: number }>`
  display: grid;
  grid-template-columns: minmax(140px, 0.9fr) minmax(180px, 1.45fr) 42px;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 34px;
  max-height: ${({ $hidden }) => ($hidden ? '0' : '38px')};
  padding: 0 10px;
  overflow: hidden;
  border-top: 1px solid ${({ $hidden }) => ($hidden ? 'transparent' : '#e6e6e1')};
  background: transparent;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transform: translateY(${({ $hidden }) => ($hidden ? '-5px' : '0')});
  transition:
    max-height 420ms cubic-bezier(0.2, 0.8, 0.2, 1) ${({ $index }) => `${$index * 35}ms`},
    opacity 240ms ease ${({ $index, $hidden }) => `${($hidden ? 0 : $index * 45)}ms`},
    transform 320ms ease ${({ $index }) => `${$index * 35}ms`},
    border-color 180ms ease;

  @media (max-width: 1080px) {
    grid-template-columns: minmax(122px, 0.85fr) minmax(170px, 1.4fr) 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const EmptyTrace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  color: #999a94;
  text-align: center;
`;

const EmptyTraceIcon = styled.div`
  position: relative;
  width: 88px;
  height: 42px;
  margin-bottom: 16px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    height: 8px;
    border-radius: 3px;
    background: #dedfda;
  }

  &::before {
    top: 5px;
    width: 88px;
  }

  &::after {
    top: 27px;
    left: 22px;
    width: 58px;
  }
`;

const EmptyTraceTitle = styled.div`
  color: #6f716a;
  font-size: 11px;
  font-weight: 600;
`;

const EmptyTraceText = styled.div`
  max-width: 210px;
  margin-top: 6px;
  font-size: 9px;
  line-height: 1.5;
`;

const EnvironmentList = styled.div`
  display: grid;
  gap: 7px;
`;

const EnvironmentOption = styled.button<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  min-width: 0;
  align-items: center;
  gap: 9px;
  padding: 9px 10px;
  border: 1px solid ${({ $selected }) => ($selected ? '#8f70e5' : '#d9dad4')};
  border-radius: 7px;
  background: ${({ $selected }) => ($selected ? '#f2edff' : '#fff')};
  color: #2d2e29;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background 150ms ease;

  &:hover {
    border-color: #8f70e5;
  }

  &:focus-visible {
    outline: 2px solid #6f36ed;
    outline-offset: 2px;
  }
`;

type CentralEnvironmentKind = 'kubernetes' | 'vm' | 'lambda';

const EnvironmentIcon = styled.span<{ $kind: CentralEnvironmentKind }>`
  display: grid;
  width: 34px;
  height: 34px;
  border-radius: 7px;
  place-items: center;
  background: ${({ $kind }) =>
    $kind === 'kubernetes' ? '#eaf1ff' : $kind === 'lambda' ? '#fff1df' : '#e8f5f3'};
  color: ${({ $kind }) => ($kind === 'kubernetes' ? '#326ce5' : $kind === 'lambda' ? '#d97706' : '#218d80')};

  svg {
    width: 21px;
    height: 21px;
  }
`;

const EnvironmentCopy = styled.span`
  min-width: 0;
`;

const EnvironmentName = styled.span`
  display: block;
  overflow: hidden;
  font-size: 10px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EnvironmentMeta = styled.span`
  display: block;
  margin-top: 3px;
  color: #91928c;
  font-size: 8px;
`;

const EnvironmentState = styled.span<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ $selected }) => ($selected ? '#238363' : '#999a94')};
  font-size: 8px;
  font-weight: 550;

  &::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $selected }) => ($selected ? '#31b98b' : '#c4c5bf')};
    content: '';
  }
`;

const livePulse = keyframes`
  0%, 100% {
    opacity: 0.45;
    transform: scale(0.82);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const CentralCanvas = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid #dddeda;
  border-radius: 8px;
  background:
    linear-gradient(rgba(111, 54, 237, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(111, 54, 237, 0.025) 1px, transparent 1px),
    #fafaf7;
  background-size: 28px 28px;
`;

const CentralNode = styled.div`
  position: relative;
  z-index: 1;
  width: min(280px, calc(100% - 32px));
  margin: 18px auto 26px;
  padding: 13px 14px;
  border: 1px solid #a889ef;
  border-radius: 8px;
  background: #f2edff;
  box-shadow: 0 8px 24px rgba(111, 54, 237, 0.1);
`;

const CentralNodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const CentralLogo = styled.span`
  display: grid;
  flex: 0 0 auto;
  width: 25px;
  height: 25px;
  border-radius: 6px;
  place-items: center;
  background: #fff;
  box-shadow: 0 2px 7px rgba(111, 54, 237, 0.12);

  img {
    width: 16px;
    height: 16px;
  }
`;

const CentralNodeLabel = styled.div`
  color: #6f36ed;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CentralNodeTitle = styled.div`
  margin-top: 4px;
  color: #292a26;
  font-size: 12px;
  font-weight: 650;
`;

const CentralNodeMeta = styled.div`
  margin-top: 3px;
  color: #777872;
  font-size: 8px;
`;

const LiveStream = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  color: #238363;
  font-size: 7px;
  font-weight: 600;

  &::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #31b98b;
    animation: ${livePulse} 1.4s ease-in-out infinite;
    content: '';
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`;

const FleetGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 0 14px 14px;
`;

const FleetCard = styled.div<{ $connected: boolean }>`
  position: relative;
  min-width: 0;
  padding: 10px;
  border: 1px solid ${({ $connected }) => ($connected ? '#bfe3dc' : '#dddeda')};
  border-radius: 7px;
  background: ${({ $connected }) => ($connected ? '#f0faf8' : '#f4f4ef')};
  opacity: ${({ $connected }) => ($connected ? 1 : 0.58)};
`;

const FleetCardHeader = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const FleetCardName = styled.div`
  overflow: hidden;
  color: #343530;
  font-size: 9px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type CentralProvider = 'AWS' | 'GCP' | 'On-prem';

const ProviderBadge = styled.span<{ $provider: CentralProvider }>`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 4px;
  padding: 3px 5px;
  border-radius: 3px;
  background: #e8e8e3;
  color: ${({ $provider }) => ($provider === 'AWS' ? '#d97706' : $provider === 'GCP' ? '#326ce5' : '#666861')};
  font-size: 6px;
  font-weight: 700;

  svg {
    width: 9px;
    height: 9px;
  }

  span {
    color: #70716b;
  }
`;

const FleetCardMeta = styled.div`
  margin-top: 7px;
  color: #898a84;
  font-size: 7px;
  line-height: 1.45;
`;

const AiPromptList = styled.div`
  display: grid;
  gap: 7px;
`;

const AiPromptOption = styled.button<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 10px;
  border: 1px solid ${({ $selected }) => ($selected ? '#a889ef' : '#d9dad4')};
  border-radius: 7px;
  background: ${({ $selected }) => ($selected ? '#f2edff' : '#fff')};
  color: #2d2e29;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    border-color: #a889ef;
  }

  &:focus-visible {
    outline: 2px solid #6f36ed;
    outline-offset: 2px;
  }
`;

const AiPromptIcon = styled.span<{ $selected: boolean }>`
  display: grid;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  place-items: center;
  background: ${({ $selected }) => ($selected ? '#6f36ed' : '#eeeee9')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#777872')};
  font-size: 13px;
`;

const AiPromptTitle = styled.span`
  display: block;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.35;
`;

const AiPromptScope = styled.span`
  display: block;
  margin-top: 3px;
  color: #92938d;
  font-size: 7px;
`;

const investigationIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AiQuestion = styled.div`
  max-width: 78%;
  margin: 0 0 12px auto;
  padding: 10px 12px;
  border-radius: 9px 9px 2px 9px;
  background: #292a26;
  color: #fff;
  font-size: 10px;
  line-height: 1.45;
`;

const aiCaretBlink = keyframes`
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: 0; }
`;

const aiThinkingPulse = keyframes`
  0%, 100% {
    transform: scale(0.88);
    opacity: 0.45;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
`;

const AiTypingCaret = styled.span`
  display: inline-block;
  width: 1px;
  height: 1em;
  margin-left: 2px;
  background: currentColor;
  vertical-align: -0.12em;
  animation: ${aiCaretBlink} 700ms steps(1) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AiThinkingCard = styled.div`
  display: flex;
  min-height: 92px;
  align-items: center;
  gap: 15px;
  padding: 14px;
  border: 1px solid #dddeda;
  border-radius: 2px 9px 9px 9px;
  background: #fafaf7;
`;

const AiThinkingOrb = styled.span`
  position: relative;
  display: grid;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  place-items: center;
  background: #eee7ff;
  color: #6f36ed;
  font-size: 17px;

  &::before,
  &::after {
    position: absolute;
    border: 1px solid #a889ef;
    border-radius: inherit;
    content: '';
    inset: -4px;
    animation: ${aiThinkingPulse} 1.4s ease-in-out infinite;
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

const AiThinkingCopy = styled.div`
  min-width: 0;

  strong {
    display: block;
    color: #343530;
    font-size: 10px;
  }

  span {
    display: block;
    margin-top: 6px;
    color: #898a84;
    font-size: 8px;
  }
`;

const AiThinkingDots = styled.span`
  &::after {
    display: inline-block;
    width: 12px;
    overflow: hidden;
    content: '...';
    vertical-align: bottom;
    animation: ${aiCaretBlink} 900ms steps(3) infinite;
  }
`;

const AiResponse = styled.div`
  margin-bottom: 14px;
  padding: 12px;
  border: 1px solid #dddeda;
  border-radius: 2px 9px 9px 9px;
  background: #fafaf7;
  color: #555750;
  font-size: 9px;
  line-height: 1.55;
  animation: ${investigationIn} 260ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AiResponseLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 7px;
  color: #6f36ed;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  img {
    width: 13px;
    height: 13px;
  }
`;

const AiActivity = styled.div`
  margin-bottom: 14px;
  overflow: hidden;
  border: 1px solid #dddeda;
  border-radius: 7px;
  background: #fafaf7;
`;

const AiActivityHeader = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid #e3e3de;
  color: #8b8c86;
  font-size: 7px;
  font-weight: 650;
  letter-spacing: 0.07em;
  text-transform: uppercase;
`;

const AiActivityRow = styled.div<{ $index: number }>`
  display: grid;
  grid-template-columns: 15px 1fr auto;
  align-items: center;
  gap: 7px;
  min-height: 31px;
  padding: 0 10px;
  color: #666861;
  font-size: 8px;
  animation: ${investigationIn} 240ms ease-out ${({ $index }) => 100 + $index * 120}ms both;

  & + & {
    border-top: 1px solid #ecece7;
  }

  &::before {
    display: grid;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    place-items: center;
    background: #e2f4f1;
    color: #218d80;
    content: '✓';
    font-size: 7px;
    font-weight: 800;
  }

  span:last-child {
    color: #9a9b95;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
    font-size: 7px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const EvidenceCard = styled.div`
  padding: 13px;
  border: 1px solid #bfe3dc;
  border-radius: 8px;
  background: #f0faf8;
  animation: ${investigationIn} 280ms ease-out 420ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const EvidenceLabel = styled.div`
  color: #218d80;
  font-size: 7px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const EvidenceTitle = styled.div`
  margin-top: 5px;
  color: #292a26;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 11px;
  font-weight: 650;
`;

const EvidenceFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-top: 11px;
`;

const EvidenceFact = styled.div`
  min-width: 0;
  padding: 7px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.72);
  color: #666861;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 7px;
  line-height: 1.4;
`;

const EnvironmentGlyph = ({ kind }: { kind: CentralEnvironmentKind }) => {
  if (kind === 'kubernetes') {
    return (
      <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
        <circle cx='12' cy='12' r='7.2' stroke='currentColor' strokeWidth='1.7' />
        <circle cx='12' cy='12' r='2.4' stroke='currentColor' strokeWidth='1.7' />
        <path
          d='M12 2.8v4M12 17.2v4M2.8 12h4M17.2 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M18.5 5.5l-2.8 2.8M8.3 15.7l-2.8 2.8'
          stroke='currentColor'
          strokeWidth='1.7'
          strokeLinecap='round'
        />
      </svg>
    );
  }

  if (kind === 'lambda') {
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
      <path d='M8 20h8M12 17v3' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' />
      <path d='M7 8h4M7 11h7' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
};

const ProviderGlyph = ({ provider }: { provider: CentralProvider }) => {
  if (provider === 'On-prem') {
    return (
      <svg viewBox='0 0 16 16' fill='none' aria-hidden='true'>
        <rect x='3' y='2' width='10' height='5' rx='1' stroke='currentColor' strokeWidth='1.4' />
        <rect x='3' y='9' width='10' height='5' rx='1' stroke='currentColor' strokeWidth='1.4' />
        <circle cx='5.5' cy='4.5' r='.8' fill='currentColor' />
        <circle cx='5.5' cy='11.5' r='.8' fill='currentColor' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 16 16' fill='none' aria-hidden='true'>
      <path
        d='M4.1 12.5h7.6a2.8 2.8 0 00.25-5.59A4.15 4.15 0 004.2 5.7a3.42 3.42 0 00-.1 6.8Z'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinejoin='round'
      />
      {provider === 'AWS' && <path d='M5.2 10.2c1.8 1 3.8 1 5.6 0' stroke='currentColor' strokeWidth='1.1' strokeLinecap='round' />}
    </svg>
  );
};

const sources = [
  {
    id: 'frontend',
    name: 'frontend',
    type: 'Deployment',
    shortName: 'fe',
    operation: 'POST /api/checkout',
    namespace: 'ecommerce-prod',
    workload: 'frontend',
    pod: 'frontend-7d89c76b9f-x4k2m',
    language: 'javascript',
    scope: '@opentelemetry/instrumentation-http',
    http: { method: 'POST', path: '/api/checkout', statusCode: '200' },
  },
  {
    id: 'checkout',
    name: 'checkout-service',
    type: 'Deployment',
    shortName: 'co',
    operation: 'CheckoutService.createOrder',
    namespace: 'ecommerce-prod',
    workload: 'checkout-service',
    pod: 'checkout-service-6c8b755fc7-q9n6v',
    language: 'go',
    scope: 'go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc',
    rpc: { system: 'grpc', service: 'checkout.v1.CheckoutService', method: 'CreateOrder' },
  },
  {
    id: 'payment',
    name: 'payment-service',
    type: 'Deployment',
    shortName: 'pa',
    operation: 'POST /v1/payment_intents',
    namespace: 'payments',
    workload: 'payment-service',
    pod: 'payment-service-5f99447b8b-2c7mz',
    language: 'python',
    scope: 'opentelemetry.instrumentation.requests',
    http: { method: 'POST', path: '/v1/payment_intents', statusCode: '201' },
  },
  {
    id: 'inventory',
    name: 'inventory-service',
    type: 'StatefulSet',
    shortName: 'in',
    operation: 'SELECT inventory_items',
    namespace: 'ecommerce-prod',
    workload: 'inventory-service',
    pod: 'inventory-service-0',
    language: 'java',
    scope: 'io.opentelemetry.jdbc',
    database: { system: 'postgresql', namespace: 'inventory', operation: 'SELECT' },
  },
];

const destinations = [
  { id: 'jaeger', name: 'Jaeger', type: 'OTLP', icon: JaegerLogo },
  { id: 'datadog', name: 'Datadog', type: 'Traces', icon: DatadogLogo },
  { id: 'tempo', name: 'Grafana Tempo', type: 'OTLP', icon: TempoLogo },
];

const pipelineHealthProbeSpans = [
  { service: 'frontend', operation: 'GET /healthz', duration: 9, offset: 3, width: 8 },
];

type NoisyTraceRow = {
  sourceId: string;
  service: string;
  operation: string;
  duration: number;
  offset: number;
  width: number;
  rate: number;
};

const samplingPresets = [
  {
    id: 'health-probes',
    name: 'Kubernetes health probes',
    operation: 'HTTP GET /healthz, /readyz',
    beforeRate: 1240,
    noisyRows: [
      { sourceId: 'frontend', service: 'frontend', operation: 'GET /healthz', duration: 9, offset: 3, width: 8, rate: 611 },
      { sourceId: 'checkout', service: 'checkout-service', operation: 'GET /readyz', duration: 19, offset: 41, width: 16, rate: 611 },
    ] satisfies NoisyTraceRow[],
  },
  {
    id: 'successful-http',
    name: 'High-volume successful HTTP',
    operation: 'HTTP 2xx · GET /api/products',
    beforeRate: 2860,
    noisyRows: [
      { sourceId: 'frontend', service: 'frontend', operation: 'GET /api/products 200', duration: 24, offset: 4, width: 16, rate: 780 },
      { sourceId: 'checkout', service: 'checkout-service', operation: 'GET /api/products/sku-142 200', duration: 31, offset: 23, width: 20, rate: 650 },
      { sourceId: 'payment', service: 'payment-service', operation: 'GET /v1/payment_methods 200', duration: 28, offset: 47, width: 18, rate: 540 },
      { sourceId: 'inventory', service: 'inventory-service', operation: 'GET /api/stock/sku-142 200', duration: 36, offset: 69, width: 23, rate: 872 },
    ] satisfies NoisyTraceRow[],
  },
  {
    id: 'database-polling',
    name: 'Database polling',
    operation: 'SELECT queue_jobs · every 500ms',
    beforeRate: 780,
    noisyRows: [
      { sourceId: 'checkout', service: 'checkout-service', operation: 'SELECT pending_orders', duration: 18, offset: 7, width: 13, rate: 230 },
      { sourceId: 'payment', service: 'payment-service', operation: 'SELECT payment_jobs', duration: 22, offset: 26, width: 17, rate: 190 },
      { sourceId: 'inventory', service: 'inventory-service', operation: 'SELECT inventory_reservations', duration: 27, offset: 49, width: 21, rate: 180 },
      { sourceId: 'inventory', service: 'inventory-service', operation: 'SELECT stock_reconciliation_jobs', duration: 32, offset: 73, width: 22, rate: 162 },
    ] satisfies NoisyTraceRow[],
  },
];

const enrichmentRuleTypes = [
  {
    id: 'code',
    name: 'Code Attributes',
    description: 'Capture the exact code location for this span.',
  },
  {
    id: 'payload',
    name: 'Payload Collection',
    description: 'Capture selected request and dependency payloads.',
  },
] as const;

const enrichmentOptions = {
  code: [
    { id: 'code.filepath', label: 'Collect file path', value: '/app/src/routes/checkout.ts' },
    { id: 'code.function', label: 'Collect function', value: 'submitCheckout' },
    { id: 'code.lineno', label: 'Collect line number', value: '148' },
  ],
  payload: [
    { id: 'http.request.payload', label: 'Collect HTTP request', value: '{"cartId":"cart_7f2","items":3}' },
    { id: 'http.response.payload', label: 'Collect HTTP response', value: '{"orderId":"ord_2941","status":"ok"}' },
    { id: 'db.query.text', label: 'Collect DB query', value: 'SELECT stock FROM inventory WHERE sku = $1' },
  ],
} as const;

const centralEnvironments = [
  {
    id: 'eks-production',
    name: 'production-k8s',
    provider: 'GCP',
    kind: 'kubernetes',
    type: 'GKE · us-central1',
    clusters: 1,
    vms: 0,
    functions: 0,
    instrumentedUnits: 42,
    unitLabel: 'services',
  },
  {
    id: 'payments-vms',
    name: 'payments-vms',
    provider: 'On-prem',
    kind: 'vm',
    type: 'Linux VMs · datacenter-01',
    clusters: 0,
    vms: 12,
    functions: 0,
    instrumentedUnits: 9,
    unitLabel: 'processes',
  },
  {
    id: 'checkout-lambda',
    name: 'checkout-functions',
    provider: 'AWS',
    kind: 'lambda',
    type: 'Lambda · us-east-1',
    clusters: 0,
    vms: 0,
    functions: 8,
    instrumentedUnits: 8,
    unitLabel: 'functions',
  },
] as const;

const aiInvestigations = [
  {
    id: 'checkout-latency',
    question: 'Why is checkout slow?',
    scope: 'frontend → checkout → inventory',
    response:
      'Slow requests are waiting on a PostgreSQL row lock in inventory-service. I collected code attributes on the affected spans and traced the wait to reserveStock().',
    rootCause: 'inventory-service · reserveStock() · inventory.go:148',
    activities: [
      ['Mapped the request across 4 services', '0.4s'],
      ['Compared healthy and slow traces', '0.8s'],
      ['Collected code attributes on inventory-service', '1.2s'],
    ],
    evidence: ['db.lock_wait 287ms', 'inventory_items row lock', 'p95 +312ms'],
  },
  {
    id: 'payment-errors',
    question: 'Why are payments failing?',
    scope: 'checkout → payment-service → provider',
    response:
      'The errors begin in payment-service after its upstream timeout was reduced. Requests now expire before the payment provider responds.',
    rootCause: 'payment-service · createCharge() · timeout 800ms',
    activities: [
      ['Correlated the error spike with deployment v2.4.1', '0.3s'],
      ['Inspected failed payment traces', '0.7s'],
      ['Compared client and upstream durations', '1.0s'],
    ],
    evidence: ['error.type DEADLINE', 'upstream p95 1.12s', 'timeout changed −700ms'],
  },
  {
    id: 'deploy-change',
    question: 'What changed after the deploy?',
    scope: 'checkout-service · v2.4.0 → v2.4.1',
    response:
      'Version 2.4.1 introduced an N+1 inventory query in buildOrder(). Each cart item now creates a separate database span.',
    rootCause: 'checkout-service · buildOrder() · checkout.go:214',
    activities: [
      ['Compared traces before and after deployment', '0.4s'],
      ['Detected a new repeated database operation', '0.9s'],
      ['Collected function and line attributes', '1.3s'],
    ],
    evidence: ['queries 4 → 37', 'SELECT inventory_items', 'latency +241ms'],
  },
] as const;

const AI_THINKING_STEPS = [
  'Mapping the request across services',
  'Comparing healthy and failing traces',
  'Collecting the missing runtime evidence',
];

type Capability = 'pipeline' | 'sampling' | 'enrichment' | 'central' | 'ai';
type AiPhase = 'typing' | 'thinking' | 'findings';
type AiInvestigationId = (typeof aiInvestigations)[number]['id'];
type SamplingScope = 'cluster' | 'frontend';
type EnrichmentRuleType = keyof typeof enrichmentOptions;
type EnrichmentScope = SamplingScope;
type EnrichmentOptionId = (typeof enrichmentOptions)[EnrichmentRuleType][number]['id'];

export const NewProductDemo = () => {
  const [activeCapability, setActiveCapability] = useState<Capability>('pipeline');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [openSpanId, setOpenSpanId] = useState<string | null>(null);
  const [samplingPresetId, setSamplingPresetId] = useState('');
  const [samplingScope, setSamplingScope] = useState<SamplingScope>('cluster');
  const [enrichmentRuleType, setEnrichmentRuleType] = useState<EnrichmentRuleType>('code');
  const [enrichmentScope, setEnrichmentScope] = useState<EnrichmentScope>('cluster');
  const [enrichmentSelections, setEnrichmentSelections] = useState<Record<EnrichmentRuleType, EnrichmentOptionId[]>>({
    code: ['code.filepath', 'code.function'],
    payload: ['http.request.payload', 'http.response.payload'],
  });
  const [connectedEnvironmentIds, setConnectedEnvironmentIds] = useState<string[]>(['eks-production']);
  const [aiInvestigationId, setAiInvestigationId] = useState<AiInvestigationId>('checkout-latency');
  const [aiPhase, setAiPhase] = useState<AiPhase>('typing');
  const [typedAiQuestion, setTypedAiQuestion] = useState('');
  const [aiThinkingStep, setAiThinkingStep] = useState(0);
  const hasTrace = selectedSources.length > 0 && !!selectedDestination;
  const activeAiInvestigation =
    aiInvestigations.find(({ id }) => id === aiInvestigationId) ?? aiInvestigations[0];

  useEffect(() => {
    if (!hasTrace) {
      setOpenSpanId(null);
      return;
    }

    setOpenSpanId((current) => {
      if (current && selectedSources.includes(current)) return current;
      return sources.find(({ id }) => selectedSources.includes(id))?.id ?? null;
    });
  }, [hasTrace, selectedSources]);

  useEffect(() => {
    if (activeCapability !== 'ai') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedAiQuestion(activeAiInvestigation.question);
      setAiPhase('findings');
      return;
    }

    setTypedAiQuestion('');
    setAiPhase('typing');
    setAiThinkingStep(0);

    let character = 0;
    const typingTimer = window.setInterval(() => {
      character += 1;
      setTypedAiQuestion(activeAiInvestigation.question.slice(0, character));
      if (character >= activeAiInvestigation.question.length) window.clearInterval(typingTimer);
    }, 28);
    const typingDuration = activeAiInvestigation.question.length * 28;
    const thinkingTimer = window.setTimeout(() => setAiPhase('thinking'), typingDuration + 260);
    const findingsTimer = window.setTimeout(() => setAiPhase('findings'), typingDuration + 2400);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(thinkingTimer);
      window.clearTimeout(findingsTimer);
    };
  }, [activeAiInvestigation.question, activeCapability]);

  useEffect(() => {
    if (aiPhase !== 'thinking') return;
    const timer = window.setInterval(
      () => setAiThinkingStep((current) => (current + 1) % AI_THINKING_STEPS.length),
      650,
    );
    return () => window.clearInterval(timer);
  }, [aiPhase]);

  const toggleSource = (sourceId: string) => {
    setSelectedSources((current) => (current.includes(sourceId) ? current.filter((id) => id !== sourceId) : [...current, sourceId]));
  };

  const activeDestination = destinations.find(({ id }) => id === selectedDestination);
  const activeSamplingPreset = samplingPresets.find(({ id }) => id === samplingPresetId) ?? samplingPresets[0];
  const selectedEnrichmentOptions = enrichmentSelections[enrichmentRuleType];
  const toggleEnrichmentOption = (optionId: EnrichmentOptionId) => {
    setEnrichmentSelections((current) => {
      const selected = current[enrichmentRuleType];
      return {
        ...current,
        [enrichmentRuleType]: selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId],
      };
    });
  };
  const toggleEnvironment = (environmentId: string) => {
    setConnectedEnvironmentIds((current) =>
      current.includes(environmentId)
        ? current.filter((id) => id !== environmentId)
        : [...current, environmentId],
    );
  };
  const connectedEnvironments = centralEnvironments.filter(({ id }) => connectedEnvironmentIds.includes(id));
  const connectedClusters = connectedEnvironments.reduce((total, environment) => total + environment.clusters, 0);
  const connectedVms = connectedEnvironments.reduce((total, environment) => total + environment.vms, 0);
  const connectedFunctions = connectedEnvironments.reduce((total, environment) => total + environment.functions, 0);
  const connectedWorkloads = connectedEnvironments.reduce(
    (total, environment) => total + environment.instrumentedUnits,
    0,
  );
  const noisyTraceRows = activeSamplingPreset.noisyRows;
  const affectedNoisyRows = noisyTraceRows.filter(
    ({ sourceId }) => samplingScope === 'cluster' || sourceId === 'frontend',
  );
  const affectedRate = affectedNoisyRows.reduce((total, row) => total + row.rate, 0);
  const removedRate = samplingPresetId ? affectedRate : 0;
  const retainedRate = activeSamplingPreset.beforeRate - removedRate;
  const reduction = Math.round((removedRate / activeSamplingPreset.beforeRate) * 100);
  const shouldHideNoisyRow = (row: NoisyTraceRow) => {
    if (!samplingPresetId) return false;
    if (samplingScope === 'frontend' && row.sourceId !== 'frontend') return false;
    return true;
  };
  const visibleNoisyRowCount = noisyTraceRows.filter((row) => !shouldHideNoisyRow(row)).length;
  const samplingSourceIds = selectedSources.length > 0 ? selectedSources : ['frontend', 'checkout', 'inventory'];
  const samplingBusinessSpans = sources
    .filter(({ id }) => samplingSourceIds.includes(id))
    .map((source, index) => {
      const offset = 24 + index * 57;
      const duration = Math.max(72, 352 - index * 78);

      return {
        ...source,
        depth: index + 1,
        duration,
        offset: (offset / 468) * 100,
        width: (duration / 468) * 100,
      };
    });
  const traceKey = `${selectedSources.join('-')}-${selectedDestination}`;
  const totalDuration = 468;
  const selectedSpans = sources
    .filter(({ id }) => selectedSources.includes(id))
    .map((source, index) => {
      const offset = 24 + index * 57;
      const duration = Math.max(72, 352 - index * 78);

      return {
        ...source,
        depth: index + 1,
        duration,
        offset: (offset / totalDuration) * 100,
        width: (duration / totalDuration) * 100,
      };
    });
  const openSpan = selectedSpans.find(({ id }) => id === openSpanId);
  const resourceAttributes = openSpan
    ? [
        ['service.name', openSpan.name],
        ['k8s.namespace.name', openSpan.namespace],
        [`k8s.${openSpan.type === 'StatefulSet' ? 'statefulset' : 'deployment'}.name`, openSpan.workload],
        ['k8s.pod.name', openSpan.pod],
        ['telemetry.sdk.name', 'opentelemetry'],
        ['telemetry.sdk.language', openSpan.language],
      ]
    : [];
  const spanAttributes = openSpan
    ? [
        ['span.kind', openSpan.database ? 'CLIENT' : 'SERVER'],
        ['otel.scope.name', openSpan.scope],
        ...(openSpan.http
          ? [
              ['http.request.method', openSpan.http.method],
              ['url.path', openSpan.http.path],
              ['http.response.status_code', openSpan.http.statusCode],
            ]
          : []),
        ...(openSpan.rpc
          ? [
              ['rpc.system', openSpan.rpc.system],
              ['rpc.service', openSpan.rpc.service],
              ['rpc.method', openSpan.rpc.method],
            ]
          : []),
        ...(openSpan.database
          ? [
              ['db.system.name', openSpan.database.system],
              ['db.namespace', openSpan.database.namespace],
              ['db.operation.name', openSpan.database.operation],
            ]
          : []),
      ]
    : [];
  const enrichmentSpans = sources
    .filter(({ id }) => id === 'frontend' || id === 'checkout')
    .map((source, index) => {
      const offset = 24 + index * 57;
      const duration = Math.max(72, 352 - index * 78);

      return {
        ...source,
        depth: index + 1,
        duration,
        offset: (offset / totalDuration) * 100,
        width: (duration / totalDuration) * 100,
      };
    });
  const enrichmentFrontend = sources[0];
  const enrichmentBaseAttributes = [
    ['span.kind', 'SERVER'],
    ['http.request.method', enrichmentFrontend.http?.method ?? 'POST'],
    ['url.path', enrichmentFrontend.http?.path ?? '/api/checkout'],
  ];
  const visibleEnrichmentOptions = enrichmentOptions[enrichmentRuleType].filter(({ id }) =>
    selectedEnrichmentOptions.includes(id as EnrichmentOptionId),
  );

  return (
    <Frame>
      <WindowBar>
        <WindowControls aria-hidden='true'>
          <WindowDot />
          <WindowDot />
          <WindowDot />
        </WindowControls>
        {activeCapability === 'central'
          ? 'Odigos Central'
          : activeCapability === 'ai'
            ? 'Production assistant'
            : 'Kubernetes cluster'}
        <ClusterStatus>
          {activeCapability === 'central'
            ? `${connectedEnvironments.length} connected`
            : activeCapability === 'ai'
              ? aiPhase === 'typing'
                ? 'Receiving question'
                : aiPhase === 'thinking'
                  ? 'Investigating'
                  : 'Evidence ready'
              : 'Connected'}
        </ClusterStatus>
      </WindowBar>

      <DemoBody>
        <StepsPanel>
          <Eyebrow>Odigos capabilities</Eyebrow>
          <Steps>
            <Step
              type='button'
              $active={activeCapability === 'pipeline'}
              aria-pressed={activeCapability === 'pipeline'}
              onClick={() => setActiveCapability('pipeline')}
            >
              <StepNumber $active={activeCapability === 'pipeline'}>1</StepNumber>
              <div>
                <StepTitle>Create pipeline</StepTitle>
                <StepState>{activeCapability === 'pipeline' ? 'Active' : 'Configured'}</StepState>
              </div>
            </Step>
            <Step
              type='button'
              $active={activeCapability === 'sampling'}
              aria-pressed={activeCapability === 'sampling'}
              onClick={() => setActiveCapability('sampling')}
            >
              <StepNumber $active={activeCapability === 'sampling'}>2</StepNumber>
              <div>
                <StepTitle>Control sampling</StepTitle>
                <StepState>{activeCapability === 'sampling' ? 'Active' : 'Explore'}</StepState>
              </div>
            </Step>
            <Step
              type='button'
              $active={activeCapability === 'enrichment'}
              aria-pressed={activeCapability === 'enrichment'}
              onClick={() => setActiveCapability('enrichment')}
            >
              <StepNumber $active={activeCapability === 'enrichment'}>3</StepNumber>
              <div>
                <StepTitle>Enrich telemetry</StepTitle>
                <StepState>{activeCapability === 'enrichment' ? 'Active' : 'Explore'}</StepState>
              </div>
            </Step>
            <Step
              type='button'
              $active={activeCapability === 'central'}
              aria-pressed={activeCapability === 'central'}
              onClick={() => setActiveCapability('central')}
            >
              <StepNumber $active={activeCapability === 'central'}>4</StepNumber>
              <div>
                <StepTitle>Connect your fleet</StepTitle>
                <StepState>{activeCapability === 'central' ? 'Active' : 'Explore'}</StepState>
              </div>
            </Step>
            <Step
              type='button'
              $active={activeCapability === 'ai'}
              aria-pressed={activeCapability === 'ai'}
              onClick={() => setActiveCapability('ai')}
            >
              <StepNumber $active={activeCapability === 'ai'}>5</StepNumber>
              <div>
                <StepTitle>Ask production</StepTitle>
                <StepState>{activeCapability === 'ai' ? 'Active' : 'Explore'}</StepState>
              </div>
            </Step>
          </Steps>
        </StepsPanel>

        <WorkPanel>
          {activeCapability === 'pipeline' ? (
            <>
              <PanelLabel>Create pipeline</PanelLabel>
              <PanelTitle>Create an instrumentation pipeline</PanelTitle>
              <PanelDescription>Select the Kubernetes workloads to instrument, then choose where Odigos should send their traces.</PanelDescription>

              <SelectionGroup>
                <SelectionLabel>
                  Sources
                  <SelectionHint>Select one or more</SelectionHint>
                </SelectionLabel>
                <OptionGrid>
                  {sources.map((source) => {
                    const selected = selectedSources.includes(source.id);
                    return (
                      <SourceOption
                        key={source.id}
                        type='button'
                        $selected={selected}
                        aria-pressed={selected}
                        onClick={() => toggleSource(source.id)}
                      >
                        <ServiceIcon $selected={selected}>
                          <SourceIcon size={17} />
                        </ServiceIcon>
                        <OptionText>
                          <OptionName>{source.name}</OptionName>
                          <OptionMeta>{source.type}</OptionMeta>
                        </OptionText>
                        <Checkbox $selected={selected} aria-hidden='true' />
                      </SourceOption>
                    );
                  })}
                </OptionGrid>
              </SelectionGroup>

              <SelectionGroup>
                <SelectionLabel>
                  Destination
                  <SelectionHint>Select one</SelectionHint>
                </SelectionLabel>
                <DestinationRow>
                  {destinations.map((destination) => {
                    const selected = selectedDestination === destination.id;
                    const Logo = destination.icon;
                    return (
                      <DestinationOption
                        key={destination.id}
                        type='button'
                        $selected={selected}
                        aria-pressed={selected}
                        onClick={() => setSelectedDestination(destination.id)}
                      >
                        <DestinationHeader>
                          <DestinationIcon aria-hidden='true'>
                            <Logo size={18} />
                          </DestinationIcon>
                          <DestinationName>{destination.name}</DestinationName>
                        </DestinationHeader>
                      </DestinationOption>
                    );
                  })}
                </DestinationRow>
              </SelectionGroup>
            </>
          ) : activeCapability === 'sampling' ? (
            <>
              <PanelLabel>Sampling Rule</PanelLabel>
              <PanelTitle>Reduce noisy operations</PanelTitle>
              <PanelDescription>
                Match repetitive operations at the source and keep high-value traces flowing without paying to store the noise.
              </PanelDescription>

              <SelectionGroup>
                <SelectionLabel>
                  Noisy Operations
                  <SelectionHint>Select a preset</SelectionHint>
                </SelectionLabel>
                <RuleOptions>
                  {samplingPresets.map((preset) => {
                    const selected = samplingPresetId === preset.id;
                    return (
                      <RuleOption
                        key={preset.id}
                        type='button'
                        $selected={selected}
                        aria-pressed={selected}
                        onClick={() => setSamplingPresetId(preset.id)}
                      >
                        <Radio $selected={selected} aria-hidden='true' />
                        <span>
                          <RuleName>{preset.name}</RuleName>
                          <RuleOperation>{preset.operation}</RuleOperation>
                        </span>
                      </RuleOption>
                    );
                  })}
                </RuleOptions>
              </SelectionGroup>

              <SelectionGroup>
                <SelectionLabel>Source scope</SelectionLabel>
                <SegmentedControl>
                  <Segment
                    type='button'
                    $selected={samplingScope === 'cluster'}
                    aria-pressed={samplingScope === 'cluster'}
                    onClick={() => setSamplingScope('cluster')}
                  >
                    Entire cluster
                  </Segment>
                  <Segment
                    type='button'
                    $selected={samplingScope === 'frontend'}
                    aria-pressed={samplingScope === 'frontend'}
                    onClick={() => setSamplingScope('frontend')}
                  >
                    Only frontend
                  </Segment>
                </SegmentedControl>
              </SelectionGroup>

            </>
          ) : activeCapability === 'enrichment' ? (
            <>
              <PanelLabel>Instrumentation Rule</PanelLabel>
              <PanelTitle>Add Instrumentation Rule</PanelTitle>
              <PanelDescription>
                Enrich telemetry on demand, without redeploying your application.
              </PanelDescription>

              <SelectionGroup>
                <SelectionLabel>
                  Rule type
                  <SelectionHint>Select one</SelectionHint>
                </SelectionLabel>
                <RuleOptions>
                  {enrichmentRuleTypes.map((ruleType) => {
                    const selected = enrichmentRuleType === ruleType.id;
                    return (
                      <RuleOption
                        key={ruleType.id}
                        type='button'
                        $selected={selected}
                        aria-pressed={selected}
                        onClick={() => setEnrichmentRuleType(ruleType.id)}
                      >
                        <Radio $selected={selected} aria-hidden='true' />
                        <span>
                          <RuleName>{ruleType.name}</RuleName>
                          <RuleOperation>{ruleType.description}</RuleOperation>
                        </span>
                      </RuleOption>
                    );
                  })}
                </RuleOptions>
              </SelectionGroup>

              <SelectionGroup>
                <SelectionLabel>
                  Attributes to collect
                  <SelectionHint>Select one or more</SelectionHint>
                </SelectionLabel>
                <EnrichmentOptionGrid>
                  {enrichmentOptions[enrichmentRuleType].map((option) => {
                    const selected = selectedEnrichmentOptions.includes(option.id);
                    return (
                      <EnrichmentCheck
                        key={option.id}
                        type='button'
                        $selected={selected}
                        aria-pressed={selected}
                        onClick={() => toggleEnrichmentOption(option.id)}
                      >
                        <Checkbox $selected={selected} aria-hidden='true' />
                        <span>{option.label}</span>
                      </EnrichmentCheck>
                    );
                  })}
                </EnrichmentOptionGrid>
              </SelectionGroup>

              <SelectionGroup>
                <SelectionLabel>Source scope</SelectionLabel>
                <SegmentedControl>
                  <Segment
                    type='button'
                    $selected={enrichmentScope === 'cluster'}
                    aria-pressed={enrichmentScope === 'cluster'}
                    onClick={() => setEnrichmentScope('cluster')}
                  >
                    Entire cluster
                  </Segment>
                  <Segment
                    type='button'
                    $selected={enrichmentScope === 'frontend'}
                    aria-pressed={enrichmentScope === 'frontend'}
                    onClick={() => setEnrichmentScope('frontend')}
                  >
                    Only frontend
                  </Segment>
                </SegmentedControl>
              </SelectionGroup>

            </>
          ) : activeCapability === 'central' ? (
            <>
              <PanelLabel>Odigos Central</PanelLabel>
              <PanelTitle>Connect your entire fleet</PanelTitle>
              <PanelDescription>
                Bring Kubernetes clusters, cloud environments, and Linux VMs into one control plane.
              </PanelDescription>

              <SelectionGroup>
                <SelectionLabel>
                  Environments
                  <SelectionHint>
                    {connectedEnvironments.length} of {centralEnvironments.length} connected
                  </SelectionHint>
                </SelectionLabel>
                <EnvironmentList>
                  {centralEnvironments.map((environment) => {
                    const selected = connectedEnvironmentIds.includes(environment.id);
                    return (
                      <EnvironmentOption
                        key={environment.id}
                        type='button'
                        $selected={selected}
                        aria-pressed={selected}
                        onClick={() => toggleEnvironment(environment.id)}
                      >
                        <EnvironmentIcon $kind={environment.kind}>
                          <EnvironmentGlyph kind={environment.kind} />
                        </EnvironmentIcon>
                        <EnvironmentCopy>
                          <EnvironmentName>{environment.name}</EnvironmentName>
                          <EnvironmentMeta>{environment.type}</EnvironmentMeta>
                        </EnvironmentCopy>
                        <EnvironmentState $selected={selected}>
                          {selected ? 'Connected' : 'Connect'}
                        </EnvironmentState>
                      </EnvironmentOption>
                    );
                  })}
                </EnvironmentList>
              </SelectionGroup>
            </>
          ) : (
            <>
              <PanelLabel>Production assistant</PanelLabel>
              <PanelTitle>Ask production</PanelTitle>
              <PanelDescription>
                Let AI investigate the live system with evidence collected by Odigos—not guesses from stale dashboards.
              </PanelDescription>

              <SelectionGroup>
                <SelectionLabel>
                  Investigation
                  <SelectionHint>Select a question</SelectionHint>
                </SelectionLabel>
                <AiPromptList>
                  {aiInvestigations.map((investigation) => {
                    const selected = aiInvestigationId === investigation.id;
                    return (
                      <AiPromptOption
                        key={investigation.id}
                        type='button'
                        $selected={selected}
                        aria-pressed={selected}
                        onClick={() => setAiInvestigationId(investigation.id)}
                      >
                        <AiPromptIcon $selected={selected}>✦</AiPromptIcon>
                        <span>
                          <AiPromptTitle>{investigation.question}</AiPromptTitle>
                          <AiPromptScope>{investigation.scope}</AiPromptScope>
                        </span>
                      </AiPromptOption>
                    );
                  })}
                </AiPromptList>
              </SelectionGroup>
            </>
          )}
        </WorkPanel>

        <ResultsPanel>
          {activeCapability === 'pipeline' ? (
            <>
              <ResultsTabs>
                <ResultTab>live-trace</ResultTab>
              </ResultsTabs>
              <ResultContent>
                <ResultHeading>
                  Distributed trace
                  <Status $active={hasTrace}>{hasTrace ? 'Streaming' : 'Waiting'}</Status>
                </ResultHeading>

                {hasTrace ? (
                  <div key={traceKey}>
                <TraceOverview>
                  <TraceTitleRow>
                    <div>
                      <TraceOperation>POST /checkout</TraceOperation>
                      <TraceTimestamp>Jul 16, 2026 · 11:04:32.184 UTC</TraceTimestamp>
                    </div>
                    <TraceTotal>
                      {totalDuration}ms
                      <TraceTotalLabel>Total duration</TraceTotalLabel>
                    </TraceTotal>
                  </TraceTitleRow>
                  <TraceFacts>
                    <TraceFact>
                      <TraceFactLabel>Trace ID</TraceFactLabel>
                      <TraceFactValue>4fd8a7c31e6b45a891c2</TraceFactValue>
                    </TraceFact>
                    <TraceFact>
                      <TraceFactLabel>Services</TraceFactLabel>
                      <TraceFactValue>{selectedSpans.length + 1}</TraceFactValue>
                    </TraceFact>
                    <TraceFact>
                      <TraceFactLabel>Spans</TraceFactLabel>
                      <TraceFactValue>{selectedSpans.length + pipelineHealthProbeSpans.length + 1}</TraceFactValue>
                    </TraceFact>
                    <TraceFact>
                      <TraceFactLabel>Export destination</TraceFactLabel>
                      <TraceDestination>{activeDestination?.name}</TraceDestination>
                    </TraceFact>
                  </TraceFacts>
                </TraceOverview>
                <WaterfallHeader>
                  <span>Service / operation</span>
                  <TimelineRuler>
                    <span>0ms</span>
                    <span>{Math.round(totalDuration * 0.25)}ms</span>
                    <span>{Math.round(totalDuration * 0.5)}ms</span>
                    <span>{Math.round(totalDuration * 0.75)}ms</span>
                    <span>{totalDuration}ms</span>
                  </TimelineRuler>
                  <span>Duration</span>
                </WaterfallHeader>
                <TraceWaterfall>
                  <RootSpanRow>
                    <SpanIdentity $depth={0}>
                      <SpanService>ingress-gateway</SpanService>
                      <SpanName>HTTP POST /checkout</SpanName>
                    </SpanIdentity>
                    <Timeline>
                      <SpanBar $offset={0} $width={100} $index={0} $root />
                    </Timeline>
                    <Duration>{totalDuration}ms</Duration>
                  </RootSpanRow>
                  {selectedSpans.map((span, index) => (
                    <SpanRow
                      key={span.id}
                      type='button'
                      $selected={openSpanId === span.id}
                      aria-expanded={openSpanId === span.id}
                      aria-controls='selected-span-details'
                      onClick={() => setOpenSpanId(span.id)}
                    >
                      <SpanIdentity $depth={span.depth}>
                        <SpanService>{span.name}</SpanService>
                        <SpanName>{span.operation}</SpanName>
                      </SpanIdentity>
                      <Timeline>
                        <SpanBar $offset={span.offset} $width={span.width} $index={index + 1} />
                      </Timeline>
                      <Duration>{span.duration}ms</Duration>
                    </SpanRow>
                  ))}
                  {pipelineHealthProbeSpans.map((span, index) => (
                    <NoisySpanRow key={span.operation} $hidden={false} $index={index}>
                      <SpanIdentity $depth={1}>
                        <SpanService>{span.service}</SpanService>
                        <SpanName>{span.operation}</SpanName>
                      </SpanIdentity>
                      <Timeline>
                        <SpanBar $offset={span.offset} $width={span.width} $index={selectedSpans.length + index + 1} />
                      </Timeline>
                      <Duration>{span.duration}ms</Duration>
                    </NoisySpanRow>
                  ))}
                </TraceWaterfall>
                {openSpan && (
                  <SpanDetails id='selected-span-details' aria-live='polite'>
                    <SpanDetailsHeader>
                      <SpanDetailsTitle>
                        <SpanDetailsService>{openSpan.name}</SpanDetailsService>
                        <SpanDetailsOperation>{openSpan.operation}</SpanDetailsOperation>
                      </SpanDetailsTitle>
                      <SpanDetailsId>span 7b4f1a{openSpan.id.slice(0, 4)}e92c</SpanDetailsId>
                    </SpanDetailsHeader>
                    <AttributeSections>
                      <AttributeSection>
                        <AttributeSectionLabel>Resource attributes</AttributeSectionLabel>
                        <AttributeTable>
                          <tbody>
                            {resourceAttributes.map(([key, value]) => (
                              <AttributeRow key={key}>
                                <AttributeKey scope='row' title={key}>
                                  {key}
                                </AttributeKey>
                                <AttributeValue title={value}>{value}</AttributeValue>
                              </AttributeRow>
                            ))}
                          </tbody>
                        </AttributeTable>
                      </AttributeSection>
                      <AttributeSection>
                        <AttributeSectionLabel>Span attributes</AttributeSectionLabel>
                        <AttributeTable>
                          <tbody>
                            {spanAttributes.map(([key, value]) => (
                              <AttributeRow key={key}>
                                <AttributeKey scope='row' title={key}>
                                  {key}
                                </AttributeKey>
                                <AttributeValue title={value}>{value}</AttributeValue>
                              </AttributeRow>
                            ))}
                          </tbody>
                        </AttributeTable>
                      </AttributeSection>
                    </AttributeSections>
                  </SpanDetails>
                )}
                  </div>
                ) : (
                  <EmptyTrace>
                    <EmptyTraceIcon aria-hidden='true' />
                    <EmptyTraceTitle>Your trace will appear here</EmptyTraceTitle>
                    <EmptyTraceText>Select at least one source and a destination to start the live pipeline.</EmptyTraceText>
                  </EmptyTrace>
                )}
              </ResultContent>
            </>
          ) : activeCapability === 'sampling' ? (
            <>
              <ResultsTabs>
                <ResultTab>sampling-preview</ResultTab>
              </ResultsTabs>
              <ResultContent aria-live='polite'>
                <ResultHeading>
                  Distributed trace
                  <Status $active={!!samplingPresetId}>{samplingPresetId ? 'Live preview' : 'Previewing noise'}</Status>
                </ResultHeading>

                <SamplingSummary>
                  <SamplingMetric>
                    <MetricValue>{activeSamplingPreset.beforeRate.toLocaleString()}</MetricValue>
                    <MetricLabel>Before · traces/min</MetricLabel>
                  </SamplingMetric>
                  <SamplingMetric $accent>
                    <MetricValue $accent>
                      {retainedRate.toLocaleString()}
                    </MetricValue>
                    <MetricLabel>After · traces/min</MetricLabel>
                  </SamplingMetric>
                  <SamplingMetric $accent>
                    <MetricValue $accent>{reduction}%</MetricValue>
                    <MetricLabel>Noise reduction</MetricLabel>
                  </SamplingMetric>
                </SamplingSummary>

                <TraceOverview>
                  <TraceTitleRow>
                    <div>
                      <TraceOperation>POST /checkout</TraceOperation>
                      <TraceTimestamp>Jul 16, 2026 · 11:04:32.184 UTC</TraceTimestamp>
                    </div>
                    <TraceTotal>
                      {totalDuration}ms
                      <TraceTotalLabel>Total duration</TraceTotalLabel>
                    </TraceTotal>
                  </TraceTitleRow>
                  <TraceFacts>
                    <TraceFact>
                      <TraceFactLabel>Trace ID</TraceFactLabel>
                      <TraceFactValue>4fd8a7c31e6b45a891c2</TraceFactValue>
                    </TraceFact>
                    <TraceFact>
                      <TraceFactLabel>Services</TraceFactLabel>
                      <TraceFactValue>{samplingBusinessSpans.length + 1}</TraceFactValue>
                    </TraceFact>
                    <TraceFact>
                      <TraceFactLabel>Spans</TraceFactLabel>
                      <TraceFactValue>{samplingBusinessSpans.length + 1 + visibleNoisyRowCount}</TraceFactValue>
                    </TraceFact>
                    <TraceFact>
                      <TraceFactLabel>Sampling scope</TraceFactLabel>
                      <TraceDestination>
                        {samplingScope === 'cluster' ? 'Entire cluster' : 'Only frontend'}
                      </TraceDestination>
                    </TraceFact>
                  </TraceFacts>
                </TraceOverview>

                <WaterfallHeader>
                  <span>Service / operation</span>
                  <TimelineRuler>
                    <span>0ms</span>
                    <span>{Math.round(totalDuration * 0.25)}ms</span>
                    <span>{Math.round(totalDuration * 0.5)}ms</span>
                    <span>{Math.round(totalDuration * 0.75)}ms</span>
                    <span>{totalDuration}ms</span>
                  </TimelineRuler>
                  <span>Duration</span>
                </WaterfallHeader>
                <TraceWaterfall>
                  <RootSpanRow>
                    <SpanIdentity $depth={0}>
                      <SpanService>ingress-gateway</SpanService>
                      <SpanName>HTTP POST /checkout</SpanName>
                    </SpanIdentity>
                    <Timeline>
                      <SpanBar $offset={0} $width={100} $index={0} $root />
                    </Timeline>
                    <Duration>{totalDuration}ms</Duration>
                  </RootSpanRow>
                  {samplingBusinessSpans.map((span, index) => (
                    <StaticSpanRow key={span.id}>
                      <SpanIdentity $depth={span.depth}>
                        <SpanService>{span.name}</SpanService>
                        <SpanName>{span.operation}</SpanName>
                      </SpanIdentity>
                      <Timeline>
                        <SpanBar $offset={span.offset} $width={span.width} $index={index + 1} />
                      </Timeline>
                      <Duration>{span.duration}ms</Duration>
                    </StaticSpanRow>
                  ))}
                  {noisyTraceRows.map((span, index) => (
                    <NoisySpanRow
                      key={`${samplingPresetId}-${span.sourceId}-${span.operation}-${index}`}
                      $hidden={shouldHideNoisyRow(span)}
                      $index={index}
                      aria-hidden={shouldHideNoisyRow(span)}
                    >
                      <SpanIdentity $depth={index % 2}>
                        <SpanService>{span.service}</SpanService>
                        <SpanName>{span.operation}</SpanName>
                      </SpanIdentity>
                      <Timeline>
                        <SpanBar $offset={span.offset} $width={span.width} $index={index + 1} />
                      </Timeline>
                      <Duration>{span.duration}ms</Duration>
                    </NoisySpanRow>
                  ))}
                </TraceWaterfall>
              </ResultContent>
            </>
          ) : activeCapability === 'enrichment' ? (
            <>
              <ResultsTabs>
                <ResultTab>instrumentation-rule-preview</ResultTab>
              </ResultsTabs>
              <ResultContent aria-live='polite'>
                <ResultHeading>
                  Distributed trace
                  <Status $active={selectedEnrichmentOptions.length > 0}>Live preview</Status>
                </ResultHeading>

                <TraceOverview>
                  <TraceTitleRow>
                    <div>
                      <TraceOperation>POST /checkout</TraceOperation>
                      <TraceTimestamp>Jul 16, 2026 · 11:04:32.184 UTC</TraceTimestamp>
                    </div>
                    <TraceTotal>
                      {totalDuration}ms
                      <TraceTotalLabel>Total duration</TraceTotalLabel>
                    </TraceTotal>
                  </TraceTitleRow>
                </TraceOverview>

                <WaterfallHeader>
                  <span>Service / operation</span>
                  <TimelineRuler>
                    <span>0ms</span>
                    <span>{Math.round(totalDuration * 0.25)}ms</span>
                    <span>{Math.round(totalDuration * 0.5)}ms</span>
                    <span>{Math.round(totalDuration * 0.75)}ms</span>
                    <span>{totalDuration}ms</span>
                  </TimelineRuler>
                  <span>Duration</span>
                </WaterfallHeader>
                <TraceWaterfall>
                  <RootSpanRow>
                    <SpanIdentity $depth={0}>
                      <SpanService>ingress-gateway</SpanService>
                      <SpanName>HTTP POST /checkout</SpanName>
                    </SpanIdentity>
                    <Timeline>
                      <SpanBar $offset={0} $width={100} $index={0} $root />
                    </Timeline>
                    <Duration>{totalDuration}ms</Duration>
                  </RootSpanRow>
                  {enrichmentSpans.map((span, index) => (
                    <StaticSpanRow
                      key={span.id}
                      $selected={span.id === 'frontend'}
                      aria-current={span.id === 'frontend' ? 'true' : undefined}
                    >
                      <SpanIdentity $depth={span.depth}>
                        <SpanService>{span.name}</SpanService>
                        <SpanName>{span.operation}</SpanName>
                      </SpanIdentity>
                      <Timeline>
                        <SpanBar $offset={span.offset} $width={span.width} $index={index + 1} />
                      </Timeline>
                      <Duration>{span.duration}ms</Duration>
                    </StaticSpanRow>
                  ))}
                </TraceWaterfall>

                <SpanDetails id='enrichment-frontend-span-details'>
                  <SpanDetailsHeader>
                    <SpanDetailsTitle>
                      <SpanDetailsService>frontend</SpanDetailsService>
                      <SpanDetailsOperation>POST /api/checkout</SpanDetailsOperation>
                    </SpanDetailsTitle>
                    <SpanDetailsId>span 7b4f1a9c3de92c</SpanDetailsId>
                  </SpanDetailsHeader>
                  <AttributeSections $single>
                    <AttributeSection>
                      <AttributeSectionLabel>Span attributes</AttributeSectionLabel>
                      <AttributeTable>
                        <tbody>
                          {enrichmentBaseAttributes.map(([key, value]) => (
                            <AttributeRow key={key}>
                              <AttributeKey scope='row' title={key}>
                                {key}
                              </AttributeKey>
                              <AttributeValue title={value}>{value}</AttributeValue>
                            </AttributeRow>
                          ))}
                          {visibleEnrichmentOptions.map(({ id, value }) => (
                            <AttributeRow key={`${enrichmentRuleType}-${id}`} $added>
                              <AttributeKey scope='row' title={id}>
                                {id}
                              </AttributeKey>
                              <AttributeValue title={value}>{value}</AttributeValue>
                            </AttributeRow>
                          ))}
                        </tbody>
                      </AttributeTable>
                    </AttributeSection>
                  </AttributeSections>
                </SpanDetails>
              </ResultContent>
            </>
          ) : activeCapability === 'central' ? (
            <>
              <ResultsTabs>
                <ResultTab>fleet-overview</ResultTab>
              </ResultsTabs>
              <ResultContent aria-live='polite'>
                <ResultHeading>
                  Unified control plane
                  <Status $active={connectedEnvironments.length > 0}>
                    {connectedEnvironments.length > 0
                      ? `${connectedEnvironments.length} connected`
                      : 'Waiting for environments'}
                  </Status>
                </ResultHeading>

                <SamplingSummary>
                  <SamplingMetric $accent>
                    <MetricValue $accent>{connectedEnvironments.length}</MetricValue>
                    <MetricLabel>Environments</MetricLabel>
                  </SamplingMetric>
                  <SamplingMetric>
                    <MetricValue>{connectedClusters + connectedVms + connectedFunctions}</MetricValue>
                    <MetricLabel>Compute targets</MetricLabel>
                  </SamplingMetric>
                  <SamplingMetric>
                    <MetricValue>{connectedWorkloads}</MetricValue>
                    <MetricLabel>Instrumented workloads</MetricLabel>
                  </SamplingMetric>
                </SamplingSummary>

                <CentralCanvas>
                  <CentralNode>
                    <CentralNodeHeader>
                      <CentralLogo>
                        <Image src='/assets/odigos/logo_black.svg' alt='' width={16} height={16} />
                      </CentralLogo>
                      <div>
                        <CentralNodeLabel>Odigos Central</CentralNodeLabel>
                        <CentralNodeTitle>Production control plane</CentralNodeTitle>
                      </div>
                    </CentralNodeHeader>
                    <CentralNodeMeta>One policy and management view across every environment</CentralNodeMeta>
                    <LiveStream>{connectedEnvironments.length} environments under management</LiveStream>
                  </CentralNode>
                  <FleetGrid>
                    {centralEnvironments.map((environment) => {
                      const connected = connectedEnvironmentIds.includes(environment.id);
                      return (
                        <FleetCard key={environment.id} $connected={connected}>
                          <FleetCardHeader>
                            <FleetCardName>{environment.name}</FleetCardName>
                            <ProviderBadge $provider={environment.provider}>
                              <ProviderGlyph provider={environment.provider} />
                              <span>{environment.provider}</span>
                            </ProviderBadge>
                          </FleetCardHeader>
                          <FleetCardMeta>
                            {environment.type}
                            <br />
                            {connected
                              ? `${environment.instrumentedUnits} ${environment.unitLabel} instrumented`
                              : 'Ready to connect'}
                          </FleetCardMeta>
                        </FleetCard>
                      );
                    })}
                  </FleetGrid>
                </CentralCanvas>
              </ResultContent>
            </>
          ) : (
            <>
              <ResultsTabs>
                <ResultTab>production-assistant</ResultTab>
              </ResultsTabs>
              <ResultContent key={aiInvestigationId} aria-live='polite'>
                <ResultHeading>
                  Production investigation
                  <Status $active>
                    {aiPhase === 'typing'
                      ? 'Receiving question'
                      : aiPhase === 'thinking'
                        ? 'Investigating'
                        : 'Evidence-backed'}
                  </Status>
                </ResultHeading>

                <AiQuestion>
                  {typedAiQuestion}
                  {aiPhase === 'typing' && <AiTypingCaret aria-hidden='true' />}
                </AiQuestion>

                {aiPhase === 'thinking' && (
                  <AiThinkingCard role='status'>
                    <AiThinkingOrb aria-hidden='true'>✦</AiThinkingOrb>
                    <AiThinkingCopy>
                      <strong>
                        Thinking
                        <AiThinkingDots aria-hidden='true' />
                      </strong>
                      <span>{AI_THINKING_STEPS[aiThinkingStep]}</span>
                    </AiThinkingCopy>
                  </AiThinkingCard>
                )}

                {aiPhase === 'findings' && (
                  <>
                    <AiResponse>
                      <AiResponseLabel>
                        <Image src='/assets/odigos/logo_black.svg' alt='' width={13} height={13} />
                        Odigos AI
                      </AiResponseLabel>
                      {activeAiInvestigation.response}
                    </AiResponse>

                    <AiActivity>
                      <AiActivityHeader>Investigation activity</AiActivityHeader>
                      {activeAiInvestigation.activities.map(([activity, duration], index) => (
                        <AiActivityRow key={activity} $index={index}>
                          <span>{activity}</span>
                          <span>{duration}</span>
                        </AiActivityRow>
                      ))}
                    </AiActivity>

                    <EvidenceCard>
                      <EvidenceLabel>Root cause</EvidenceLabel>
                      <EvidenceTitle>{activeAiInvestigation.rootCause}</EvidenceTitle>
                      <EvidenceFacts>
                        {activeAiInvestigation.evidence.map((fact) => (
                          <EvidenceFact key={fact}>{fact}</EvidenceFact>
                        ))}
                      </EvidenceFacts>
                    </EvidenceCard>
                  </>
                )}
              </ResultContent>
            </>
          )}
        </ResultsPanel>
      </DemoBody>
    </Frame>
  );
};
