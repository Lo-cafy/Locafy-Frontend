import { useState } from "react";
import { Card } from "../../ui/card";
import { useProfile } from "../../hooks/useProfileStore";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSkills } from "./ProfileSkills";
// import { EditProfileModal } from "./EditProfileModal"; // TODO: Fix props compatibility
import { ProfileSkeleton } from "./ProfileSkeleton";

export default function ProfileCard() {
  const { profile, loading, primaryPhone, primaryAddress } = useProfile();
  // const [isEditing, setIsEditing] = useState(false);
  const [skills] = useState(["React", "MERN", "UI/UX"]);
  const [profileImg, setProfileImg] = useState("");

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <>
      <Card className="bg-white/60 backdrop-blur-lg border border-white/30 p-6 sm:p-8 mb-8 relative shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-2xl">
        <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-green-500" />

        <ProfileHeader
          profile={profile || undefined}
          primaryAddress={primaryAddress}
          primaryPhone={primaryPhone}
          onEdit={() => console.log("Edit clicked")} // TODO: Implement edit functionality
          profileImg={profileImg}
          handleProfileUpload={handleProfileUpload}
        />

        <ProfileSkills skills={skills} linkedin={profile?.linkedin} instagram={profile?.instagram} />
      </Card>

      {/* TODO: Implement EditProfileModal with correct props */}
    </>
  );
}
