'use client';

import styled from 'styled-components';
import { NewAiFeature } from '@/containers/new-ai-feature';
import { NewBlogs } from '@/containers/new-blogs';
import { NewClients } from '@/containers/new-clients';
import { NewCta } from '@/containers/new-cta';
import { NewDepthFeature } from '@/containers/new-depth-feature';
import { NewDynamicFeature } from '@/containers/new-dynamic-feature';
import { NewFooter } from '@/containers/new-footer';
import { NewHero } from '@/containers/new-hero';
import { NewInteractiveStage } from '@/containers/new-interactive-stage';
import { NewNavbar } from '@/containers/new-navbar';
import { NewSafetyFeature } from '@/containers/new-safety-feature';
import { NewStatement } from '@/containers/new-statement';

const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: var(--nd-page);

  @media (max-width: 800px) {
    min-height: calc(100vh - 58px);
  }
`;

export default function NewDesignPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewHero />
        <NewInteractiveStage />
        <NewClients />
        <NewStatement />
        <NewDepthFeature />
        <NewDynamicFeature />
        <NewSafetyFeature />
        <NewAiFeature />
        <NewBlogs />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
