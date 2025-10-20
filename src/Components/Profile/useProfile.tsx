import { useState, useEffect } from "react";
import api from "@/Api/baseurl";

interface Phone {
  phoneId: number;
  phoneNumber: string;
  countryId: string | null;
  phoneType: string;
  isPrimary: boolean;
  isVerified: boolean;
  isWhatsappEnabled: boolean;
}

interface Address {
  addressId: number;
  addressType: string;
  addressTitle: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  areaId: string | null;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt: string | null;
  deliveryInstructions: string | null;
  accessInstructions: string | null;
  accessibilityNotes: string | null;
}

interface UserProfile {
  userId: number;
  externalUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  businessName: string | null;
  serviceRate: number | null;
  phones: Phone[];
  addresses: Address[];
}

interface UseProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
  primaryPhone: Phone | null;
  primaryAddress: Address | null;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/users/me",{withCredentials:true});
      if (res.data.success) {
        setProfile(res.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load profile");
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = (data: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...data });
    }
  };

  const primaryPhone = profile?.phones?.find(p => p.isPrimary) || null;
  const primaryAddress = profile?.addresses?.find(a => a.isPrimary) || null;

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
    primaryPhone,
    primaryAddress
  };
};

export type { UserProfile, Phone, Address };