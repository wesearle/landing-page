import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Odigos',
  description:
    'Deep dives into eBPF, OpenTelemetry, distributed tracing, and production observability from the Odigos team.',
  alternates: {
    canonical: 'https://odigos.io/new/blog',
  },
};

export default function NewBlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
