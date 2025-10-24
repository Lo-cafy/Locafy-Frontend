import { useState } from "react";
import { Card } from "../../ui/card";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSkills } from "./ProfileSkills";
import type { LucideIcon } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  joinedDate: string;
  membershipLevel: string;
  kycStatus: string;
  stats: {
    totalBookings: number;
    completedServices: number;
    favorites: number;
    reviews: number;
    linkedin?: string;
    instagram?: string;
  };
}

interface ProfileCardProps {
  userData?: UserProfile;
  onEdit?: () => void;
  getKYCStatusBadge?: (status: string) => {
    class: string;
    icon: LucideIcon;
  };
  skills?: string[];
}

export default function ProfileCard({ userData, onEdit, getKYCStatusBadge, skills }: ProfileCardProps) {
  // Provide safe defaults so consumers may render without passing all props
  const resolvedUser: UserProfile = userData ?? {
    name: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
    joinedDate: "",
    membershipLevel: "",
    stats: { totalBookings: 0, completedServices: 0, favorites: 0, reviews: 0 },
    kycStatus: "not_verified",
  };

  const resolvedGetKYC =
    getKYCStatusBadge ??
    ((() => ({ class: "bg-gray-100 text-gray-800", icon: (() => null) as unknown as LucideIcon })) as unknown as (status: string) => { class: string; icon: LucideIcon });

  const resolvedSkills = skills ?? ["Unknown"];

  const [profileImg, setProfileImg] = useState(resolvedUser.avatar || "");
  const [loading, setLoading] = useState(false);

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result as string);
        setLoading(false);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card className="bg-white/60 backdrop-blur-lg border border-white/30 p-6 sm:p-8 mb-8 relative shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-2xl">
      <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-green-500" />

      <ProfileHeader
        name={resolvedUser.name}
        email={resolvedUser.email}
        phone={resolvedUser.phone}
        location={resolvedUser.location}
        joinedDate={resolvedUser.joinedDate}
        membershipLevel={resolvedUser.membershipLevel}
        kycStatus={resolvedUser.kycStatus as string}
        onEdit={onEdit ?? (() => {})}
        profileImg={profileImg}
        handleProfileUpload={handleProfileUpload}
        getKYCStatusBadge={resolvedGetKYC}
      />

      <ProfileSkills skills={resolvedSkills} linkedin={resolvedUser.stats?.linkedin || ""} instagram={resolvedUser.stats?.instagram || ""} />
    </Card>
  );
}
