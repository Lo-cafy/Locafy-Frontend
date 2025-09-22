import type { Booking } from '@/types/booking.types';
import { Card, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">
              {booking.service?.title}
            </h3>
            <Badge className={statusColors[booking.status]}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-600">
              ₹{booking.totalAmount}
            </p>
            <p className="text-sm text-gray-500">
              Booking ID: {booking.bookingId.slice(0, 8)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(booking.bookingDate), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{booking.timeSlot}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{booking.service?.locationText}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span>
              {booking.service?.provider?.firstname} {booking.service?.provider?.lastname}
            </span>
          </div>
        </div>

        {booking.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">{booking.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          {booking.status === 'pending' && (
            <>
              <Button variant="outline" className="flex-1">
                Cancel Booking
              </Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                Contact Provider
              </Button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Contact Provider
            </Button>
          )}
          {booking.status === 'completed' && (
            <Button variant="outline" className="w-full">
              Write a Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}