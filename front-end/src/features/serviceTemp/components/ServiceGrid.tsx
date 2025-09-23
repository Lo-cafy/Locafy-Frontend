import { ServiceListing } from '@/types/service.types';
import { ServiceCard } from '@/Components/service/ServiceCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface ServiceGridProps {
  services: ServiceListing[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function ServiceGrid({ services, loading, hasMore, onLoadMore }: ServiceGridProps) {
  const loadMoreRef = useInfiniteScroll({
    onLoadMore,
    hasMore,
    loading,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.serviceId} service={service} />
        ))}
      </div>
      
      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10" />
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      )}
    </>
  );
}