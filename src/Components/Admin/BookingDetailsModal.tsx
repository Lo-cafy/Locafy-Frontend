import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import type { Booking } from "@/types/Bookings.types";
import { Calendar, Clock, MapPin, User, DollarSign, Phone } from "lucide-react";

interface BookingDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
}

export default function BookingDetailsModal({ open, onOpenChange, booking }: BookingDetailsModalProps) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white/85 backdrop-blur-xl rounded-2xl border border-white/60">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Booking Details</DialogTitle>
          <DialogDescription className="text-gray-600">ID #{booking.id}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold text-gray-900">{booking.serviceName}</div>
                <div className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                  <User className="w-4 h-4" />
                  <span>{booking.customerName}</span>
                </div>
              </div>
              <Badge>{booking.status}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-600" /><span>{booking.date}</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" /><span>{booking.time}</span></div>
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-600" /><span>${booking.amount.toFixed(2)}</span></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-gray-700">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /><span>{booking.location}</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500" /><span>+1 (000) 000-0000</span></div>
            </div>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
