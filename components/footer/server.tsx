import { getInitialData } from '~/client/queries/get-initial-data';
import { getFooterWebPages } from '~/client/queries/ae/get-web-pages-with-children';

import { BaseFooter } from './base';

export const Footer = async () => {
  const webPages = await getFooterWebPages();
  const { brands, categoryTree, storeSettings } = await getInitialData();

  return (
    <BaseFooter
      brands={brands}
      categoryTree={categoryTree}
      storeSettings={storeSettings}
      webPages={webPages}
    />
  );
};
