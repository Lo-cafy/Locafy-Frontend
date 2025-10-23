import { Camera, Edit, MapPin, Calendar, Shield, Phone, Mail } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { ImageWithFallback } from "@/Components/fallback";
import { getGenderLabel, formatDate } from "@/types/helpers";

interface ProfileHeaderProps {
  profile?: {
    fullName?: string;
    avatarUrl?: string;
    isEmailVerified?: boolean;
    externalUserId?: string;
    createdAt?: string;
    email?: string;
    gender?: string;
  };
  primaryAddress?: {
    addressLine1?: string;
  };
  primaryPhone?: {
    phoneNumber?: string;
  };
  onEdit: () => void;
  profileImg?: string;
  handleProfileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileHeader({
  profile,
  primaryAddress,
  primaryPhone,
  onEdit,
  profileImg,
  handleProfileUpload,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative group shrink-0">
        <ImageWithFallback
          src={
            profileImg ||
            profile?.avatarUrl ||
            `https://ui-avatars.com/api/?name=${profile?.fullName}&size=200`
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform border-4 border-white"
        />
        <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg flex justify-center items-center cursor-pointer ring-2 ring-white">
          <Camera className="h-4 w-4 text-white" />
          <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
        </label>
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-3 gap-y-1 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{profile?.fullName}</h1>
          {profile?.isEmailVerified && (
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1.5 py-1 px-2.5">
              <Shield className="h-4 w-4" /> Verified
            </Badge>
          )}
        </div>
        <p className="text-gray-600 mb-3">ID: {profile?.externalUserId}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 justify-center md:justify-start">
          {primaryAddress && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span>{primaryAddress.addressLine1}</span>
            </div>
          )}
          {profile?.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span>Joined {formatDate(profile.createdAt)}</span>
            </div>
          )}
          {primaryPhone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600" />
              <span>{primaryPhone.phoneNumber}</span>
            </div>
          )}
          {profile?.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-600" />
              <span>{profile.email}</span>
            </div>
          )}
          {profile?.gender && (
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>{getGenderLabel(profile.gender)}</span>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={onEdit}
        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center shrink-0 mt-4 md:mt-0 shadow-md"
      >
        <Edit className="h-4 w-4 mr-2" /> Edit Profile
      </Button>
    </div>
  );
}
