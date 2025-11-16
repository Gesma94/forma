import Link from 'next/link';
import { useMemo } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import type { TButtonStyleProps } from '@/styles/button';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { LogoWithText, type TLogoWithTextProps } from '@/ui/logos/logo-with-text/logo-with-text';
import { topbarCommonNavLinks } from './subs/topbar-common';
import { TopbarMobileMenu } from './subs/topbar-mobile-menu';

export function Topbar({ variant }: SetRequired<VariantProps<typeof style>, 'variant'>) {
  const { container, link: linkStyle } = style({ variant });

  const logoWithTextVariant = useMemo<TLogoWithTextProps['variant']>(
    () => (variant === 'solid' ? 'on-brand' : 'brand'),
    [variant]
  );

  const linkButtonSurface = useMemo<TButtonStyleProps['surface']>(
    () => (variant === 'solid' ? 'primary' : 'bg'),
    [variant]
  );

  return (
    <div className={container()}>
      <ContentContainer>
        <div className='size-full flex justify-between items-center'>
          <div className='h-4 lg:h-8'>
            <Link href='/'>
              <LogoWithText variant={logoWithTextVariant} />
            </Link>
          </div>
          <nav className='hidden lg:flex items-center gap-10'>
            {topbarCommonNavLinks.map(link => (
              <Link key={link.url} href={link.url} className={linkStyle()}>
                {link.label}
              </Link>
            ))}
            <LinkButton variant='primary' surface={linkButtonSurface} size='default' href='/book'>
              Book a call
            </LinkButton>
          </nav>
          <div className='block lg:hidden'>
            <TopbarMobileMenu />
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}

const style = tv({
  slots: {
    container: 'w-full h-20',
    link: 'text-lg'
  },
  variants: {
    variant: {
      solid: { container: 'bg-primary', link: 'text-primary-text' },
      floating: { container: 'absolute top-0 z-50', link: 'text-primary-text' }
    }
  }
});
