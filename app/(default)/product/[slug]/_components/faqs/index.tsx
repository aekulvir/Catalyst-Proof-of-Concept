import { getProductFaqMetafields } from '~/client/queries/get-product-faq-metafields';
import ProductFaqs from '~/components/product-faqs';

const Faqs = async ({ productId }: { productId: number }) => {
  // START NEW CODE
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(2000);
  // END NEW CODE
  
  const limit = 2;

  const faqData = await getProductFaqMetafields(productId, limit);

  return <ProductFaqs 
    faqData={faqData} 
    limit={limit} 
    loadMoreLabel='Load More'
    productId={productId}
  />;
};

export default Faqs;