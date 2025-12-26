import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, MapPinIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { q, runQuery } from 'utils/groqd-client';
import { ContentContainer } from '@/ui/content-container/content-container';
import { LogoIcon } from '@/ui/logos/logo-icon/logo-icon';
import { LogoWithText } from '@/ui/logos/logo-with-text/logo-with-text';
import { Separator } from '@/ui/separator/separator';
import { FooterContact, FooterCopyrightCsr, FooterCta, FooterGroup, FooterSocialLink } from './subs';

export async function Footer() {
  const result = await runQuery(q.star.filterByType('footerDocumentType').slice(0));

  return (
    <footer className='w-full bg-primary pt-14 pb-6'>
      <ContentContainer>
        <div className='flex flex-col gap-10 md:gap-20 xl:flex-row'>
          <div className='grow flex flex-col gap-10 md:flex-row md:gap-0'>
            <div className='max-w-lg'>
              <div className='relative'>
                <div className='absolute h-8 top-1 -left-2 -translate-x-full'>
                  <LogoIcon variant='on-brand' />
                </div>
                <p className='text-4xl font-bold text-primary-text'>{result.heading}</p>
              </div>
              <div className='mt-4 w-fit'>
                <FooterCta label={result.CtaLabel} />
              </div>
            </div>

            <div className='md:mx-auto'>
              <FooterGroup heading={result.linkGroupTitle}>
                <nav>
                  <ul className='flex flex-col gap-2'>
                    {result.links.map(link => (
                      <li key={link.url} className='text-lg text-primary-text underline underline-offset-4'>
                        <Link href={link.url}>{link.caption}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </FooterGroup>
            </div>
          </div>

          <div className='flex flex-col gap-10 md:gap-24 md:flex-row xl:gap-8 xl:flex-col'>
            <FooterGroup heading={result.addressTitle}>
              <div>
                <p className='text-lg text-primary-text whitespace-pre-wrap'>{result.address}</p>
                <Link className='mt-4 flex items-center gap-2' href={result.addressMapUrl} target='_blank'>
                  <MapPinIcon className='size-6 text-primary-text' />
                  <p className='text-lg text-primary-text underline underline-offset-4'>{result.addressActionLabel}</p>
                </Link>
              </div>
            </FooterGroup>

            <FooterGroup heading={result.contactTitle}>
              <ul className='flex flex-col gap-2'>
                {result.contacts.map(contact => (
                  <li key={contact._key}>
                    <FooterContact contact={contact} />
                  </li>
                ))}
              </ul>
            </FooterGroup>
          </div>
        </div>
      </ContentContainer>

      <Separator className='w-full h-px border-bg mt-10 mb-6' />

      <ContentContainer>
        <div className='grid grid-rows-[auto_auto_auto] gap-y-3 items-center justify-center xl:grid-rows-1 xl:grid-cols-3'>
          <div className='row-start-3 flex items-center gap-2 mt-4 xl:row-start-1 xl:mt-0'>
            <div className='h-3'>
              <LogoWithText variant='on-brand' />
            </div>
            <FooterCopyrightCsr />
          </div>

          <ul className='row-start-1 flex gap-4 justify-center xl:row-start-1'>
            <li>
              <FooterSocialLink url={result.linkedinLink} icon={LinkedinLogoIcon} label='Linkedin' />
            </li>
            <li>
              <FooterSocialLink url={result.facebookLink} icon={FacebookLogoIcon} label='Facebook' />
            </li>
            <li>
              <FooterSocialLink url={result.instagramLink} icon={InstagramLogoIcon} label='Instagram' />
            </li>
          </ul>

          <ul className='row-start-2 flex gap-2 justify-center xl:row-start-1 xl:justify-end'>
            {FooterLegalLinks.map(link => (
              <li key={link.url}>
                <Link href={link.url} className='text-primary-text underline underline-offset-4 text-center text-sm'>
                  {link.caption}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentContainer>
    </footer>
  );
}

const FooterLegalLinks: Array<{ url: string; caption: string }> = [
  { url: '/privacy-policy', caption: 'Privacy Policy' },
  { url: '/terms-and-conditions', caption: 'Terms & Conditions' }
];
