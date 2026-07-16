'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useEvents } from '@/contexts';
import { formatEventDateRange, isValidImageSrc } from '@/functions';
import type { EventPost } from '@/types';

const FALLBACK_COVER = '/assets/blogs/odigos-blog-kubernetes-fleet.png';

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

  @media (max-width: 700px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 7px;
`;

const Filter = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  padding: 0 14px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--nd-button-bg)' : 'var(--nd-border)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--nd-button-bg)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--nd-button-text)' : 'var(--nd-text-secondary)')};
  font: inherit;
  font-size: 12px;
  cursor: pointer;

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
  outline: 0;
  background: transparent;
  color: var(--nd-text);
  font: inherit;
  font-size: 13px;

  &:focus {
    border-bottom-color: var(--nd-accent);
  }

  @media (max-width: 700px) {
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
  min-height: 490px;
  flex-direction: column;
  padding: 20px 20px 12px;
  background: var(--nd-surface);
`;

const DateText = styled.div`
  min-height: 14px;
  margin-bottom: 14px;
  color: var(--nd-text-muted);
  font-size: 10px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  display: -webkit-box;
  min-height: 68px;
  margin: 0 0 10px;
  overflow: hidden;
  color: var(--nd-text);
  font-size: 19px;
  font-weight: 540;
  line-height: 1.18;
  letter-spacing: -0.028em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const Details = styled.div`
  min-height: 48px;
  margin-bottom: 14px;
  color: var(--nd-text-secondary);
  font-size: 13px;
  line-height: 1.45;
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
`;

const ImageFrame = styled.div`
  position: relative;
  min-height: 250px;
  flex: 1;
  overflow: hidden;
  background: var(--nd-stage);

  img {
    object-fit: cover;
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

const EventTile = ({ event }: { event: EventPost }) => {
  const initialCover = event.image && isValidImageSrc(event.image) ? event.image : FALLBACK_COVER;
  const [cover, setCover] = useState(initialCover);
  const date = formatEventDateRange(event.eventStartDate, event.eventEndDate);

  return (
    <Card>
      <DateText>{date || 'Date to be announced'}</DateText>
      <Title>{event.title}</Title>
      <Details>
        {event.location || 'Location to be announced'}
        {event.booth ? ` · Booth ${event.booth}` : ''}
      </Details>
      <ReadLink href={`/new/events/${event.slug}`}>View event →</ReadLink>
      <ImageFrame>
        <Image
          src={cover}
          alt=''
          fill
          sizes='(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw'
          onError={() => setCover(FALLBACK_COVER)}
        />
      </ImageFrame>
    </Card>
  );
};

export const NewEventsExplorer = () => {
  const { events } = useEvents();
  const [status, setStatus] = useState<'all' | 'upcoming' | 'past'>('all');
  const [query, setQuery] = useState('');

  const filteredEvents = useMemo(() => {
    const now = Date.now();
    const normalizedQuery = query.trim().toLowerCase();

    return events.filter((event) => {
      const dateValue = event.eventEndDate || event.eventStartDate;
      const eventTime = dateValue ? new Date(dateValue).getTime() : NaN;
      const isUpcoming = !Number.isNaN(eventTime) && eventTime >= now;
      const matchesStatus = status === 'all' || (status === 'upcoming' ? isUpcoming : !isUpcoming);
      const searchable = `${event.title} ${event.location ?? ''} ${event.booth ?? ''}`.toLowerCase();
      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [events, query, status]);

  return (
    <Section>
      <Controls>
        <Filters aria-label='Filter events'>
          {(['all', 'upcoming', 'past'] as const).map((value) => (
            <Filter key={value} type='button' $active={status === value} onClick={() => setStatus(value)}>
              {value[0].toUpperCase() + value.slice(1)}
            </Filter>
          ))}
        </Filters>
        <Search
          type='search'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Search events'
          aria-label='Search events'
        />
      </Controls>
      <Results>{filteredEvents.length} events</Results>
      {filteredEvents.length ? (
        <Grid>
          {filteredEvents.map((event) => (
            <EventTile key={event.slug} event={event} />
          ))}
        </Grid>
      ) : (
        <Empty>No events match this filter.</Empty>
      )}
    </Section>
  );
};
