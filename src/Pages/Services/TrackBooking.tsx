import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Calendar, Clock, MapPin, CheckCircle2, Truck, PackageOpen } from "lucide-react";

export default function TrackBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: any };
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Track Booking</h1>
          <Badge className="text-sm">{bookingId}</Badge>
        </div>

        <Card className="p-4 md:p-6 bg-white">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="text-lg font-semibold text-gray-900">{serviceName}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-700 text-sm">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-600" /><span>{date}</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" /><span>{time}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /><span className="truncate">{address}</span></div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const active = s.done || i === 2;
              return (
                <div key={s.key} className={`flex flex-col items-start sm:items-center gap-2 p-3 rounded-lg border ${active ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"}`}>
                  <Icon className={`w-5 h-5 ${active ? "text-emerald-600" : "text-gray-400"}`} />
                  <div className={`text-sm font-medium ${active ? "text-emerald-700" : "text-gray-600"}`}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <div className="text-gray-700">
            <div className="text-sm">Estimated Total</div>
            <div className="text-2xl font-bold text-emerald-700">${Number(total).toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/all-services")}>Back to Services</Button>
            <Button onClick={() => navigate("/user", { state: { tab: "bookings" } })} className="bg-emerald-600 text-white hover:bg-emerald-700">Go to My Bookings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
