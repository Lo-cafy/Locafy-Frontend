// src/Components/Dashboard/BookingCard.tsx
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Calendar, Clock, DollarSign, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import ChatModal from "./ChatModal";

// Define the structure of a booking
export interface Booking {
	id: string;
	service: string;
	customer: string;
	date: string;
	time: string;
	status: "Completed" | "Upcoming" | "Cancelled";
	amount: number;
}

interface BookingCardProps {
	booking: Booking;
}

// Function to get the right color for the status badge
const getStatusStyles = (status: Booking['status']) => {
	switch (status) {
		case "Completed":
			return "bg-green-100 text-green-800 border-green-200";
		case "Upcoming":
			return "bg-blue-100 text-blue-800 border-blue-200";
		case "Cancelled":
			return "bg-red-100 text-red-800 border-red-200";
	}
};

export default function BookingCard({ booking }: BookingCardProps) {
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [chatOpen, setChatOpen] = useState(false);

	return (
		// A clean, simple card design
		<Card className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
			
			{/* Top Section: Service and Status */}
			<div className="flex justify-between items-start mb-3">
				<div>
					<h3 className="font-bold text-gray-800 text-md sm:text-lg">{booking.service}</h3>
					<div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
						<User className="w-4 h-4" />
						<span>{booking.customer}</span>
					</div>
				</div>
				<Badge className={`text-xs font-semibold py-1 px-2 ${getStatusStyles(booking.status)}`}>
					{booking.status}
				</Badge>
			</div>
			
			{/* Middle Section: Date, Time, and Amount */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600 py-3 border-t border-gray-100">
				<div className="flex items-center gap-3 mb-2 sm:mb-0">
					<div className="flex items-center gap-1.5">
						<Calendar className="w-4 h-4 text-emerald-600" /> 
						<span>{booking.date}</span>
					</div>
					<div className="flex items-center gap-1.5">
						<Clock className="w-4 h-4 text-emerald-600" />
						<span>{booking.time}</span>
					</div>
				</div>
				<div className="flex items-center gap-1 font-semibold text-md text-emerald-700">
					<DollarSign className="w-4 h-4" /> 
					<span>{booking.amount.toFixed(2)}</span>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-end gap-2 mt-2">
				<Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100" onClick={() => setChatOpen(true)}>
					<MessageSquare className="w-4 h-4 mr-1" /> Chat
				</Button>
				<Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100" onClick={() => setDetailsOpen(true)}>View Details</Button>
				{booking.status === 'Upcoming' && <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">Reschedule</Button>}
			</div>

			<BookingDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} booking={booking} />
			<ChatModal open={chatOpen} onOpenChange={setChatOpen} booking={booking} />
		</Card>
	);
}
