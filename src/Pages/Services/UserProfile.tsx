import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  User,
  Calendar,
  Heart,
  Shield,
  CheckCircle,
  Clock,
  Star,
  Package,
  ArrowLeft
} from 'lucide-react';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import KYCVerification from '@/Components/Profile/KYCVerification';
import UserFavorites from '@/Components/Profile/UserFavorites';
import MyBookingsPage from './MyBookings';
import { EditProfileModal } from '@/Components/Profile/EditProfileModal';
import ProfileCard from '@/Components/Profile/ProfileCard';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  joinedDate: string;
  membershipLevel: 'Basic' | 'Premium' | 'Gold';
  stats: {
    totalBookings: number;
    completedServices: number;
    favorites: number;
    reviews: number;
  };
  kycStatus: 'verified' | 'pending' | 'not_verified';
}

// Dummy user data
const dummyUserData: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  avatar: '/api/placeholder/150/150',
  joinedDate: 'Jan 2024',
  membershipLevel: 'Premium',
  stats: {
    totalBookings: 12,
    completedServices: 8,
    favorites: 5,
    reviews: 6
  },
  kycStatus: 'verified'
};

export default function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfile>(dummyUserData);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSaveProfile = (updatedData: Pick<UserProfile, 'name' | 'email' | 'phone' | 'location' | 'avatar'>) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
    // Here you would typically make an API call to update the profile
    // Example: await updateUserProfile(updatedData);
  };

  // Handle tab navigation from state
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const getKYCStatusBadge = (status: string) => {
    const configs = {
      verified: { class: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { class: 'bg-yellow-100 text-yellow-800', icon: Clock },
      not_verified: { class: 'bg-gray-100 text-gray-800', icon: Shield }
    };
    return configs[status as keyof typeof configs] || configs.not_verified;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          
          {/* Profile Header */}
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            {/* FIX: Passed necessary props to ProfileCard.
              It needs userData to display, onEdit to open the modal,
              and the badge info since the logic is in this parent component.
            */}
            <ProfileCard
              userData={userData}
              onEdit={() => setIsEditingProfile(true)}
              getKYCStatusBadge={getKYCStatusBadge}
            />
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 p-6"> {/* Added p-6 for consistency */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.totalBookings}</p>
                </div>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.completedServices}</p>
                </div>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Heart className="w-5 h-5 text-red-500" />
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.favorites}</p>
                </div>
                <p className="text-sm text-gray-600">Favorites</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.reviews}</p>
                </div>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-6">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <User className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="bookings"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger
                value="kyc"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Shield className="w-4 h-4 mr-2" />
                KYC
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card className="bg-white border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/all-services')}
                      className="w-full bg-emerald-600 text-white hover:bg-emerald-700 justify-start"
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Browse Services
                    </Button>
                    <Button
                      onClick={() => setActiveTab('bookings')}
                      variant="outline"
                      className="w-full justify-start border-gray-300 hover:bg-gray-50"
                    >
                      <Calendar className="w-5 h-5 mr-3" />
                      View My Bookings
                    </Button>
                    <Button
                      onClick={() => setActiveTab('favorites')}
                      variant="outline"
                      className="w-full justify-start border-gray-300 hover:bg-gray-50"
                    >
                      <Heart className="w-5 h-5 mr-3" />
                      My Favorites
                    </Button>
                  </div>
                </Card>

                {/* Membership Benefits */}
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {userData.membershipLevel} Benefits
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Priority booking support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Exclusive discounts up to 20%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Free cancellation on select services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-sm text-gray-700">24/7 customer support</span>
                    </li>
                  </ul>
                  {userData.membershipLevel !== 'Gold' && (
                    <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white">
                      Upgrade to Gold
                    </Button>
                  )}
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-white border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Service Completed</p>
                      <p className="text-xs text-gray-600">Deep Home Cleaning - 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Added to Favorites</p>
                      <p className="text-xs text-gray-600">Expert Plumbing - 5 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* My Bookings Tab */}
            <TabsContent value="bookings">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <MyBookingsPage />
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <UserFavorites />
              </div>
            </TabsContent>

            {/* KYC Tab */}
            <TabsContent value="kyc">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <KYCVerification />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}