import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchBookings, setFilter } from '@/store/bookingStore';
import { BookingCard } from '@/Components/Booking';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import type { BookingStatus } from '@/types/booking.types';

export function Bookings() {
  const dispatch = useAppDispatch();
  const { bookings, loading} = useAppSelector((state) => state.bookings);
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');

  useEffect(() => {
    const status = activeTab === 'all' ? undefined : activeTab;
    dispatch(setFilter({ status }));
    dispatch(fetchBookings({ status }));
  }, [dispatch, activeTab]);

  const getBookingsByStatus = (status?: BookingStatus) => {
    if (!status) return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {getBookingsByStatus(activeTab === 'all' ? undefined : activeTab as BookingStatus).map((booking) => (
                <BookingCard key={booking.bookingId} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}