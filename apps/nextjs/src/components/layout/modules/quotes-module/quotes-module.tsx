import { isNotNil } from 'es-toolkit';
import type { QuotesModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
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
  const quotes = await runQuery(
    q.parameters<TSanityQueryParams>().star.filterByType('quoteDocumentType').filterRaw('_id in $quoteIds'),
    { parameters: { quoteIds: module.quotes.map(x => x._ref) } }
  );
  const quotesWithImages = quotes.map<TQuoteWithAvatarUrl>(quote => ({
    ...quote,
    authorAvatarUrl: getSanityImageUrl(quote.authorAvatar)
  }));

  return (
    <ModuleContentContainer title={module.heading} skipContentContainer={true}>
      <div className='px-16 md:px-24'>
        <QuotesCarousel quotes={quotesWithImages} hasTitle={isNotNil(module.heading)} />
      </div>
    </ModuleContentContainer>
  );
}
