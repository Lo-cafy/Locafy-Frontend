import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Calendar, Clock, MapPin, CheckCircle2, Truck, PackageOpen } from "lucide-react";

interface BookingState {
  booking?: {
    serviceName: string;
    date: string;
    time: string;
    address: string;
    total: number;
  };
}

export default function TrackBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: BookingState };
  const booking = state?.booking;

  const steps = useMemo(() => [
    { key: "placed", label: "Booking Placed", done: true, icon: CheckCircle2 },
    { key: "assigned", label: "Provider Assigned", done: true, icon: Truck },
    { key: "enroute", label: "Professional En Route", done: false, icon: Truck },
    { key: "inprogress", label: "Service In Progress", done: false, icon: PackageOpen },
    { key: "completed", label: "Completed", done: false, icon: CheckCircle2 },
  ], []);

  const serviceName = booking?.serviceName || "Your Service";
  const date = booking?.date || "TBD";
  const time = booking?.time || "TBD";
  const address = booking?.address || "Saved address";
  const total = booking?.total ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-emerald-900">Track Your Booking</h1>
            <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 text-sm font-semibold rounded-full">#{bookingId}</Badge>
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-lg">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="text-2xl font-bold text-emerald-900">{serviceName}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-emerald-700">
                <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-xl">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">{date}</span>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-xl">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">{time}</span>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-xl">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium truncate">{address}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-lg">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-emerald-900 mb-6">Booking Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = s.done || i === 2;
                return (
                  <div key={s.key} className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 ${active ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 shadow-md" : "bg-gray-50 border border-gray-200"}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${active ? "bg-emerald-600 shadow-lg" : "bg-gray-300"}`}>
                      <Icon className={`w-6 h-6 ${active ? "text-white" : "text-gray-500"}`} />
                    </div>
                    <div className={`text-sm font-semibold text-center ${active ? "text-emerald-800" : "text-gray-600"}`}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="text-sm text-emerald-600 font-medium mb-1">Total Amount</div>
              <div className="text-3xl font-bold text-emerald-700">${Number(total).toFixed(2)}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => navigate("/all-services")}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Back to Services
              </Button>
              <Button 
                onClick={() => navigate("/user", { state: { tab: "bookings" } })} 
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                My Bookings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
