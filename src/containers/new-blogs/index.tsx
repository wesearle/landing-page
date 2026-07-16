'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useBlogs } from '@/contexts';
import { getBrandedBlogCover } from '@/functions';
import type { BlogPost } from '@/types';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 72px;
  }
`;

const Heading = styled.h2`
  margin: 0 0 24px;
  color: var(--nd-text);
  font-size: clamp(25px, 2.2vw, 34px);
  font-weight: 520;
  line-height: 1.1;
  letter-spacing: -0.035em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: flex;
  min-width: 0;
  min-height: 500px;
  flex-direction: column;
  padding: 20px 20px 12px;
  background: var(--nd-surface);

  @media (max-width: 800px) {
    min-height: 450px;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  color: var(--nd-text);
  font-size: 17px;
  font-weight: 520;
  line-height: 1.2;
  letter-spacing: -0.025em;
`;

const Description = styled.p`
  min-height: 60px;
  margin: 0 0 12px;
  color: var(--nd-text-secondary);
  font-size: 14px;
  line-height: 1.4;
`;

const ArticleLink = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  margin-bottom: 16px;
  color: var(--nd-accent);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }
`;

const ImageFrame = styled.div`
  position: relative;
  min-height: 280px;
  flex: 1;
  overflow: hidden;
  background: var(--nd-stage);

  img {
    transition: transform 300ms ease;
  }

  ${Card}:hover & img {
    transform: scale(1.025);
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
  }
`;

const BlogTile = ({ blog, cover }: { blog: BlogPost; cover: string }) => {
  const { slug, title, description } = blog;
  const shortDescription = description.length > 120 ? `${description.slice(0, 117)}…` : description;

  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <Description>{shortDescription}</Description>
      <ArticleLink href={`/new/blog/${slug}`}>Read article →</ArticleLink>
      <ImageFrame>
        <Image
          src={cover}
          alt=''
          fill
          sizes='(max-width: 800px) 100vw, 33vw'
          style={{ objectFit: 'cover' }}
        />
      </ImageFrame>
    </Card>
  );
};

export const NewBlogs = ({
  title = 'Stay on the observability frontier',
  excludeSlug,
}: {
  title?: string;
  excludeSlug?: string;
}) => {
  const { blogs } = useBlogs();
  const visibleBlogs = blogs.filter(({ slug }) => slug !== excludeSlug).slice(0, 3);

  if (!visibleBlogs.length) return null;

  return (
    <Section aria-labelledby='new-blog-heading'>
      <Heading id='new-blog-heading'>{title}</Heading>
      <Grid>
        {visibleBlogs.map((blog, index) => (
          <BlogTile key={blog.slug} blog={blog} cover={getBrandedBlogCover(blog, index)} />
        ))}
      </Grid>
    </Section>
  );
};
