'use client';

import styled from 'styled-components';
import { NewBlogExplorer } from '@/containers/new-blog-explorer';
import { NewBlogHero } from '@/containers/new-blog-hero';
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

export default function NewBlogPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewBlogHero />
        <NewBlogExplorer />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
