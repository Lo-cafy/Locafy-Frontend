import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { searchServices } from '@/store/serviceStore';
import { useDebounce } from '@/hooks/useDebounce';

export function useServices() {
  const dispatch = useAppDispatch();
  const { services, loading, error, hasMore, nextCursor, filters } = useAppSelector(
    (state) => state.services
  );
  
  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    dispatch(searchServices({ ...debouncedFilters, limit: 12 }));
  }, [dispatch, debouncedFilters]);

  const loadMore = () => {
    if (hasMore && nextCursor && !loading) {
      dispatch(searchServices({ 
        ...filters, 
        cursor: nextCursor, 
        limit: 12 
      }));
    }
  };

  return {
    services,
    loading,
    error,
    hasMore,
    loadMore,
  };
}