import { useMemo } from 'react';

import { AvailableWebPages, getFooterWebPages } from '~/client/queries/ae/get-web-pages-with-children';
import { ExistingResultType } from '~/client/util';

import { BaseFooterMenu } from './base-footer-menu';

const filterActivePages = (availableStorePages: AvailableWebPages) =>
  availableStorePages.reduce<Array<{ name: string; path: string }>>((visiblePages, currentPage) => {
    if (currentPage.isVisibleInNavigation) {
      const { name, __typename } = currentPage;

      visiblePages.push({
        name,
        path: __typename === 'ExternalLinkPage' ? currentPage.link : currentPage.path,
      });

      return visiblePages;
    }

    return visiblePages;
  }, []);

type WebPages = ExistingResultType<typeof getFooterWebPages>;

interface Props {
  webPages: WebPages;
}

export const WebPageFooterMenu = ({ webPages }: Props) => {
  const items = useMemo(() => filterActivePages(webPages), [webPages]);

  if (items.length > 0) {
    return <BaseFooterMenu items={items} title="About us" />;
  }

  return null;
};
