import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Service
      </button>
      <h1 className="text-xl font-bold text-black">Book Service</h1>
      <div className="w-24"></div>
    </div>
  );
}


