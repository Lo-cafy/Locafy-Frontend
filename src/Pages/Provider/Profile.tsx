import { useState } from "react";
import ProfileCard from "@/Components/Profile/ProfileCard";
import BusinessProfileCard from "@/Components/Profile/BusinessProfileCard";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { 
  User, MapPin, CreditCard, Shield, Calendar, Settings, 
  ChevronRight, CheckCircle, Clock 
} from "lucide-react";

import { useProfile } from "@/hooks/useProfileStore";
import PersonalModal from "@/Components/Profile/Modals/PersonalModalComponent";
import AddressModal from "@/Components/Profile/Modals/AddressModal";
import BankModal from "@/Components/Profile/Modals/BankModal";
import PreferenceModal from "@/Components/Profile/Modals/PreferenceModal";
import KYCModal from "@/Components/Profile/Modals/KYCModal";

type ModalType = "personal" | "address" | "bank" | "kyc" | "preference" | null;

export default function Profile() {
  const { profile, primaryAddress, primaryPhone } = useProfile();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const sections = [
    {
      id: "personal" as const,
      icon: User,
      title: "Personal Information",
      description: "Name, phone, date of birth",
      value: profile ? `${profile.fullName}` : "Not set",
      status: profile?.firstName ? "complete" : "incomplete",
      color: "emerald"
    },
    {
      id: "address" as const,
      icon: MapPin,
      title: "Address",
      description: "Primary address details",
      value: primaryAddress ? primaryAddress.addressLine1 : "Not set",
      status: primaryAddress ? "complete" : "incomplete",
      color: "blue"
    },
    {
      id: "bank" as const,
      icon: CreditCard,
      title: "Bank Account",
      description: "Payment details for payouts",
      value: "••••6789",
      status: "complete",
      color: "purple"
    },
    {
      id: "kyc" as const,
      icon: Shield,
      title: "KYC Verification",
      description: "Identity verification status",
      value: "Pending Review",
      status: "pending",
      color: "orange"
    },
    {
      id: "preference" as const,
      icon: Settings,
      title: "Preferences",
      description: "Availability & vacation settings",
      value: "Available",
      status: "complete",
      color: "indigo"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <ProfileCard />
        <BusinessProfileCard />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profile Complete</p>
                <p className="text-xl font-bold text-gray-900">80%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-xl font-bold text-gray-900">
                  {profile?.createdAt ? new Date(profile.createdAt).getFullYear() : "2025"}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">KYC Status</p>
                <p className="text-xl font-bold text-gray-900">Pending</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Sections */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="bg-white border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => setActiveModal(section.id)}
              >
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${section.color}-100 rounded-xl group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 text-${section.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                      <p className="text-sm text-gray-800 mt-1 font-medium">
                        {section.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {section.status === "complete" && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 rounded-full">
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-700">Complete</span>
                      </div>
                    )}
                    {section.status === "pending" && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full">
                        <Clock className="h-3 w-3 text-orange-600" />
                        <span className="text-xs font-medium text-orange-700">Pending</span>
                      </div>
                    )}
                    {section.status === "incomplete" && (
                      <div className="px-3 py-1 bg-gray-100 rounded-full">
                        <span className="text-xs font-medium text-gray-700">Not Set</span>
                      </div>
                    )}
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Modals */}
        {activeModal === "personal" && (
          <PersonalModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "address" && (
          <AddressModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "bank" && (
          <BankModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "kyc" && (
          <KYCModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "preference" && (
          <PreferenceModal onClose={() => setActiveModal(null)} />
        )}
      </div>
    </div>
  );
}