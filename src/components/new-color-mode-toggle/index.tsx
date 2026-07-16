'use client';

import styled from 'styled-components';
import { type NewColorMode, useNewColorMode } from '@/contexts/useNewColorMode';

const Control = styled.div`
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--nd-border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--nd-surface-raised) 72%, transparent);
`;

const ModeButton = styled.button<{ $active: boolean }>`
  display: inline-grid;
  width: 27px;
  height: 27px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  place-items: center;
  background: ${({ $active }) => ($active ? 'var(--nd-text)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--nd-page)' : 'var(--nd-text-muted)')};
  cursor: pointer;
  transition:
    background 150ms ease,
    color 150ms ease;

  &:hover {
    color: ${({ $active }) => ($active ? 'var(--nd-page)' : 'var(--nd-text)')};
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 2px;
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

const SunIcon = () => (
  <svg viewBox='0 0 16 16' fill='none' aria-hidden='true'>
    <circle cx='8' cy='8' r='2.5' stroke='currentColor' />
    <path d='M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M12.95 3.05l-1.4 1.4M4.45 11.55l-1.4 1.4' stroke='currentColor' strokeLinecap='round' />
  </svg>
);

const SystemIcon = () => (
  <svg viewBox='0 0 16 16' fill='none' aria-hidden='true'>
    <rect x='2' y='2.5' width='12' height='8.5' rx='1.5' stroke='currentColor' />
    <path d='M6 13.5h4M8 11v2.5' stroke='currentColor' strokeLinecap='round' />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox='0 0 16 16' fill='none' aria-hidden='true'>
    <path d='M13.4 10.15A5.8 5.8 0 015.85 2.6 5.8 5.8 0 1013.4 10.15z' stroke='currentColor' strokeLinejoin='round' />
  </svg>
);

const MODES: { value: NewColorMode; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Use light mode', icon: <SunIcon /> },
  { value: 'system', label: 'Use system appearance', icon: <SystemIcon /> },
  { value: 'dark', label: 'Use dark mode', icon: <MoonIcon /> },
];

export const NewColorModeToggle = () => {
  const { mode, setMode } = useNewColorMode();

  return (
    <Control role='group' aria-label='Color mode'>
      {MODES.map(({ value, label, icon }) => (
        <ModeButton
          key={value}
          type='button'
          $active={mode === value}
          aria-label={label}
          aria-pressed={mode === value}
          title={label}
          onClick={() => setMode(value)}
        >
          {icon}
        </ModeButton>
      ))}
    </Control>
  );
};
