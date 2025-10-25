import { User, Sparkles, Shield, CheckCircle } from "lucide-react";

interface UserProfileHeaderProps {
  fullName?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  membershipLevel?: 'Basic' | 'Premium' | 'Gold';
}

export default function UserProfileHeader({ 
  fullName = "User",
  avatarUrl,
  isVerified = false,
  membershipLevel = "Basic"
}: UserProfileHeaderProps) {
  
  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'Gold':
        return 'from-yellow-500 to-amber-500';
      case 'Premium':
        return 'from-purple-500 to-indigo-500';
      default:
        return 'from-emerald-500 to-teal-600';
    }
  };

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-green-500/10 rounded-3xl blur-3xl animate-pulse-slow"></div>
     
      {/* Floating Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-16 h-16 bg-emerald-400/20 rounded-full blur-2xl animate-float hidden sm:block"></div>
      <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-teal-400/20 rounded-full blur-2xl animate-float-delayed hidden sm:block"></div>
     
      {/* Main Content */}
      <div className="relative text-center py-6 px-4">
        {/* User Avatar Badge */}
        <div className="inline-flex items-center justify-center mb-3 animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${getMembershipColor(membershipLevel)} rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-white`}>
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              )}
            </div>
            
            {/* Verified Badge */}
            {isVerified ? (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" fill="currentColor" />
              </div>
            ) : (
              <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md animate-bounce">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-900" />
              </div>
            )}
          </div>
        </div>

        {/* Personalized Greeting */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1 animate-fade-in-up">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent animate-gradient">
            Welcome back, {fullName}!
          </span>
        </h1>

        {/* Membership Badge */}
        <div className="inline-flex items-center gap-2 mb-3 animate-fade-in-up animation-delay-100">
          <div className={`px-3 py-1 bg-gradient-to-r ${getMembershipColor(membershipLevel)} rounded-full`}>
            <span className="text-xs font-bold text-white">{membershipLevel} Member</span>
          </div>
        </div>
        
        {/* Subtitle with Icon */}
        <div className="flex items-center justify-center gap-2 text-gray-600 text-sm sm:text-base animate-fade-in-up animation-delay-200 mb-4">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
          <p className="font-medium">
            Manage your personal information and preferences
          </p>
        </div>
        
        {/* Decorative Line */}
        <div className="flex justify-center animate-fade-in-up animation-delay-300 mb-4">
          <div className="h-0.5 sm:h-1 w-20 sm:w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-in-up animation-delay-400">
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-default">
            <span className="text-xs font-semibold text-emerald-700">🔒 Secure</span>
          </div>
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-default">
            <span className="text-xs font-semibold text-teal-700">⚡ Fast</span>
          </div>
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-default">
            <span className="text-xs font-semibold text-green-700">✨ Easy</span>
          </div>
        </div>
      </div>
    </div>
  );
}