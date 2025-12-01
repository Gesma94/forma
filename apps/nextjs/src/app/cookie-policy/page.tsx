import type { Viewport } from 'next';
import { tv } from 'tailwind-variants';
import { Topbar } from '@/layout/topbar/topbar';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default async function Page() {
  const { h1Tv, h2Tv, pTv, innerListTv } = styleTv();
  return (
    <div>
      <Topbar variant='solid' />
      <ContentContainer>
        <div className='text-primary py-20'>
          <h1 className={h1Tv()}>Cookie Policy</h1>

          <div className='flex flex-col gap-16'>
            <div>
              <h2 className={h2Tv()}>Introduction</h2>
              <p className={pTv()}>
                We are pleased that you are visiting our website at www.for-ma.studio. Data protection and data security
                when using our website are very important to us. In this Cookie Policy we adhere to our obligations set
                out in Italy’s Data Protection Code (“DPC”) and the EU`s Privacy and Electronic Communications Directive
                (“PECD”) and inform you about the purposes for which we and our partners use cookies and similar
                technologies and how you can manage your preferences regarding cookies.
              </p>
            </div>

            <div>
              <h2 className={h2Tv()}>What are cookies?</h2>
              <p className={pTv()}>
                Cookies are small text files that are sent to your computer to ensure the technical functionality of the
                website. We use cookies in some areas of our website to make it easier for you to use the pages and to
                make them more personalized.
              </p>
              <p className={pTv({ class: 'mt-4' })}>
                When trying to understand cookies, it can help to know following terminology:
              </p>
              <ol className={innerListTv()}>
                <li>
                  <p className={pTv()}>
                    Essential or Necessary cookies. These cookies are essential or necessary to ensure that a website
                    works properly and is secure so that you can navigate a website and use its features. Without these
                    cookies, certain features of a website would not function, and thus you would not be able to use
                    certain services.
                  </p>
                </li>
                <li>
                  <p className={pTv()}>
                    Optional cookies. These cookies are non-essential for the website to function and require your
                    consent. When it comes to optional cookies the following distinctions are made:
                  </p>
                  <ol className={innerListTv()}>
                    <li>
                      <p className={pTv()}>
                        Functional cookies or sometimes called convenience cookies. These cookies allow a website to
                        remember the options a user has made (including user ID`s stored, consents given, or languages
                        selected) and other personalization options you have selected when browsing.
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        Analysis and performance cookies, which are used to monitor and improve the function and service
                        of a website. Those can track down problems when using a website, facilitate online surveys,
                        record visitor numbers, and provide analytics metrics.
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        Advertising cookies or targeting cookies. They are used to deliver customized advertising to the
                        user. This can be very convenient, but also very irritating.
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>

              <p className={pTv({ class: 'mt-8' })}>The above mentioned laws require:</p>
              <ol className={innerListTv()}>
                <li>
                  <p className={pTv()}>
                    to ask for your consent when using specific cookies (in particular any cookie that is not strictly
                    necessary for the operation of the website, for example, Functional cookies, Analysis and
                    performance cookies and Advertising cookies or targeting cookies “Optional cookies”); and
                  </p>
                </li>
                <li>
                  <p className={pTv()}>
                    to have a legal basis for the use of personal data in relation to cookies, the use of cookies would
                    then be your consent as well as our legitimate interest.
                  </p>
                </li>
              </ol>
            </div>

            <div>
              <h2 className={h2Tv()}>What cookies do we use?</h2>
              <p className={pTv()}>
                Our website only uses Essential or Necessary cookies for the purpose of securing the technical
                functionality and the recognition of errors and security relevant conspicuous features or to offer a
                service or functionality requested by you. Optional cookies and other cookies requiring your consent are
                not used on this site.
              </p>
            </div>

            <div>
              <h2 className={h2Tv()}>How to control cookies?</h2>
              <p className={pTv()}>
                You can set your web browser to disable cookies. Please note that most browsers offer different ways to
                protect your privacy. If you do not activate or deactivate certain cookies via the browser settings, it
                is possible that certain functionalities will not be available to you as expected.
              </p>
              <p className={pTv({ class: 'mt-4' })}>
                You can configure the use of cookies in your browser settings by following the relevant link{' '}
                <a href='https://support.google.com/chrome/answer/95647?hl=en-GB&co=GENIE.Platform%3DDesktop'>
                  Google Chrome
                </a>
                , <a href='https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox'>Mozilla Firefox</a>
                ,{' '}
                <a href='https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d'>
                  Microsoft Edge
                </a>
                , <a href='https://www.opera.com/use-cases/clean-browser-and-remove-trackers'>Opera</a>,{' '}
                <a href='https://support.apple.com/en-gb/HT201265'>Safari</a> at any time or deactivate them completely.
              </p>

              <p className={pTv({ class: 'mt-4' })}>
                Please note that if you disable cookies in this way, you will not be able to set new cookies. However,
                it will not prevent previously set cookies from continuing to work on your device until you clear all
                cookies in your browser settings.
              </p>
            </div>

            <div>
              <h2 className={h2Tv()}>Does this policy change?</h2>
              <p className={pTv()}>
                We may update our Privacy Policy from time to time. This might be for a number of reasons, such as to
                reflect a change in the law or to accommodate a change in our business practices and the way we use your
                Personal Data. We recommend that you check here periodically for any changes to our Privacy Policy. This
                Privacy Policy was last updated on Saturday, 02. December 2023.
              </p>
              <p className={pTv({ class: 'mt-8' })}>Still not found your answer?</p>
              <div className='flex mt-4 mr-auto'>
                <LinkButton href='/contact-us' variant='primary' surface='bg' size='large'>
                  Contact us
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}

const styleTv = tv({
  slots: {
    h1Tv: 'font-bold text-9xl mb-20',
    h2Tv: 'font-bold text-5xl mb-4',
    pTv: 'prose-xl',
    innerListTv: 'list-disc ml-8'
  }
});
