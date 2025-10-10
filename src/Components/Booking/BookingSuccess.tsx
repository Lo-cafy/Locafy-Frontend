import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-black mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">Your service has been successfully booked. You'll receive a confirmation email shortly.</p>
        <div className="space-y-3">
          <button 
            onClick={() => navigate("/user/dashboard")}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Track Booking
          </button>
          <button 
            onClick={() => navigate("/all-services")}
            className="w-full bg-white text-green-600 border border-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Book Another Service
          </button>
        </div>
      </div>
    </div>
  );
}


