import Link from 'next/link';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { LogoWithText } from '@/ui/logos/logo-with-text/logo-with-text';
import { topbarCommonNavLinks } from './subs/topbar-common';
import { TopbarMobileMenu } from './subs/topbar-mobile-menu';

export function Topbar() {
  return (
    <ContentContainer>
      <div className='size-full flex justify-between items-center'>
        <div className='h-4 lg:h-8'>
          <Link href='/'>
            <LogoWithText variant='brand' />
          </Link>
        </div>
        <nav className='hidden lg:flex items-center gap-10'>
          {topbarCommonNavLinks.map(link => (
            <Link key={link.url} href={link.url} className='text-lg text-primary-text'>
              {link.label}
            </Link>
          ))}
          <LinkButton variant='primary' surface='bg' size='default' href='/book'>
            Book now
          </LinkButton>
        </nav>
        <div className='block lg:hidden'>
          <TopbarMobileMenu />
        </div>
      </div>
    </ContentContainer>
  );
}
