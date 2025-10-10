import { useState } from 'react';
import { CalendarCheck, Search, Inbox } from 'lucide-react';
import BookingCard, { type Booking } from '../../Components/ProviderDashboard/BookingCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Input } from '@/ui/input';



// Dummy Data for demonstration
const dummyBookings: Booking[] = [
  { id: 'BK001', service: 'Deep Home Cleaning', customer: 'Anjali Menon', date: 'Oct 15, 2025', time: '10:00 AM', status: 'Upcoming', amount: 150 },
  { id: 'BK002', service: 'Plumbing Repair', customer: 'John Doe', date: 'Oct 12, 2025', time: '02:30 PM', status: 'Upcoming', amount: 80 },
  { id: 'BK003', service: 'Garden Maintenance', customer: 'Priya Sharma', date: 'Sep 28, 2025', time: '09:00 AM', status: 'Completed', amount: 120 },
  { id: 'BK004', service: 'Electrical Wiring', customer: 'Robert Brown', date: 'Sep 25, 2025', time: '11:00 AM', status: 'Completed', amount: 250 },
  { id: 'BK005', service: 'Interior Painting', customer: 'Emily White', date: 'Sep 20, 2025', time: '01:00 PM', status: 'Cancelled', amount: 400 },
];

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter bookings based on search term
  const filteredBookings = dummyBookings.filter(b => 
    b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter bookings for tabs
  const upcomingBookings = filteredBookings.filter(b => b.status === 'Upcoming');
  const pastBookings = filteredBookings.filter(b => b.status !== 'Upcoming');

  // Component to show when no bookings are found
  const NoBookingsFound = () => (
    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
      <Inbox className="w-12 h-12 mx-auto text-gray-400 mb-2" />
      <p className="font-medium">No bookings found.</p>
      <p className="text-sm">There are no bookings matching your search.</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <CalendarCheck className="w-7 h-7 text-emerald-600" />
            My Bookings
          </h1>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <Input 
              placeholder="Search bookings..." 
              className="pl-10 bg-white border-gray-200 rounded-lg w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Tabs and Content */}
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 sm:w-fit bg-gray-200 rounded-lg p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-md">All</TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-md">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-md">Past</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="all">
              <div className="grid grid-cols-1 gap-6">
                {filteredBookings.length > 0 ? filteredBookings.map(b => <BookingCard key={b.id} booking={b} />) : <NoBookingsFound />}
              </div>
            </TabsContent>
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 gap-6">
                {upcomingBookings.length > 0 ? upcomingBookings.map(b => <BookingCard key={b.id} booking={b} />) : <NoBookingsFound />}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="grid grid-cols-1 gap-6">
                {pastBookings.length > 0 ? pastBookings.map(b => <BookingCard key={b.id} booking={b} />) : <NoBookingsFound />}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingsPage;

