
import { User, Mail, Phone, MapPin, Calendar, Package, CheckCircle, Heart, Star } from "lucide-react";

interface OverviewTabProps {
  profile: any;
  primaryPhone: any;
  primaryAddress: any;
  stats: {
    totalBookings: number;
    completedServices: number;
    favorites: number;
    reviews: number;
  };
}

export default function OverviewTab({ profile, primaryPhone, primaryAddress, stats }: OverviewTabProps) {
  const joinedDate = profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          Personal Information
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">
            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                Email Address
              </label>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-900 font-medium break-all">{profile.email}</span>
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                Phone Number
              </label>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-900 font-medium">
                  {primaryPhone?.phoneNumber || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                Location
              </label>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-900 font-medium">
                  {primaryAddress ? `${primaryAddress.addressLine1}, ${primaryAddress.postalCode}` : "Not provided"}
                </span>
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                Member Since
              </label>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                <Calendar className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-900 font-medium">{joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 sm:p-5 border border-emerald-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalBookings}</div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Bookings</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-5 border border-green-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="text-2xl font-bold text-gray-900">{stats.completedServices}</div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 sm:p-5 border border-red-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div className="text-2xl font-bold text-gray-900">{stats.favorites}</div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Favorites</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 sm:p-5 border border-yellow-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-yellow-600 flex-shrink-0" />
            <div className="text-2xl font-bold text-gray-900">{stats.reviews}</div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Reviews</div>
        </div>
      </div>
    </div>
  );
}