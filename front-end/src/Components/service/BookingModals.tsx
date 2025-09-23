import { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { createBooking } from '@/store/bookingStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import type { ServiceDetailsResponse } from '@/types/service.types';
import { toast } from '@/ui/toast';

type BookingModalProps = {
  service: ServiceDetailsResponse;
  onClose: () => void;
};

export const BookingModals: React.FC<BookingModalProps> = ({ service, onClose }) => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    setLoading(true);
    try {
      await dispatch(createBooking({
        serviceId: service.serviceId,
        bookingDate: selectedDate,
        timeSlot: selectedTime,
        notes
      })).unwrap();
      
      toast.success('Booking confirmed successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-medium mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600">₹{service.price}</p>
          </div>

          <div>
            <Label>Select Date</Label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <Label>Select Time</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={selectedTime === time ? 'bg-emerald-600' : ''}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific requirements..."
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};