'use client';

import styled from 'styled-components';
import { NewAboutHero } from '@/containers/new-about-hero';
import { NewAboutInvestors } from '@/containers/new-about-investors';
import { NewAboutMission } from '@/containers/new-about-mission';
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

export default function NewAboutPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewAboutHero />
        <NewAboutMission />
        <NewAboutInvestors />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
