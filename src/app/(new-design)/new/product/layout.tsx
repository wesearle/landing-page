import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product | Odigos',
  description:
    'Automatically collect and control traces, metrics, and logs from every running service with Odigos.',
  alternates: {
    canonical: 'https://odigos.io/new/product',
  },
};

export default function NewProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
