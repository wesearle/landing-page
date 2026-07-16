'use client';

import styled from 'styled-components';
import { NewComparisonApproach } from '@/containers/new-comparison-approach';
import { NewComparisonDetailHero } from '@/containers/new-comparison-detail-hero';
import { NewComparisonMatrix } from '@/containers/new-comparison-matrix';
import { NewCta } from '@/containers/new-cta';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';
import { COMPARISONS } from '@/constants';

const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: var(--nd-page);

  @media (max-width: 800px) {
    min-height: calc(100vh - 58px);
  }
`;

const comparison = COMPARISONS[0];

export default function NewObiComparisonPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewComparisonDetailHero comparison={comparison} />
        <NewComparisonApproach comparison={comparison} />
        <NewComparisonMatrix comparison={comparison} />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
