import { HOME_PAGE_DOCUMENT_ID } from './sanity-types';

export function getPageTitleFromId(pageId: string): string {
  if (pageId.startsWith('drafts.')) {
    pageId = pageId.replace('drafts.', '');
  }

  if (pageId === HOME_PAGE_DOCUMENT_ID) {
    return 'Homepage';
  }

  return 'Unknown Page';
}
