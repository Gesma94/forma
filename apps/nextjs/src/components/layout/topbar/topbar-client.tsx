'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import type { TopbarDocumentType } from 'types/generated/sanity-types-generated';
import type { TButtonStyleProps } from '@/styles/button';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { LogoWithText } from '@/ui/logos/logo-with-text/logo-with-text';
import { ServiceLink } from './subs/service-link';
import { topbarCommonNavLinks } from './subs/topbar-common';
import { TopbarMobileMenu } from './subs/topbar-mobile-menu';
import { topbarTv } from './subs/topbar-style';

type Props = {
  topbarModule: TopbarDocumentType;
  variant: SetRequired<VariantProps<typeof topbarTv>, 'variant'>['variant'];
  architecturalStillsMedia: TFormaMediaUnwrapped;
  videoAnimationsMedia: TFormaMediaUnwrapped;
  virtualRealityMedia: TFormaMediaUnwrapped;
};

export function TopbarClient({
  topbarModule,
  variant,
  architecturalStillsMedia,
  videoAnimationsMedia,
  virtualRealityMedia
}: Props) {
  const [isServiceContainerVisible, setIsServiceContainerVisible] = useState(false);

  const { container, link: linkStyle, servicesContainer } = topbarTv({ variant });

  const handleTriggerMouseEnter = () => {
    setIsServiceContainerVisible(true);
  };

  const handleSimpleLinkOver = () => {
    setIsServiceContainerVisible(false);
  };

  const handleServiceContainerLeave = () => {
    setIsServiceContainerVisible(false);
  };

  const linkButtonSurface = useMemo<TButtonStyleProps['surface']>(() => {
    if (variant === 'solid') {
      return 'primary';
    } else {
      return isServiceContainerVisible ? 'primary' : 'bg';
    }
  }, [variant, isServiceContainerVisible]);

  return (
    <div className={container()} onMouseLeave={handleServiceContainerLeave}>
      <ContentContainer>
        <div className='size-full flex justify-between items-center'>
          <div className='h-4 lg:h-8 z-20 relative'>
            <Link href='/'>
              {variant === 'solid' ? (
                <LogoWithText variant='on-brand' />
              ) : (
                <>
                  <motion.div
                    className='size-full'
                    initial={{ opacity: isServiceContainerVisible ? 1 : 0 }}
                    animate={{ opacity: isServiceContainerVisible ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LogoWithText variant='brand' />
                  </motion.div>
                  <motion.div
                    className='absolute inset-0'
                    initial={{ opacity: isServiceContainerVisible ? 0 : 1 }}
                    animate={{ opacity: isServiceContainerVisible ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LogoWithText variant='on-brand' />
                  </motion.div>
                </>
              )}
            </Link>
          </div>
          <div className='hidden lg:flex items-center gap-10 z-10'>
            <nav className='lg:flex items-center gap-10 z-10'>
              <p onMouseEnter={handleTriggerMouseEnter} className={linkStyle({ class: 'cursor-pointer' })}>
                Services
              </p>

              {topbarCommonNavLinks.map(link => (
                <Link key={link.url} href={link.url} className={linkStyle()} onMouseEnter={handleSimpleLinkOver}>
                  {link.label}
                </Link>
              ))}
              <LinkButton variant='primary' surface={linkButtonSurface} size='default' href='/book'>
                Book a call
              </LinkButton>
            </nav>
          </div>
          <motion.div
            className={servicesContainer()}
            initial={{ y: '-100%' }}
            animate={{ y: isServiceContainerVisible ? 0 : '-100%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='flex gap-10 xl:gap-20 items-center justify-center relative z-50'>
              <ServiceLink
                urlCaption={topbarModule.architecturalStillsCaption}
                urlLink='/services/architectural-stills'
                formaMediaData={architecturalStillsMedia}
              />
              <ServiceLink
                urlCaption={topbarModule.videoAnimationsCaption}
                urlLink='/services/video-animations'
                formaMediaData={videoAnimationsMedia}
              />
              <ServiceLink
                urlCaption={topbarModule.virtualRealityCaption}
                urlLink='/services/360-virtual-reality'
                formaMediaData={virtualRealityMedia}
              />
            </div>
          </motion.div>
          <div className='block lg:hidden'>
            <TopbarMobileMenu />
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}
