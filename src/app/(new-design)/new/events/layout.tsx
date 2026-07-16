import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | Odigos',
  description:
    'Meet Odigos at Kubernetes, infrastructure, and observability events and see production-grade eBPF instrumentation in action.',
  alternates: {
    canonical: 'https://odigos.io/new/events',
  },
};

export default function NewEventsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
