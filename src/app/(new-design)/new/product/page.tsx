'use client';

import styled from 'styled-components';
import { NewBlogs } from '@/containers/new-blogs';
import { NewCta } from '@/containers/new-cta';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';
import { NewProductHero } from '@/containers/new-product-hero';
import { NewProductOverview } from '@/containers/new-product-overview';
import { NewProductSections } from '@/containers/new-product-sections';
import { NewProductStatement } from '@/containers/new-product-statement';

const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: var(--nd-page);

  @media (max-width: 800px) {
    min-height: calc(100vh - 58px);
  }
`;

export default function NewProductPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewProductHero />
        <NewProductOverview />
        <NewProductSections />
        <NewProductStatement />
        <NewBlogs />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
