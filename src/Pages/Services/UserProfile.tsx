import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressDetails from "@/Components/Profile/AddressDetails";
import PaymentDetails from "@/Components/Profile/BankDetails";
import UPIDtails from "@/Components/Profile/UPIDtails";
import { useProfile } from "@/hooks/useProfileStore";
import { Home, Landmark, CreditCard, User, ArrowLeft } from "lucide-react";
import { Card } from "@/ui/card";
import OverviewTab from "@/Components/Profile/UserProfile/OverViwTab";
import ConfirmProviderModal from "@/Components/Profile/UserProfile/ConfirmProviderModel";
import KYCModal from "@/Components/Profile/UserProfile/KycModal";
import ProfileSidebar from "@/Components/Profile/UserProfile/ProfileSideBar";
import UserProfileHeader from "@/Components/Profile/UserProfile/UserProfileHeader";
import { Navbar } from "@/Components/Navbar";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import LiveCameraCapture from "@/Components/Profile/UserProfile/LiveCamaraCapture";
import { useKYC } from "@/hooks/useKYC";

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

interface EnhancedUserProfileSectionProps {
  userData?: UserProfile;
}

export default function EnhancedUserProfileSection({ userData }: EnhancedUserProfileSectionProps) {
  const navigate = useNavigate();
  const { profile, loading: profileLoading, error: profileError, primaryPhone, primaryAddress } = useProfile();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileImg, setProfileImg] = useState(profile?.avatarUrl || "");

  // Avatar upload hook
  const { uploadAvatar } = useAvatarUpload({
    onSuccess: () => console.log("Avatar uploaded successfully"), 
    onError: (msg) => console.error(msg),
  });

  // Provider request & KYC states
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const {
    // Submission Data
    submission,
    // loading: kycLoading,
    // error: kycError,

    // Modal State
    showKYCModal,
    setShowKYCModal,
    showCamera,
    setShowCamera,

    // Form Data
    kycData,
    setKycData,

    // Handlers
    handleFileChange,
    handleCameraCapture,
    handleKYCSubmit,
    openCamera,

    // Submission Status
    isSubmitting,
    submitStatus,
    errorMessage
  } = useKYC();

  // Handle profile image selection & upload
  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);

      uploadAvatar(e);
    }
  };

  const handleBecomeProvider = () => setShowConfirmModal(true);
  
  const handleConfirmProvider = () => {
    setShowConfirmModal(false);
    setShowKYCModal(true);
  };

  // Determine KYC status from submission - map to ProfileSidebar expected values
  const kycStatus: 'verified' | 'pending' | 'not_started' = submission 
    ? (submission.status === 'Verified' ? 'verified' 
      : submission.status === 'Pending' ? 'pending' 
      : 'not_started')
    : 'not_started';

  if (profileLoading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="text-gray-500 text-lg">Loading profile...</div>
      </div>
    </div>
  );

  if (profileError) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="text-center text-red-500 bg-red-50 border border-red-200 rounded-xl p-6">
          {profileError}
        </div>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-xl p-6">
          No profile data available
        </div>
      </div>
    </div>
  );

  const fullName = profile.fullName || `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
  const stats = userData?.stats || { totalBookings: 0, completedServices: 0, favorites: 0, reviews: 0 };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "address", label: "Address", icon: Home },
    { id: "bank", label: "Bank Details", icon: Landmark },
    { id: "upi", label: "UPI", icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 min-h-[calc(100vh-64px)]">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>

          <UserProfileHeader 
            fullName={fullName}
            avatarUrl={profileImg || profile.avatarUrl}
            isVerified={profile.isEmailVerified}
            membershipLevel={userData?.membershipLevel || "Basic"}
          />

          <div className="grid lg:grid-cols-12 gap-6">
            <ProfileSidebar
              profile={profile}
              profileImg={profileImg}
              fullName={fullName}
              membershipLevel={userData?.membershipLevel || "Basic"}
              kycStatus={kycStatus}
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleProfileUpload={handleProfileUpload}
              handleBecomeProvider={handleBecomeProvider}
            />

            <div className="lg:col-span-9">
              <Card className="bg-white shadow-xl rounded-2xl border-0 overflow-hidden">
                <div className="h-20 sm:h-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute top-5 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="p-4 sm:p-8 -mt-10 relative">
                  {activeTab === "overview" && (
                    <OverviewTab
                      profile={profile}
                      primaryPhone={primaryPhone}
                      primaryAddress={primaryAddress}
                      stats={stats}
                    />
                  )}
                  {activeTab === "address" && <AddressDetails />}
                  {activeTab === "bank" && <PaymentDetails />}
                  {activeTab === "upi" && <UPIDtails />}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmProviderModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        handleConfirmProvider={handleConfirmProvider}
      />

      <KYCModal
        showKYCModal={showKYCModal}
        setShowKYCModal={setShowKYCModal}
        kycData={kycData}
        setKycData={setKycData}
        handleKYCSubmit={handleKYCSubmit}
        handleFileChange={handleFileChange}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        errorMessage={errorMessage}
        onOpenCamera={openCamera}
      />

      {/* Camera Capture Modal */}
      {showCamera && (
        <LiveCameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}