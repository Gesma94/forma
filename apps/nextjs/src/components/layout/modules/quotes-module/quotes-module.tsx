import { MODULE_VARIANTS } from '@forma/common';
import type { QuotesModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';
import { QuotesCarousel } from './subs/quotes-carousel';
import type { TQuoteWithAvatarUrl } from './subs/types';

type TProps = {
  module: QuotesModuleDocumentType;
};

type TSanityQueryParams = {
  quoteIds: string[];
};

export async function QuotesModule({ module }: TProps) {
  const variant = MODULE_VARIANTS.ON_BG;
  const quotes = await runQuery(
    q.parameters<TSanityQueryParams>().star.filterByType('quoteDocumentType').filterRaw('_id in $quoteIds'),
    { parameters: { quoteIds: module.quotes.map(x => x._ref) } }
  );
  const quotesWithImages = quotes.map<TQuoteWithAvatarUrl>(quote => ({
    ...quote,
    authorAvatarUrl: getSanityImageUrl(quote.authorAvatar)
  }));

  return (
    <BackgroundVariantContainer variant={variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer title={module.heading} variant={variant} skipContentContainer={true}>
          <div className='px-16 md:px-24'>
            <QuotesCarousel quotes={quotesWithImages} />
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}
