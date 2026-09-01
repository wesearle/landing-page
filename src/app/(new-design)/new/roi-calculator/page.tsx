'use client';

import styled from 'styled-components';
import { NewCta } from '@/containers/new-cta';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';
import { NewRoiCalculator } from '@/containers/new-roi-calculator';

const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: var(--nd-page);

  @media (max-width: 800px) {
    min-height: calc(100vh - 58px);
  }
`;

export default function NewRoiCalculatorPage() {
  return (
    <>
      <NewNavbar />
      <Page>
        <NewRoiCalculator />
        <NewCta />
      </Page>
      <NewFooter />
    </>
  );
}
