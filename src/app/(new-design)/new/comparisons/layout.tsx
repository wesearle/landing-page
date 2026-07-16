import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparisons | Odigos',
  description:
    'Compare Odigos application-level eBPF instrumentation and OpenTelemetry control plane with other observability approaches.',
  alternates: {
    canonical: 'https://odigos.io/new/comparisons',
  },
};

export default function NewComparisonsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
