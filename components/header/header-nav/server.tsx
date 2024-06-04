import { getCategoryTree } from '~/client/queries/get-category-tree';
import { getHeaderWebPages } from '~/client/queries/ae/get-web-pages-with-children';

import { BaseHeaderNav } from './base';

interface Props {
  className?: string;
  inCollapsedNav?: boolean;
}

export const HeaderNav = async ({ className, inCollapsedNav }: Props) => {
  const categoryTree = await getCategoryTree();
  const webPages = await getHeaderWebPages();

  return (
    <BaseHeaderNav
      webPages={webPages}
      categoryTree={categoryTree}
      className={className}
      inCollapsedNav={inCollapsedNav}
    />
  );
};
