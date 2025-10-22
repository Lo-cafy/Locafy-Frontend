import type { ProviderBusinessProfile } from "@/types/bussinessprofile";
import { Star, Users, TrendingUp, MapPin } from "lucide-react";

export default function BusinessProfileStats({ profile }: { profile: ProviderBusinessProfile }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-bold text-gray-900">
            {profile.averageRating?.toFixed(1) || "0.0"}
          </span>
        </div>
        <p className="text-xs text-gray-600">{profile.totalReviews || 0} Reviews</p>
      </div>

      <div className="text-center">
        <Users className="h-4 w-4 mx-auto text-blue-600 mb-1" />
        <p className="text-2xl font-bold text-gray-900">{profile.totalBookings || 0}</p>
        <p className="text-xs text-gray-600">Bookings</p>
      </div>

      <div className="text-center">
        <TrendingUp className="h-4 w-4 mx-auto text-green-600 mb-1" />
        <p className="text-2xl font-bold text-gray-900">{profile.completionRate || 0}%</p>
        <p className="text-xs text-gray-600">Completion</p>
      </div>

      <div className="text-center">
        <MapPin className="h-4 w-4 mx-auto text-purple-600 mb-1" />
        <p className="text-2xl font-bold text-gray-900">{profile.serviceRadiusKm || 0}</p>
        <p className="text-xs text-gray-600">km Radius</p>
      </div>
    </div>
  );
}
