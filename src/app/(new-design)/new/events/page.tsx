'use client';

import styled from 'styled-components';
import { NewCta } from '@/containers/new-cta';
import { NewEventsExplorer } from '@/containers/new-events-explorer';
import { NewEventsHero } from '@/containers/new-events-hero';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';

const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: var(--nd-page);

  @media (max-width: 800px) {
    min-height: calc(100vh - 58px);
  }
`;

export default function NewEventsPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewEventsHero />
        <NewEventsExplorer />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
