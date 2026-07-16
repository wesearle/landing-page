import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparisons | Odigos',
  description: 'Compare Odigos library-level eBPF instrumentation with other approaches like OpenTelemetry eBPF Instrumentation (OBI).',
  alternates: {
    canonical: 'https://odigos.io/comparisons',
  },
};

export default function ComparisonsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
