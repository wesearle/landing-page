import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Odigos',
  description:
    'Run Odigos Open Source for free or start a 14-day Enterprise trial with deep eBPF observability and multi-cluster control.',
  alternates: {
    canonical: 'https://odigos.io/new/pricing',
  },
};

export default function NewPricingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
