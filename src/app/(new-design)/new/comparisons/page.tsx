'use client';

import styled from 'styled-components';
import { NewComparisonsGrid } from '@/containers/new-comparisons-grid';
import { NewComparisonsHero } from '@/containers/new-comparisons-hero';
import { NewCta } from '@/containers/new-cta';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';

const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: var(--nd-page);

  @media (max-width: 800px) {
    min-height: calc(100vh - 58px);
  }
`;

export default function NewComparisonsPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewComparisonsHero />
        <NewComparisonsGrid />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
