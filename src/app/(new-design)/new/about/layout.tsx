import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Odigos',
  description:
    'Odigos is building the production data layer for AI with safe, dynamic, out-of-process eBPF observability.',
  alternates: {
    canonical: 'https://odigos.io/new/about',
  },
};

export default function NewAboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
