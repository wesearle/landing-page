'use client';

import styled from 'styled-components';
import { NewCta } from '@/containers/new-cta';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';
import { NewPricingComparison } from '@/containers/new-pricing-comparison';
import { NewPricingFaq } from '@/containers/new-pricing-faq';
import { NewPricingHero } from '@/containers/new-pricing-hero';
import { NewPricingPlans } from '@/containers/new-pricing-plans';

const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: var(--nd-page);

  @media (max-width: 800px) {
    min-height: calc(100vh - 58px);
  }
`;

export default function NewPricingPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewPricingHero />
        <NewPricingPlans />
        <NewPricingComparison />
        <NewPricingFaq />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
