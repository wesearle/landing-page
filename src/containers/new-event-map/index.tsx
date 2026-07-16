'use client';

import { useEffect, useState } from 'react';
import { APIProvider, AdvancedMarker, InfoWindow, Map, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import styled from 'styled-components';
import { GOOGLE_MAPS_API_KEY } from '@/constants';
import { fetchCoordinates } from '@/functions';

const Wrapper = styled.div`
  width: 100%;
  height: 290px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 6px;
  background: var(--nd-surface);
`;

const Label = styled.span`
  color: var(--nd-text);
  font-size: 13px;
`;

export const NewEventMap = ({ location: rawLocation }: { location?: string }) => {
  const location = rawLocation?.replace(/\s*\([^)]*\)/, '');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    if (!location) return;
    fetchCoordinates(location)
      .then((value) => setCoordinates(value || null))
      .catch(() => setCoordinates(null));
  }, [location]);

  if (!coordinates || !location) return null;

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Wrapper>
        <Map
          mapId='49ae42fed52588c3'
          mapTypeId='roadmap'
          defaultCenter={coordinates}
          defaultZoom={4}
          gestureHandling='cooperative'
          disableDefaultUI
          style={{ width: '100%', height: '100%' }}
        >
          <AdvancedMarker
            ref={markerRef}
            position={coordinates}
            title={location}
            clickable
            onClick={() => setInfoOpen((open) => !open)}
          >
            <Pin background='#7047eb' borderColor='#4e2eb5' glyphColor='#fff' />
            {infoOpen && (
              <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)} headerContent={<Label>{location}</Label>} />
            )}
          </AdvancedMarker>
        </Map>
      </Wrapper>
    </APIProvider>
  );
};
