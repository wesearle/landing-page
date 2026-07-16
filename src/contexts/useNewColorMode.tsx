'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

export type NewColorMode = 'light' | 'system' | 'dark';

const STORAGE_KEY = 'odigos-new-color-mode';

const Root = styled.div`
  min-height: 100vh;
  color-scheme: light;
  --nd-page: #f7f7f2;
  --nd-surface: #efefea;
  --nd-surface-raised: #ffffff;
  --nd-stage: #e9e9e3;
  --nd-text: #252522;
  --nd-text-strong: #171714;
  --nd-text-secondary: #676762;
  --nd-text-muted: #8a8a84;
  --nd-border: #deded8;
  --nd-accent: #7047eb;
  --nd-button-bg: #171714;
  --nd-button-text: #ffffff;
  --nd-button-hover: #3a3a35;
  background: var(--nd-page);
  color: var(--nd-text);
  transition:
    background 180ms ease,
    color 180ms ease;

  html[data-new-theme='dark'] & {
    color-scheme: dark;
    --nd-page: #11110f;
    --nd-surface: #1a1a18;
    --nd-surface-raised: #22221f;
    --nd-stage: #242420;
    --nd-text: #eeeeea;
    --nd-text-strong: #fafaf5;
    --nd-text-secondary: #b8b8b0;
    --nd-text-muted: #8f8f87;
    --nd-border: #363632;
    --nd-accent: #9b7cf7;
    --nd-button-bg: #f1f1ec;
    --nd-button-text: #171714;
    --nd-button-hover: #dcdcd5;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

interface NewColorModeContextValue {
  mode: NewColorMode;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: NewColorMode) => void;
}

const NewColorModeContext = createContext<NewColorModeContextValue | null>(null);

const resolveMode = (mode: NewColorMode) => {
  if (mode !== 'system') return mode;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const NewColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<NewColorMode>('system');
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedMode = window.localStorage.getItem(STORAGE_KEY);
    if (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system') {
      setModeState(savedMode);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyMode = () => {
      const nextMode = resolveMode(mode);
      document.documentElement.dataset.newTheme = nextMode;
      setResolvedMode(nextMode);
    };

    applyMode();
    media.addEventListener('change', applyMode);
    return () => media.removeEventListener('change', applyMode);
  }, [mode]);

  useEffect(
    () => () => {
      delete document.documentElement.dataset.newTheme;
    },
    [],
  );

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      setMode: (nextMode: NewColorMode) => {
        window.localStorage.setItem(STORAGE_KEY, nextMode);
        setModeState(nextMode);
      },
    }),
    [mode, resolvedMode],
  );

  return (
    <NewColorModeContext.Provider value={value}>
      <Root>{children}</Root>
    </NewColorModeContext.Provider>
  );
};

export const useNewColorMode = () => {
  const context = useContext(NewColorModeContext);
  if (!context) throw new Error('useNewColorMode must be used within NewColorModeProvider');
  return context;
};

export const NEW_COLOR_MODE_SCRIPT = `
(function () {
  try {
    var mode = localStorage.getItem('${STORAGE_KEY}') || 'system';
    var dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.newTheme = dark ? 'dark' : 'light';
  } catch (_) {
    document.documentElement.dataset.newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
})();
`;
