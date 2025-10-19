import { useState } from 'react';
import { CalendarCheck, Search, Inbox, ArrowLeft, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Input } from '@/ui/input';
import { Badge } from '@/ui/badge';
import { Card } from '@/ui/card';

interface UserBooking {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'In Progress';
  amount: number;
  address: string;
  image?: string;
}

// Dummy Data for demonstration
const dummyUserBookings: UserBooking[] = [
  { 
    id: 'UB001', 
    serviceName: 'Deep Home Cleaning', 
    providerName: 'CleanPro Services', 
    date: 'Oct 20, 2025', 
    time: '10:00 AM', 
    status: 'Upcoming', 
    amount: 150,
    address: '123 Main St, Downtown',
    image: '/api/placeholder/300/200'
  },
  { 
    id: 'UB002', 
    serviceName: 'Plumbing Repair', 
    providerName: 'QuickFix Plumbers', 
    date: 'Oct 18, 2025', 
    time: '02:30 PM', 
    status: 'In Progress', 
    amount: 80,
    address: '456 Oak Ave, Midtown',
    image: '/api/placeholder/300/200'
  },
  { 
    id: 'UB003', 
    serviceName: 'Garden Maintenance', 
    providerName: 'Green Thumb Landscaping', 
    date: 'Oct 10, 2025', 
    time: '09:00 AM', 
    status: 'Completed', 
    amount: 120,
    address: '789 Pine St, Uptown',
    image: '/api/placeholder/300/200'
  },
  { 
    id: 'UB004', 
    serviceName: 'Electrical Wiring', 
    providerName: 'PowerLine Electricians', 
    date: 'Oct 5, 2025', 
    time: '11:00 AM', 
    status: 'Completed', 
    amount: 250,
    address: '321 Elm St, Westside',
    image: '/api/placeholder/300/200'
  },
  { 
    id: 'UB005', 
    serviceName: 'Interior Painting', 
    providerName: 'ColorCraft Painters', 
    date: 'Sep 28, 2025', 
    time: '01:00 PM', 
    status: 'Cancelled', 
    amount: 400,
    address: '654 Maple Dr, Eastside',
    image: '/api/placeholder/300/200'
  },
];

const UserBookingCard = ({ booking }: { booking: UserBooking }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Upcoming': return <Clock className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-32 sm:h-auto">
          <img 
            src={booking.image || '/api/placeholder/300/200'} 
            alt={booking.serviceName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{booking.serviceName}</h3>
                <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">by {booking.providerName}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {booking.date} at {booking.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {booking.address}
                </div>
              </div>
              
              <div className="text-xl font-bold text-green-600">
                ${booking.amount.toFixed(2)}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              {booking.status === 'Upcoming' || booking.status === 'In Progress' ? (
                <button
                  onClick={() => navigate(`/track-booking/${booking.id}`, { 
                    state: { 
                      booking: {
                        serviceName: booking.serviceName,
                        date: booking.date,
                        time: booking.time,
                        address: booking.address,
                        total: booking.amount
                      }
                    }
                  })}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Track Booking
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/services/${booking.id}`)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Book Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const MyBookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter bookings based on search term
  const filteredBookings = dummyUserBookings.filter(b => 
    b.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.providerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter bookings for tabs
  const upcomingBookings = filteredBookings.filter(b => b.status === 'Upcoming' || b.status === 'In Progress');
  const pastBookings = filteredBookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  // Component to show when no bookings are found
  const NoBookingsFound = () => (
    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
      <Inbox className="w-12 h-12 mx-auto text-gray-400 mb-2" />
      <p className="font-medium">No bookings found.</p>
      <p className="text-sm">There are no bookings matching your search.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <CalendarCheck className="w-8 h-8 text-green-600" />
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
        
        {/* Tabs and Content */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 sm:w-fit bg-gray-200 rounded-lg p-1 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-md">
              All ({filteredBookings.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-md">
              Active ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-md">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-6">
              {filteredBookings.length > 0 ? filteredBookings.map(b => <UserBookingCard key={b.id} booking={b} />) : <NoBookingsFound />}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 gap-6">
              {upcomingBookings.length > 0 ? upcomingBookings.map(b => <UserBookingCard key={b.id} booking={b} />) : <NoBookingsFound />}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 gap-6">
              {pastBookings.length > 0 ? pastBookings.map(b => <UserBookingCard key={b.id} booking={b} />) : <NoBookingsFound />}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyBookingsPage;
