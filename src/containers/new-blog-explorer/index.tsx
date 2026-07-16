'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useBlogs } from '@/contexts';
import { BLOG_COVER_FALLBACK, calculateReadingTime, getBrandedBlogCover } from '@/functions';
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

const Controls = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 34px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--nd-border);

  @media (max-width: 800px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Filter = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  padding: 0 13px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--nd-button-bg)' : 'var(--nd-border)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--nd-button-bg)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--nd-button-text)' : 'var(--nd-text-secondary)')};
  font: inherit;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    border-color: var(--nd-text-muted);
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 2px;
  }
`;

const Search = styled.input`
  width: min(100%, 270px);
  height: 38px;
  padding: 0 2px;
  border: 0;
  border-bottom: 1px solid var(--nd-text-muted);
  border-radius: 0;
  outline: 0;
  background: transparent;
  color: var(--nd-text);
  font: inherit;
  font-size: 13px;

  &::placeholder {
    color: var(--nd-text-muted);
  }

  &:focus {
    border-bottom-color: var(--nd-accent);
  }

  @media (max-width: 800px) {
    width: 100%;
    max-width: none;
  }
`;

const Results = styled.div`
  margin-bottom: 15px;
  color: var(--nd-text-muted);
  font-size: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 650px) {
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
`;

const Meta = styled.div`
  min-height: 14px;
  margin-bottom: 13px;
  color: var(--nd-text-muted);
  font-size: 10px;
  letter-spacing: 0.025em;
  text-transform: uppercase;
`;

const CardTitle = styled.h2`
  display: -webkit-box;
  min-height: 64px;
  margin: 0 0 9px;
  overflow: hidden;
  color: var(--nd-text);
  font-size: 18px;
  font-weight: 540;
  line-height: 1.18;
  letter-spacing: -0.028em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const Description = styled.p`
  display: -webkit-box;
  min-height: 56px;
  margin: 0 0 14px;
  overflow: hidden;
  color: var(--nd-text-secondary);
  font-size: 13px;
  line-height: 1.43;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const ReadLink = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  margin-bottom: 17px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }
`;

const ImageFrame = styled.div`
  position: relative;
  min-height: 250px;
  flex: 1;
  overflow: hidden;
  background: var(--nd-stage);

  img {
    transition: transform 280ms ease;
  }

  ${Card}:hover & img {
    transform: scale(1.025);
  }
`;

const Empty = styled.div`
  padding: 80px 24px;
  background: var(--nd-surface);
  color: var(--nd-text-secondary);
  text-align: center;
`;

const BlogTile = ({ blog, index }: { blog: BlogPost; index: number }) => {
  const [cover, setCover] = useState(() => getBrandedBlogCover(blog, index));
  const date = new Date(blog.pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const readingTime = blog.content ? calculateReadingTime(blog.content) : null;
  const shortDescription = blog.description.length > 130 ? `${blog.description.slice(0, 127)}…` : blog.description;

  return (
    <Card>
      <Meta>
        {date}
        {readingTime ? ` · ${readingTime}` : ''}
      </Meta>
      <CardTitle>{blog.title}</CardTitle>
      <Description>{shortDescription}</Description>
      <ReadLink href={`/new/blog/${blog.slug}`}>Read article →</ReadLink>
      <ImageFrame>
        <Image
          src={cover}
          alt=''
          fill
          sizes='(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw'
          onError={() => setCover(BLOG_COVER_FALLBACK)}
          style={{ objectFit: 'cover' }}
        />
      </ImageFrame>
    </Card>
  );
};

export const NewBlogExplorer = () => {
  const { blogs } = useBlogs();
  const [activeTag, setActiveTag] = useState('all');
  const [query, setQuery] = useState('');

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    blogs.forEach((blog) =>
      blog.tags?.forEach((tag) => {
        const normalized = tag.trim().toLowerCase();
        counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
      }),
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesTag = activeTag === 'all' || blog.tags?.some((tag) => tag.toLowerCase() === activeTag);
      const matchesQuery =
        !normalizedQuery ||
        blog.title.toLowerCase().includes(normalizedQuery) ||
        blog.description.toLowerCase().includes(normalizedQuery);
      return matchesTag && matchesQuery;
    });
  }, [activeTag, blogs, query]);

  return (
    <Section>
      <Controls>
        <Filters aria-label='Filter articles by topic'>
          <Filter type='button' $active={activeTag === 'all'} onClick={() => setActiveTag('all')}>
            All
          </Filter>
          {tags.map((tag) => (
            <Filter key={tag} type='button' $active={activeTag === tag} onClick={() => setActiveTag(tag)}>
              {tag}
            </Filter>
          ))}
        </Filters>
        <Search
          type='search'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Search articles'
          aria-label='Search articles'
        />
      </Controls>
      <Results>{filteredBlogs.length} articles</Results>
      {filteredBlogs.length ? (
        <Grid>
          {filteredBlogs.map((blog, index) => (
            <BlogTile key={blog.slug} blog={blog} index={index} />
          ))}
        </Grid>
      ) : (
        <Empty>No articles match this search.</Empty>
      )}
    </Section>
  );
};
