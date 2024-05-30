// START NEW CODE
import { Skeleton } from '@bigcommerce/components/skeleton';
// END NEW CODE

const FaqsLoading = () => {
  return (
    <div>
      {/* START NEW CODE */}
      <Skeleton className="my-4 h-16" />
      <Skeleton className="my-4 h-16" />
      <Skeleton className="my-4 h-16" />
      {/* END NEW CODE */}
    </div>
  );
};

export default FaqsLoading;