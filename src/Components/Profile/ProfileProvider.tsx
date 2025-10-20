import { createContext, useContext, type ReactNode } from "react";
import { useProfile, type Address, type Phone, type UserProfile } from "./useProfile";

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
  primaryPhone: Phone | null;
  primaryAddress: Address | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const profileData = useProfile();

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }
  return context;
};

// Usage Example:
// Wrap your profile section with ProfileProvider
// 
// <ProfileProvider>
//   <ProfileCard />
//   <Personal />
//   <BankDetails />
//   <AddressDetails />
// </ProfileProvider>
//
// Then in any child component, use:
// const { profile, primaryPhone, primaryAddress, refetch } = useProfileContext();