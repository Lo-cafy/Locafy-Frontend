import { Camera, Edit, MapPin, Calendar, Phone, Mail, type LucideIcon } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { ImageWithFallback } from "@/Components/fallback";

interface ProfileHeaderProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
  membershipLevel: string;
  kycStatus: string;
  onEdit: () => void;
  profileImg: string;
  handleProfileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getKYCStatusBadge: (status: string) => {
    class: string;
    icon: LucideIcon;
  };
}

export function ProfileHeader({
  name,
  email,
  phone,
  location,
  joinedDate,
  membershipLevel,
  kycStatus,
  onEdit,
  profileImg,
  handleProfileUpload,
  getKYCStatusBadge,
}: ProfileHeaderProps) {
  const kycBadge = getKYCStatusBadge(kycStatus);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative group shrink-0">
        <ImageWithFallback
          src={
            profileImg ||
            `https://ui-avatars.com/api/?name=${name}&size=200`
          }
          alt={name}
          className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform border-4 border-white"
        />
        <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg flex justify-center items-center cursor-pointer ring-2 ring-white">
          <Camera className="h-4 w-4 text-white" />
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleProfileUpload} 
          />
        </label>
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-3 gap-y-1 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <div className="flex items-center gap-2">
            <Badge className={kycBadge.class}>
              {kycBadge.icon && <kycBadge.icon className="h-4 w-4" />}
              {kycStatus}
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              {membershipLevel}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <span>Joined {joinedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-600" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-emerald-600" />
            <span>{email}</span>
          </div>
        </div>

        <Button 
          onClick={onEdit}
          variant="ghost" 
          size="sm" 
          className="mt-4"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
