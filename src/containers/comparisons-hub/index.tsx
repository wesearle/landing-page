'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Text, TextLayers } from '@/components';
import { COMPARISONS } from '@/constants';
import { useMobile } from '@/contexts';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';
import styled, { useTheme } from 'styled-components';

const Card = styled(Link)<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'calc(50% - 12px)')};
  max-width: 480px;
  padding: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
  background: ${({ theme }) => theme.colors.black_lighter};
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.purple_darker};
    background: ${({ theme }) => theme.colors.grey_cold};
  }
`;

const Logos = styled(FlexRow)`
  align-items: center;
  gap: 12px;
`;

const LogoFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 8px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grey_darkest};
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
`;

const Vs = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CardTitle = styled(Text)`
  font-size: 28px;
  font-weight: 600;
  line-height: 120%;
`;

const CardSubtitle = styled(Text)`
  font-size: 16px;
  line-height: 150%;
`;

const CtaWrap = styled.div`
  margin-top: 4px;
`;

export const ComparisonsHub = () => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $overrideMaxWidth={1200}>
      <FlexColumn $gap={isMobile ? 32 : 48}>
        <TextLayers
          miniTitle='COMPARISONS'
          title='How Odigos Compares'
          titleSettings={{ largeTitle: true }}
          descriptions={['See how Odigos eBPF Instrumentation and OpenTelemetry Control Plane stack up against other Instrumentation Agents']}
          descriptionSettings={{ maxWidth: '100%' }}
        />

        <FlexRow $gap={24} $wrap='wrap' $align='stretch'>
          {COMPARISONS.map((comparison) => (
            <Card key={comparison.slug} href={comparison.href} $isMobile={isMobile}>
              <Logos>
                {comparison.logos.map((logo, index) => (
                  <React.Fragment key={logo.src}>
                    {index > 0 && (
                      <Vs color={theme.colors.grey}>vs</Vs>
                    )}
                    <LogoFrame>
                      <Image src={logo.src} alt={logo.alt} width={32} height={32} />
                    </LogoFrame>
                  </React.Fragment>
                ))}
              </Logos>
              <FlexColumn $gap={8}>
                <CardTitle>{comparison.title}</CardTitle>
                <CardSubtitle color={theme.colors.grey}>{comparison.subtitle}</CardSubtitle>
              </FlexColumn>
              <CtaWrap>
                <Text fontSize={14} fontWeight={500} color={theme.colors.purple}>
                  Read comparison →
                </Text>
              </CtaWrap>
            </Card>
          ))}
        </FlexRow>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
