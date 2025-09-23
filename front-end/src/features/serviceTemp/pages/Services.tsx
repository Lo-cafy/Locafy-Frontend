import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { searchServices } from '@/store/serviceStore';
import { Navbar } from '@/Components/Layout/Navbar';
import { Footer } from '@/Components/Layout/Footer';
import { SearchBar } from '@/Components/Common/SearchBar';
import { FilterSidebar } from '@/Components/Common/FilterSidebar';
import { ServiceCard } from '@/Components/service/ServiceCard';
import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';
import { Filter } from 'lucide-react';

export function Services() {
  const dispatch = useAppDispatch();
  const { services, loading, error, hasMore, nextCursor, filters } = useAppSelector(
    (state) => state.services
  );
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    dispatch(searchServices({ ...filters, limit: 12 }));
  }, [dispatch, filters]);

  const loadMore = () => {
    if (hasMore && nextCursor && !loading) {
      dispatch(searchServices({ ...filters, cursor: nextCursor, limit: 12 }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Find Home Services Near You
          </h1>
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-10">
            <Button
              onClick={() => setShowMobileFilter(true)}
              className="bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg"
              size="lg"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Service Grid */}
          <main className="flex-1">
            {loading && services.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => dispatch(searchServices(filters))}>
                  Try Again
                </Button>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard key={service.serviceId} service={service} />
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={loadMore}
                      disabled={loading}
                      variant="outline"
                      size="lg"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="p-4 border-b">
              <Button
                variant="ghost"
                onClick={() => setShowMobileFilter(false)}
                className="ml-auto"
              >
                ✕
              </Button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}