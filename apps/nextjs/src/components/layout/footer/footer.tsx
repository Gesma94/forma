import { LogoIcon } from '@/ui/logos/logo-icon/logo-icon';
import { ContentContainer } from '@/ui/content-container/content-container';
import { LogoWithText } from '@/ui/logos/logo-with-text/logo-with-text';
import { Separator } from '@/ui/separator/separator';
import Link from 'next/link';
import { q, runQuery } from 'utils/groqd-client';
import { SocialLink } from './subs/social-link';
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';

export async function Footer() {
  const query = q.star.filterByType('footerDocumentType').slice(0);
  const result = await runQuery(query);

  return (
    <footer className='w-full bg-primary pt-32 pb-10'>
      <ContentContainer>
        <div className='max-w-lg'>
          <div className='relative'>
            <div className='absolute h-8 top-1 -left-2 -translate-x-full'>
              <LogoIcon variant='on-brand' />
            </div>
            <p className='text-4xl font-accent font-bold text-primary-text'>{result.heading}</p>
          </div>
        </div>
      </ContentContainer>
      <Separator className='w-full h-px border-bg my-10' />
      <ContentContainer>
        <div className='grid grid-rows-[auto_auto_auto] gap-y-3 items-center justify-center xl:grid-rows-1 xl:grid-cols-3'>
          <div className='row-start-3 flex items-center gap-2 mt-4 xl:row-start-1 xl:mt-0'>
            <div className='h-3'>
              <LogoWithText variant='on-brand' />
            </div>
            <p className='text-primary-text text-center'>
              &copy; {new Date().getFullYear()} Forma Studio. All Rights Reserved.
            </p>
          </div>

          <div className='row-start-1 flex gap-4 justify-center xl:row-start-1'>
            <SocialLink url={result.linkedinLink} icon={LinkedinLogoIcon} />
            <SocialLink url={result.facebookLink} icon={FacebookLogoIcon} />
            <SocialLink url={result.instagramLink} icon={InstagramLogoIcon} />
          </div>

          <div className='row-start-2 flex gap-2 justify-center xl:row-start-1 xl:justify-end'>
            {FooterLegalLinks.map(link => (
              <Link
                key={link.url}
                href={link.url}
                className='text-primary-text underline underline-offset-4 text-center'
              >
                {link.caption}
              </Link>
            ))}
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
}

const FooterLegalLinks: Array<{ url: string; caption: string }> = [
  { url: '/privacy-policy', caption: 'Privacy Policy' },
  { url: '/terms-and-conditions', caption: 'Terms & Conditions' }
];
