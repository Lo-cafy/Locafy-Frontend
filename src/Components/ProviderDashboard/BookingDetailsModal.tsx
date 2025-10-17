 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Calendar, Clock, DollarSign, MapPin, Phone, User } from "lucide-react";
import type { Booking } from "./BookingCard";

interface BookingDetailsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	booking: Booking | null;
}

export default function BookingDetailsModal({ open, onOpenChange, booking }: BookingDetailsModalProps) {
	if (!booking) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-gray-800">Booking Details</DialogTitle>
					<DialogDescription className="text-gray-500">Detailed information for this booking.</DialogDescription>
				</DialogHeader>

				<div className="grid grid-cols-1 gap-4">
					<Card className="p-4 border-gray-200 bg-white/70">
						<div className="flex items-start justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-800">{booking.service}</h3>
								<div className="flex items-center gap-2 text-gray-600 mt-1 text-sm">
									<User className="w-4 h-4" />
									<span>{booking.customer}</span>
								</div>
							</div>
							<Badge className="text-xs">{booking.status}</Badge>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-emerald-600" />
								<span>{booking.date}</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="w-4 h-4 text-emerald-600" />
								<span>{booking.time}</span>
							</div>
							<div className="flex items-center gap-2">
								<DollarSign className="w-4 h-4 text-emerald-600" />
								<span>${booking.amount.toFixed(2)}</span>
							</div>
						</div>
					</Card>

					<Card className="p-4 border-gray-200 bg-white/70">
						<h4 className="font-semibold text-gray-800 mb-2">Customer Contact</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
							<div className="flex items-center gap-2">
								<Phone className="w-4 h-4 text-gray-500" />
								<span>(000) 000-0000</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4 text-gray-500" />
								<span>Address on file</span>
							</div>
						</div>
					</Card>

					<div className="flex justify-end gap-2">
						<Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
						{booking.status === "Upcoming" && (
							<Button className="bg-emerald-600 text-white hover:bg-emerald-700">Reschedule</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
