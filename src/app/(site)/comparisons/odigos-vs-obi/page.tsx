'use client';

import React from 'react';
import { getComparisonBySlug } from '@/constants';
import { ComparisonVs, Hero3 } from '@/containers';

const comparison = getComparisonBySlug('odigos-vs-obi');

const OdigosVsObi = () => {
  if (!comparison) return null;

  return (
    <>
      <ComparisonVs comparison={comparison} />
      <Hero3 />
    </>
  );
};

export default OdigosVsObi;
