import { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import api from "@/Api/baseurl";
import { Alert } from "@/ui/AlertProps";
import { Building2 } from "lucide-react";
import BusinessProfileHeader from "./BusinessProfileHeader";
import BusinessProfileStats from "./BusinessProfileStats";
import BusinessProfileForm from "./BusinessProfileForm";
import BusinessProfilePricing from "./BusinessProfilePricing";
import type { AlertState, ProviderBusinessProfile } from "@/types/bussinessprofile";

export default function BusinessProfileCard() {
  const [profile, setProfile] = useState<ProviderBusinessProfile | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/users/business/");
      setProfile(res.data);
    } catch {
      setAlert({
        show: true,
        type: "error",
        message: "Failed to load business profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof ProviderBusinessProfile, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put("/api/users/business", profile);
      setAlert({
        show: true,
        type: "success",
        message: "Profile updated successfully!",
      });
      setIsEdit(false);
      await fetchProfile();
    } catch {
      setAlert({
        show: true,
        type: "error",
        message: "Update failed, please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/60 border p-8 rounded-2xl animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="p-8 rounded-2xl text-center text-gray-500">
        <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No business profile found</p>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">
   <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />

      {alert?.show && (
        <div className="mb-6">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <BusinessProfileHeader
        profile={profile}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleSave={handleSave}
        saving={saving}
      />

      <BusinessProfileStats profile={profile} />

      <BusinessProfileForm
        profile={profile}
        isEdit={isEdit}
        onChange={handleChange}
      />

      {!isEdit && (
        <BusinessProfilePricing profile={profile} />
      )}
    </Card>
  );
}
