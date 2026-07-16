import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Odigos vs OBI | Odigos',
  description:
    'Compare Odigos userspace eBPF instrumentation with OpenTelemetry eBPF Instrumentation across application depth, encrypted traffic, pipeline management, and dynamic instrumentation.',
  alternates: {
    canonical: 'https://odigos.io/new/comparisons/odigos-vs-obi',
  },
};

export default function NewObiComparisonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
