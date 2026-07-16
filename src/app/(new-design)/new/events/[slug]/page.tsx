import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NewCta } from '@/containers/new-cta';
import { NewEventArticle } from '@/containers/new-event-article';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';
import { getEventBySlug } from '@/libs/markdown';

interface NewEventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewEventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }

  const canonicalUrl = `https://odigos.io/events/${slug}`;
  const imageUrl = event.image?.startsWith('http') ? event.image : event.image ? `https://odigos.io${event.image}` : undefined;

  return {
    title: `${event.title} | Odigos Events`,
    description: `${event.title}${event.location ? ` — ${event.location}` : ''}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: event.title,
      description: `${event.title}${event.location ? ` — ${event.location}` : ''}`,
      url: canonicalUrl,
      siteName: 'Odigos',
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, alt: event.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: `${event.title}${event.location ? ` — ${event.location}` : ''}`,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function NewEventDetailPage({ params }: NewEventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  return (
    <>
      <NewNavbar />
      <main style={{ minHeight: '100vh', background: 'var(--nd-page)' }}>
        <NewEventArticle event={event} />
        <NewCta />
      </main>
      <NewFooter />
    </>
  );
}
