import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Camera, Edit, ChevronRight, Shield, Bell, Settings, Briefcase, AlertCircle, CheckCircle } from "lucide-react";

interface ProfileSidebarProps {
  profile: any;
  profileImg: string;
  fullName: string;
  membershipLevel: string;
  kycStatus: 'not_started' | 'pending' | 'verified';
  tabs: Array<{ id: string; label: string; icon: any }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleProfileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBecomeProvider: () => void;
}

export default function ProfileSidebar({
  profile,
  profileImg,
  fullName,
  membershipLevel,
  kycStatus,
  tabs,
  activeTab,
  setActiveTab,
  handleProfileUpload,
  handleBecomeProvider
}: ProfileSidebarProps) {
  const quickActions = [
    { icon: Shield, label: "Security", color: "emerald" },
    { icon: Bell, label: "Notifications", color: "blue" },
    { icon: Settings, label: "Settings", color: "purple" }
  ];

  return (
    <div className="lg:col-span-3 space-y-4">
      {/* Profile Card */}
      <Card className="p-6 bg-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col items-center">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-lg">
              <img
                src={profileImg || profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=200&background=10b981&color=fff`}
                alt={fullName}
                className="w-full h-full rounded-full object-cover border-4 border-white"
              />
            </div>
            <label className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg flex items-center justify-center cursor-pointer ring-4 ring-white transition-all group-hover:scale-110">
              <Camera className="h-4 w-4 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
            </label>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">{fullName}</h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.isEmailVerified && (
              <Badge className="bg-emerald-100 text-emerald-700 border-0 px-3 py-1 text-xs">
                ✓ Verified
              </Badge>
            )}
            <Badge className="bg-blue-100 text-blue-700 border-0 px-3 py-1 text-xs">
              {membershipLevel}
            </Badge>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all mb-3"
            onClick={() => console.log("Edit profile")}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>

          {/* KYC Status */}
          {kycStatus === 'not_started' && (
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md"
              onClick={handleBecomeProvider}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Become a Provider
            </Button>
          )}

          {kycStatus === 'pending' && (
            <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 text-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-yellow-800">KYC Pending Review</p>
              <p className="text-xs text-yellow-600 mt-1">We'll notify you once verified</p>
            </div>
          )}

          {kycStatus === 'verified' && (
            <div className="w-full bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-green-800">KYC Verified</p>
              <p className="text-xs text-green-600 mt-1">You're now a provider!</p>
            </div>
          )}
        </div>
      </Card>

      {/* Navigation Tabs */}
      <Card className="p-3 bg-white shadow-lg rounded-2xl border-0">
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium flex-1 text-left text-sm">{tab.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
              </button>
            );
          })}
        </nav>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 bg-white shadow-lg rounded-2xl border-0">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  action.color === 'emerald' ? 'bg-emerald-100' :
                  action.color === 'blue' ? 'bg-blue-100' :
                  action.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    action.color === 'emerald' ? 'text-emerald-600' :
                    action.color === 'blue' ? 'text-blue-600' :
                    action.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}