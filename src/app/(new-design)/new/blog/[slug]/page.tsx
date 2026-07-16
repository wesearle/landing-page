import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NewBlogArticle } from '@/containers/new-blog-article';
import { NewBlogs } from '@/containers/new-blogs';
import { NewCta } from '@/containers/new-cta';
import { NewFooter } from '@/containers/new-footer';
import { NewNavbar } from '@/containers/new-navbar';
import { getBrandedBlogCover } from '@/functions';
import { getBlogBySlug } from '@/libs/markdown';

interface NewBlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewBlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = 'https://odigos.io';
  const canonicalUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = `${baseUrl}${getBrandedBlogCover(blog)}`;

  return {
    title: `${blog.title} | Odigos Blog`,
    description: blog.metadata || blog.description,
    keywords: blog.tags,
    authors: blog.author ? [{ name: blog.author }] : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.metadata || blog.description,
      url: canonicalUrl,
      siteName: 'Odigos',
      type: 'article',
      publishedTime: blog.pubDate,
      authors: blog.author ? [blog.author] : undefined,
      tags: blog.tags,
      images: [{ url: imageUrl, width: 1200, height: 900, alt: blog.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.metadata || blog.description,
      images: [imageUrl],
    },
  };
}

export default async function NewBlogDetailPage({ params }: NewBlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <>
      <NewNavbar />
      <main style={{ minHeight: '100vh', background: 'var(--nd-page)' }}>
        <NewBlogArticle blog={blog} />
        <NewBlogs title='Related articles' excludeSlug={blog.slug} />
        <NewCta />
      </main>
      <NewFooter />
    </>
  );
}
