import { useCategoryTree, useWebPages } from '~/providers/bc-data-provider';

import { BaseHeaderNav } from './base';

interface Props {
  className?: string;
  inCollapsedNav?: boolean;
}

export const HeaderNav = ({ className, inCollapsedNav }: Props) => {
  const categoryTree = useCategoryTree();
  const webPages = useWebPages();
  
  return (
    <BaseHeaderNav
      webPages={webPages}
      categoryTree={categoryTree}
      className={className}
      inCollapsedNav={inCollapsedNav}
    />
  );
};
