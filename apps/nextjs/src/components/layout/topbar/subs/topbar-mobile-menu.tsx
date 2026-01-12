'use client';

import { ImageIcon, ListIcon, PanoramaIcon, VideoIcon, XIcon } from '@phosphor-icons/react';
import { HouseIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Button as AriaButton,
  DialogTrigger as AriaDialogTrigger,
  Dialog,
  Modal,
  ModalOverlay
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { LogoWithText } from '@/ui/logos/logo-with-text/logo-with-text';
import { topbarCommonNavLinks } from './topbar-common';

export function TopbarMobileMenu() {
  const pathname = usePathname();

  return (
    <AriaDialogTrigger key={pathname}>
      <AriaButton>
        <ListIcon className='size-8 text-primary-text' />
      </AriaButton>
      <ModalOverlay className={({ state }) => modalOverlayStyle({ isOpen: state.isOpen })}>
        <Modal className={({ isEntering, isExiting }) => modalStyle({ isEntering, isExiting })}>
          <Dialog aria-label='Mobile menu' className='h-full flex flex-col overflow-y-auto pb-10'>
            <div>
              <ContentContainer>
                <div className='h-20 flex justify-between items-center'>
                  <div className='h-4'>
                    <Link href='/'>
                      <LogoWithText variant='brand' />
                    </Link>
                  </div>
                  <AriaButton slot='close'>
                    <XIcon className='size-8 text-primary' />
                  </AriaButton>
                </div>
              </ContentContainer>
            </div>

            <nav className='mt-4 flex flex-col'>
              <Link href='/' className='px-8 h-20 flex gap-4 items-center text-2xl text-bg-text'>
                <HouseIcon className='size-8' />
                Home
              </Link>
              <Link
                href='/services/architectural-stills'
                className='px-8 h-20 flex gap-4 items-center text-2xl text-bg-text'
              >
                <ImageIcon className='size-8' />
                Architectural Stills
              </Link>
              <Link
                href='/services/video-animations'
                className='px-8 h-20 flex gap-4 items-center text-2xl text-bg-text'
              >
                <PanoramaIcon className='size-8' />
                Video & Animations
              </Link>
              <Link
                href='/services/360-virtual-reality'
                className='px-8 h-20 flex gap-4 items-center text-2xl text-bg-text'
              >
                <VideoIcon className='size-8' />
                360 Virtual Reality
              </Link>
              {topbarCommonNavLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    className='px-8 h-20 flex gap-4 items-center text-2xl text-bg-text'
                  >
                    <Icon className='size-8' />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className='mt-10 mx-8'>
              <LinkButton variant='primary' surface='bg' isFullWidth={true} size='large' href='/book'>
                Book now
              </LinkButton>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </AriaDialogTrigger>
  );
}

const modalOverlayStyle = tv({
  base: 'z-20 fixed inset-0 bg-overlay duration-300',
  variants: {
    isOpen: {
      true: 'animate-backdrop-blur',
      false: 'animate-backdrop-blur-reverse'
    }
  }
});

const modalStyle = tv({
  base: 'fixed top-0 bottom-0 right-0 bg-bg w-full motion-duration-300 xs:w-96',
  variants: {
    isEntering: {
      true: 'motion-translate-x-in-100',
      false: ''
    },
    isExiting: {
      true: 'motion-translate-x-out-100',
      false: ''
    }
  }
});
