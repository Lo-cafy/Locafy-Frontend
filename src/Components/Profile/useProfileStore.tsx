import { create } from 'zustand'; // Import zustand
import api from '@/Api/baseurl';

// --- Interfaces (No changes needed) ---

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

// --- Return type for the hook (No changes needed) ---

interface UseProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
  primaryPhone: Phone | null;
  primaryAddress: Address | null;
}

// --- Zustand Store Definition ---

interface ProfileStore {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const useProfileStore = create<ProfileStore>((set) => ({
  // Initial state
  profile: null,
  loading: true, // Set to true initially to match original useEffect behavior
  error: null,

  // Action to fetch the profile
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/users/me', { withCredentials: true });
      if (res.data.success) {
        set({ profile: res.data.data });
      } else {
        // Handle cases where API returns success: false
        set({ error: res.data.message || 'Failed to load profile' });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to load profile',
      });
      console.error('Profile fetch error:', err);
    } finally {
      set({ loading: false });
    }
  },

  // Action to partially update the profile in state
  updateProfile: (data: Partial<UserProfile>) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
    }));
  },
}));

// --- Trigger the initial fetch when the app loads ---
useProfileStore.getState().fetchProfile();

// --- Refactored useProfile Hook ---

export const useProfile = (): UseProfileReturn => {
  // Select state and actions from the Zustand store
  const { profile, loading, error, fetchProfile, updateProfile } =
    useProfileStore();

  // Calculate derived state (same as before)
  const primaryPhone = profile?.phones?.find((p) => p.isPrimary) || null;
  const primaryAddress = profile?.addresses?.find((a) => a.isPrimary) || null;

  // Return the same object structure as the original hook
  return {
    profile,
    loading,
    error,
    refetch: fetchProfile, // Map fetchProfile to refetch
    updateProfile,
    primaryPhone,
    primaryAddress,
  };
};

// --- Export types (No changes needed) ---

export type { UserProfile, Phone, Address };