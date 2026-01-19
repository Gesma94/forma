'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import type { TButtonStyleProps } from '@/styles/button';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { LogoWithText } from '@/ui/logos/logo-with-text/logo-with-text';
import { topbarCommonNavLinks } from './subs/topbar-common';
import { TopbarMobileMenu } from './subs/topbar-mobile-menu';

export function Topbar({ variant }: SetRequired<VariantProps<typeof style>, 'variant'>) {
  const [isServiceContainerVisible, setIsServiceContainerVisible] = useState(false);

  const {
    container,
    link: linkStyle,
    servicesContainer
  } = style({ variant, isServicesOpen: isServiceContainerVisible });

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
            <Link
              href='/services/architectural-stills'
              className='block px-8 py-2 text-lg text-primary-text hover:bg-primary-hover-bg'
            >
              Architectural Stills
            </Link>
            <Link
              href='/services/video-animations'
              className='block px-8 py-2 text-lg text-primary-text hover:bg-primary-hover-bg'
            >
              Video & Animations
            </Link>
            <Link
              href='/services/360-virtual-reality'
              className='block px-8 py-2 text-lg text-primary-text hover:bg-primary-hover-bg'
            >
              360 Virtual Reality
            </Link>
          </motion.div>
        </div>
        <div className='block lg:hidden'>
          <TopbarMobileMenu />
        </div>
      </ContentContainer>
    </div>
  );
}

const style = tv({
  slots: {
    container: 'w-full h-20 relative',
    link: 'text-lg hover:underline underline-offset-4',
    servicesContainer: 'absolute left-0 pt-24 pb-4 w-full bg-primary flex gap-4 justify-center'
  },
  variants: {
    variant: {
      solid: { container: 'bg-primary', link: 'text-primary-text' },
      solidWhite: { container: 'bg-bg', link: 'text-bg-text' },
      floating: { container: 'absolute top-0 z-50', link: 'text-primary-text' }
    },
    isServicesOpen: {
      true: '',
      false: {
        servicesContainer: ''
      }
    }
  }
});
