import { useState, useEffect } from 'react';
import api from '@/Api/baseurl';

interface Address {
  id?: number;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  isPrimary?: boolean;
  // Additional fields used by AddressDetails
  addressType?: string;
  addressTitle?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  postalCode?: string;
}

interface PhoneNumber {
  id: number;
  phoneNumber: string;
  isPrimary: boolean;
}

interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  linkedin?: string;
  instagram?: string;
  addresses?: Address[];
  phoneNumbers?: PhoneNumber[];
  // Additional fields for ProfileHeader compatibility
  fullName?: string;
  avatarUrl?: string;
  isEmailVerified?: boolean;
  externalUserId?: string;
  createdAt?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/profile', { withCredentials: true });
      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to fetch profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refetch = () => {
    fetchProfile();
  };

  const primaryPhone = profile?.phoneNumbers?.find(p => p.isPrimary) || profile?.phoneNumbers?.[0];
  const primaryAddress = profile?.addresses?.find(a => a.isPrimary) || profile?.addresses?.[0];

  return {
    profile,
    loading,
    error,
    refetch,
    primaryPhone,
    primaryAddress
  };
}
