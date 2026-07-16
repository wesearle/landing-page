'use client';

import Image from 'next/image';
import Link from 'next/link';
import Preview from '@uiw/react-markdown-preview';
import styled from 'styled-components';
import { HtmlEmbed } from '@/components';
import { useNewColorMode } from '@/contexts/useNewColorMode';
import { calculateReadingTime, getBrandedBlogCover } from '@/functions';
import type { BlogPost } from '@/types';

const Article = styled.article`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 54px 0 0;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 40px 0 0;
  }
`;

const Back = styled(Link)`
  display: inline-flex;
  margin-bottom: 58px;
  color: var(--nd-text-secondary);
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: var(--nd-text);
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(380px, 0.92fr);
  gap: clamp(36px, 6vw, 86px);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.header`
  max-width: 720px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  padding: 6px 10px;
  border: 1px solid var(--nd-border);
  border-radius: 999px;
  color: var(--nd-text-secondary);
  font-size: 11px;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(40px, 4.7vw, 68px);
  font-weight: 420;
  line-height: 1;
  letter-spacing: -0.057em;
  text-wrap: balance;
`;

const Description = styled.p`
  max-width: 800px;
  margin: 28px 0 0;
  color: var(--nd-text-secondary);
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.48;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 30px;
  color: var(--nd-text-muted);
  font-size: 12px;

  span + span::before {
    margin-right: 9px;
    content: '·';
  }
`;

const CoverStage = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  margin: 0;
  place-items: center;
  overflow: hidden;
`;

const Cover = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 6px;

  img {
    object-fit: cover;
  }

`;

const Content = styled.div`
  width: min(100% - 48px, 820px);
  margin: 0 auto;
  padding: 84px 0 104px;

  .wmde-markdown {
    background: transparent !important;
    color: var(--nd-text-secondary) !important;
    font-family: inherit;
    font-size: 17px;
    line-height: 1.75;
  }

  .wmde-markdown h1,
  .wmde-markdown h2,
  .wmde-markdown h3,
  .wmde-markdown h4 {
    border-bottom: 0;
    color: var(--nd-text);
    font-weight: 560;
    letter-spacing: -0.035em;
  }

  .wmde-markdown h2 {
    margin-top: 2.1em;
    font-size: 32px;
  }

  .wmde-markdown h3 {
    margin-top: 1.8em;
    font-size: 24px;
  }

  .wmde-markdown a {
    color: var(--nd-accent);
  }

  .wmde-markdown blockquote {
    border-left-color: var(--nd-accent);
    color: var(--nd-text-secondary);
  }

  .wmde-markdown code {
    border-radius: 3px;
    background: var(--nd-stage);
    color: var(--nd-text-secondary);
  }

  .wmde-markdown pre {
    border-radius: 6px;
    background: #171719 !important;
  }

  .wmde-markdown pre code {
    background: transparent;
    color: #e7e7e2;
  }

  .wmde-markdown img {
    background: transparent;
  }

  .wmde-markdown table th,
  .wmde-markdown table td {
    border-color: var(--nd-border);
  }

  .wmde-markdown table tr {
    border-top-color: var(--nd-border);
    background: transparent;
  }

  .wmde-markdown table tr:nth-child(2n) {
    background: var(--nd-surface);
  }

  @media (max-width: 800px) {
    width: min(100% - 32px, 820px);
    padding: 58px 0 72px;
  }
`;

const Embed = styled.div`
  margin-top: 48px;
`;

export const NewBlogArticle = ({ blog }: { blog: BlogPost }) => {
  const { resolvedMode } = useNewColorMode();
  const cover = getBrandedBlogCover(blog);
  const readingTime = blog.content ? calculateReadingTime(blog.content) : null;
  const date = new Date(blog.pubDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <Article>
        <Back href='/new/blog'>← All articles</Back>
        <HeroGrid>
          <Header>
            {!!blog.tags?.length && (
              <Tags>
                {blog.tags.slice(0, 4).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            )}
            <Title>{blog.title}</Title>
            <Description>{blog.description}</Description>
            <Meta>
              {blog.author && <span>{blog.author}</span>}
              <span>{date}</span>
              {readingTime && <span>{readingTime}</span>}
            </Meta>
          </Header>
          <CoverStage>
            <Cover>
              <Image src={cover} alt='' fill priority sizes='(max-width: 900px) 100vw, 46vw' />
            </Cover>
          </CoverStage>
        </HeroGrid>
      </Article>
      <Content>
        {blog.content && (
          <Preview
            source={blog.content}
            style={{ background: 'transparent', color: 'var(--nd-text-secondary)' }}
            wrapperElement={{ 'data-color-mode': resolvedMode }}
          />
        )}
        {blog.customHtml && (
          <Embed>
            <HtmlEmbed html={blog.customHtml} />
          </Embed>
        )}
      </Content>
    </>
  );
};
