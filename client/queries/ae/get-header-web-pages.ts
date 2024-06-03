import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';

import { client } from '~/client';
import { graphql } from '~/client/generated';

export const GET_HEADER_WEB_PAGES_QUERY = /* GraphQL */ `
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

export const getHeaderWebPages = async () => {
  const query = graphql(GET_HEADER_WEB_PAGES_QUERY);

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
  
  console.log("finalWebPages", finalWebPages);

  return finalWebPages;
};
