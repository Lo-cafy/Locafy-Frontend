import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import { 
  Eye, 
  MoreHorizontal,
  MessageSquare,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import type { Booking } from '@/types/Bookings.types';

interface BookingTableProps {
  bookings: Booking[];
  onView?: (booking: Booking) => void;
  onChat?: (booking: Booking) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, onView, onChat }) => {

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-600/20 text-green-300 border-green-400/30';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-300 border-yellow-400/30';
      case 'in-progress':
        return 'bg-blue-600/20 text-blue-300 border-blue-400/30';
      case 'cancelled':
        return 'bg-red-600/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-600/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700/50 bg-gray-800/30 backdrop-blur-xl">
      <Table>
        <TableHeader className="bg-gray-700/30">
          <TableRow className="hover:bg-gray-700/50 border-gray-700/50">
            <TableHead className="text-gray-300">Booking Details</TableHead>
            <TableHead className="text-gray-300">Service</TableHead>
            <TableHead className="text-gray-300">Schedule</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Payment</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow 
              key={booking.id} 
              className="hover:bg-gray-700/30 transition-colors border-gray-700/50"
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 border-2 border-gray-700/50">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {booking.customerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{booking.customerName}</div>
                    <div className="text-sm text-gray-400">#{booking.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-white">{booking.serviceName}</div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {booking.location}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    {booking.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {booking.time}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-white">${booking.amount}</div>
                  <Badge 
                    variant={booking.paymentStatus === 'paid' ? 'default' : 'destructive'}
                    className={booking.paymentStatus === 'paid' 
                      ? 'bg-green-600/20 text-green-300 border-green-400/30'
                      : 'bg-red-600/20 text-red-300 border-red-400/30'
                    }
                  >
                    {booking.paymentStatus}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    onClick={() => onView?.(booking)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    onClick={() => onChat?.(booking)}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50"
                    >
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                        Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                        Cancel Booking
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;