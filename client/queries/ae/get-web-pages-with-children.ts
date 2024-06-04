import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';

import { client } from '~/client';
import { graphql } from '~/client/generated';
import { ExistingResultType } from '~/client/util';

export type AvailableWebPages = ExistingResultType<typeof getFooterWebPages>;

export const GET_WEB_PAGES_WITH_CHILDREN_QUERY = /* GraphQL */ `
  query getHeaderWebPages {
    site {
      content {
        pages(filters: { isVisibleInNavigation: true }) {
          edges {
            node {
              ...WebPage
              ... on RawHtmlPage {
                path
              }
              ... on ContactPage {
                path
              }
              ... on NormalPage {
                path
              }
              ... on BlogIndexPage {
                path
              }
              ... on ExternalLinkPage {
                link
              }
            }
          }
        }
      }
    }
  }
`;

export const getWebPagesWithChildren = async () => {
  const query = graphql(GET_WEB_PAGES_WITH_CHILDREN_QUERY);

  const response = await client.fetch({
    document: query,
  });

  const { pages } = response.data.site.content;

  if (!pages.edges?.length) {
    return [];
  }
  const wepPagesAfterEdgesAndNodes = removeEdgesAndNodes(pages);

  const parentPages = wepPagesAfterEdgesAndNodes.filter(page => page.parentEntityId == null);
  const childPages = wepPagesAfterEdgesAndNodes.filter(page => page.parentEntityId !== null);

  const finalWebPages = parentPages.map(parentPage => {
    const children = childPages.filter(page => page.parentEntityId == parentPage.entityId);
    return {...parentPage, children}
  });

  return finalWebPages;
};


export const getHeaderWebPages = async () => {
  const query = graphql(GET_WEB_PAGES_WITH_CHILDREN_QUERY);

  const response = await client.fetch({
    document: query,
  });

  const { pages } = response.data.site.content;

  if (!pages.edges?.length) {
    return [];
  }
  const wepPagesAfterEdgesAndNodes = removeEdgesAndNodes(pages);

  const headerElement = wepPagesAfterEdgesAndNodes.filter(page => page.name == '--HEADER--');

  if (headerElement.length > 0) {
    const headerEntityId = headerElement[0]?.entityId;
    const parentPages = wepPagesAfterEdgesAndNodes.filter(page => page.parentEntityId == headerEntityId);
    const childPages = wepPagesAfterEdgesAndNodes.filter(page => page.parentEntityId !== null);
  
    const finalWebPages = parentPages.map(parentPage => {
      const children = childPages.filter(page => page.parentEntityId == parentPage.entityId);
      return {...parentPage, children}
    });
  
    return finalWebPages;
  } else {
    return [];
  }
};

export const getFooterWebPages = async () => {
  const query = graphql(GET_WEB_PAGES_WITH_CHILDREN_QUERY);

  const response = await client.fetch({
    document: query,
  });

  const { pages } = response.data.site.content;

  if (!pages.edges?.length) {
    return [];
  }

  const wepPagesAfterEdgesAndNodes = removeEdgesAndNodes(pages);
  const footerElement = wepPagesAfterEdgesAndNodes.filter(page => page.name == '--FOOTER--');
  if (footerElement.length > 0) {
    const footerEntityId = footerElement[0]?.entityId;
    const footerPages = wepPagesAfterEdgesAndNodes.filter(page => page.parentEntityId == footerEntityId);
    return footerPages;
  } else {
    return [];
  }
};