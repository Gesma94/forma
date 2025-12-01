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
  const { h1Tv, h2Tv, h3Tv, pTv, innerListTv } = styleTv();
  return (
    <div>
      <Topbar variant='solid' />
      <ContentContainer>
        <div className='text-primary py-20'>
          <h1 className={h1Tv()}>Privacy Policy</h1>

          <div className='flex flex-col gap-16'>
            <div>
              <h2 className={h2Tv()}>Introduction</h2>
              <p className={pTv()}>We are pleased that you are visiting our website.</p>
              <p className={pTv()}>
                Data protection and data security when using our website are very important to us. In this Privacy
                Policy we adhere to our obligations set out in Italy’s Data Protection Code (“DPC”), and the EU's
                General Data Protection Regulation (“GDPR”) and inform you about which Personal Data we collect and
                process and for what purpose and of course about your rights and how you can assert them.
              </p>
            </div>

            <div>
              <h2 className={h2Tv()}>General Information</h2>

              <ol className='flex flex-col gap-8 list-decimal ml-7 marker:text-xl'>
                <li>
                  <h3 className={h3Tv()}>What is Personal Data?</h3>
                  <p className={pTv()}>
                    Personal data is information that makes it possible to identify a natural person. This includes in
                    particular, your name, date of birth, address, telephone number, e-mail address, but also your IP
                    address. Anonymous data exists if no personal reference to the user can be made.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>What is Processing?</h3>
                  <p className={pTv()}>"Processing" means and covers virtually any handling of data.</p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Who is responsible?</h3>
                  <p className={pTv()}>
                    The person responsible for the processing of Personal Data is For-ma Studio, 16128 Piazza Santa
                    Maria in via Lata, Genova, Liguria, Italy. Please read this Privacy Policy together with our Cookie
                    Policy and email info@for-ma.studio, or call +39 3496 802 353 if you have any questions.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Purpose and legal basis of processing</h3>
                  <p className={pTv()}>
                    In accordance with the DPC and the GDPR we need to have both a purpose and a legal basis to process
                    Personal Data. The purposes are:
                  </p>
                  <ol className={innerListTv()}>
                    <li>
                      <p className={pTv()}>
                        providing the website and their functions and contents, responding to contact requests and
                        communicating with our customers,
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>providing our services, and</p>
                    </li>
                    <li>
                      <p className={pTv()}>security measures.</p>
                    </li>
                  </ol>
                  <p className={pTv({ class: 'mt-4' })}>
                    Of course, we can only do that if we have at least one of the following legal bases or in other
                    words lawful reasons to do so. Unless specifically described below, we typically link the above
                    purposes to one of the following:
                  </p>
                  <ol className={innerListTv()}>
                    <li>
                      <p className={pTv()}>consent, to fulfill our services and carry out contractual obligations,</p>
                    </li>
                    <li>
                      <p className={pTv()}>to fulfill our legal obligations, and</p>
                    </li>
                    <li>
                      <p className={pTv()}>to protect our legitimate interests.</p>
                    </li>
                  </ol>
                </li>

                <li>
                  <h3 className={h3Tv()}>Data transfers</h3>
                  <p className={pTv()}>
                    In certain cases, it is necessary to transmit the processed Personal Data in the course of data
                    processing. In this respect, there are different recipient bodies and categories of recipients.
                  </p>
                  <ol className={innerListTv()}>
                    <li>
                      <p className={pTv()}>Service providers in the context of fulfillment processing</p>
                    </li>
                    <li>
                      <p className={pTv()}>Companies that provide marketing services,</p>
                    </li>
                    <li>
                      <p className={pTv()}>Service providers within the scope of providing our website, and</p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        State authorities and institutions as far as this is required or necessary.
                      </p>
                    </li>
                  </ol>
                  <p className={pTv({ class: 'mt-4' })}>
                    Our main operations are based in Italy and your Personal Data is generally processed, stored and
                    used within Italy. In some instances, your Personal Data may be processed outside Italy. If and when
                    this is the case, we take steps to ensure there is an appropriate level of security, so your
                    Personal Data is protected in the same way as if it was being used within Italy. Where we need to
                    transfer your data outside Italy, we will use approved standard contractual clauses in contracts for
                    the transfer of Personal Data to third countries.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Security</h3>
                  <p className={pTv()}>
                    In order to protect the data stored with us in the best possible way against accidental or
                    intentional manipulation, loss, destruction or access by unauthorized persons, we use appropriate
                    technical and organizational security measures. Our security levels are continuously reviewed in
                    cooperation with security experts and adapted to new security standards.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Storage and retention</h3>
                  <p className={pTv()}>
                    Your Personal Data will be stored by us only for as long as is necessary to achieve the purposes for
                    which the data was collected or - if statutory retention periods exist that go beyond this point and
                    for the duration of the legally prescribed retention period. We then delete your Personal Data. Only
                    in a few exceptional cases is your data be stored beyond this period, e.g., if storage is necessary
                    in connection with the enforcement of and defense against legal claims against us.
                  </p>
                </li>
              </ol>
            </div>

            <div>
              <h2 className={h2Tv()}>What Personal Data do we process?</h2>

              <ol className='flex flex-col gap-8 list-decimal ml-7 marker:text-xl'>
                <li>
                  <h3 className={h3Tv()}>Log files</h3>
                  <p className={pTv()}>
                    When you access our website, some access data is recorded automatically and stored in a log file on
                    our website's server. This means if you browse and simply have a look at our website, we process a)
                    the IP address of your computer, b) the date and time of your access, c) the name and URL of the
                    accessed file, d) the browser used, e) the amount of bytes transferred, f) the status of the page
                    request, g) the session ID and g) the referrer URL. The legal basis for processing is our legitimate
                    interest.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Hosting of our website</h3>
                  <p className={pTv()}>
                    We use the hosting services of MadeByShape for the purpose of hosting and displaying our website.
                    Wix does so on the basis of processing on our behalf, and that also means that all data collected on
                    our website is processed on MadeByShape's servers. The basis for processing is our legitimate
                    interest, and the initiation and/or fulfillment of a contract.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Content Management System</h3>
                  <p className={pTv()}>
                    We use the Content Management System (CMS) Craft by Pixel & Tonic, Inc. to publish and maintain the
                    created and edited content and texts on our website. This means that all content and texts submitted
                    to us is transferred to Craft. This represents a legitimate interest.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>MapBox</h3>
                  <p className={pTv()}>
                    We use MapBox API, a service of MapBox to visually display geographical information and map
                    functions. When you use the map functions, MapBox stores a cookie on your device which transfers
                    information about your use of our website, including your IP address, to a MapBox server. This data
                    is processed for the purpose of displaying the maps and ensuring the functionality of the map
                    functions. The basis for processing is our legitimate interest.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Vimeo Videos</h3>
                  <p className={pTv()}>
                    We have integrated video components from Vimeo. The integration requires that Vimeo can perceive
                    your IP address. This is a mere technical process and required to make the video components
                    available for viewing in your browser. The basis for processing is our legitimate interest.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Fonts</h3>
                  <p className={pTv()}>
                    We have integrated Fonts by Font Awesome of FonticonsInc. To enable the display of fonts, a
                    connection to Font Awesome’s server is established when our website is accessed. This enables
                    Fonticons to determine which website sent the request and to which IP address the display of the
                    font is to be transmitted. The integration is based on our legitimate interest.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Contact options</h3>
                  <p className={pTv()}>
                    If you contact us, we process the following data from you for the purpose of processing and handling
                    your request: first name, last name, e-mail address, and, if applicable, other information if you
                    have provided it, and your message. The legal basis for the data processing is our obligation to
                    fulfill the contract and/or to fulfill our pre-contractual obligations and/or our legitimate
                    interest in processing your request.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Social Media</h3>
                  <p className={pTv()}>
                    We are present on social media on the basis of our legitimate interests (Instagram, Facebook, and
                    LinkedIn). If you contact or connect with us via social media platforms, we and the relevant social
                    media platform are jointly responsible for the processing of your data and enter into a so-called
                    joint controller agreement. The legal basis is our legitimate interest, your consent or, in some
                    cases, the initiation of a contractual service, if any.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>When using our services</h3>
                  <p className={pTv()}>
                    We process the Personal Data involved in your use of our services in order to be able to provide our
                    contractual services. This includes in particular our support, correspondence with you, invoicing,
                    and fulfillment of our contractual, accounting and tax obligations. Accordingly, the data is
                    processed on the basis of fulfilling our contractual obligations and our legal obligations.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>
                    Administration, financial accounting, office organization, contact management
                  </h3>
                  <p className={pTv()}>
                    We process data in the context of administrative tasks as well as the organization of our business,
                    and compliance with legal obligations, such as archiving. In this regard, we process the same data
                    that we process in the course of providing our contractual services. The processing bases are our
                    legal obligations and our legitimate interests.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Direct marketing in the context of a customer relationship</h3>
                  <p className={pTv()}>
                    Insofar as you have also given us separate consent to process your data for marketing and
                    advertising purposes, We are entitled to contact you for these purposes via the communication
                    channels you have ticked in this consent.
                  </p>
                </li>
              </ol>
            </div>

            <div>
              <h2 className={h2Tv()}>Your Rights and Privileges</h2>

              <ol className='flex flex-col gap-8 list-decimal ml-7 marker:text-xl'>
                <li>
                  <h3 className={h3Tv()}>Privacy rights</h3>
                  <p className={pTv()}>Under the DPC and GDPR, you can exercise the following rights:</p>
                  <ol className={innerListTv()}>
                    <li>
                      <p className={pTv()}>
                        The right to access – You have the right to request copies of your Personal Data. We may charge
                        you a small fee for this service.
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        The right to rectification – You have the right to request that we correct any information you
                        believe is inaccurate. You also have the right to request us to complete the information you
                        believe is incomplete.
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        The right to erasure – You have the right to request that we erase your Personal Data, under
                        certain conditions.
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        The right to restrict processing – You have the right to request that we restrict the processing
                        of your Personal Data, under certain conditions.
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        The right to object to processing – You have the right to object to our processing of your
                        Personal Data, under certain conditions.
                      </p>
                    </li>
                    <li>
                      <p className={pTv()}>
                        The right to data portability – You have the right to request that we transfer the data that we
                        have collected to another organization, or directly to you, under certain conditions.
                      </p>
                    </li>
                  </ol>
                  <p className={pTv({ class: 'mt-4' })}>If you have any questions, please contact us.</p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Updating your information</h3>
                  <p className={pTv()}>
                    If you believe that the information we hold about you is inaccurate or request its rectification,
                    deletion, or object to its processing, please do so by contacting us.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Withdrawing your consent</h3>
                  <p className={pTv()}>You can withdraw consent you have given at any time by contacting us.</p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Access Request</h3>
                  <p className={pTv()}>
                    In the event you want to make a Data Subject Access Request, please contact us. We will respond to
                    requests regarding access and correction as soon as reasonably possible. Should we not be able to
                    respond to your request within thirty (30) days, we will tell you why and when we will be able to
                    respond to your request. If we are unable to provide you with any Personal Data or to make a
                    correction requested by you, we will tell you why.
                  </p>
                </li>

                <li>
                  <h3 className={h3Tv()}>Complaint to a supervisory authority</h3>
                  <p className={pTv()}>
                    You have the right to complain about our processing of Personal Data to a supervisory authority
                    responsible for data protection. The supervisory authority in Italy is the Italian Data Protection
                    Authority, Garante per la protezione dei dati personal, Piazza Venezia 11, 00187 Rome,
                    (www.garanteprivacy.it). However, we would appreciate the opportunity to address your concerns
                    before you contact the Garante per la protezione dei dati personal or any other supervisory
                    authority.
                  </p>
                </li>
              </ol>
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
    h3Tv: 'italic text-2xl',
    pTv: 'prose-xl',
    innerListTv: 'list-disc ml-8'
  }
});
