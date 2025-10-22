import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Edit2, Save, X, Building2, CheckCircle, Globe } from "lucide-react";
import type { ProviderBusinessProfile } from "@/types/bussinessprofile";

interface Props {
  profile: ProviderBusinessProfile;
  isEdit: boolean;
  setIsEdit: (val: boolean) => void;
  handleSave: () => void;
  saving: boolean;
}

export default function BusinessProfileHeader({
  profile,
  isEdit,
  setIsEdit,
  handleSave,
  saving,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-900">
              {profile.businessName || "Your Business"}
            </h2>
            {profile.isBusinessVerified && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <CheckCircle className="h-3 w-3 mr-1" /> Verified
              </Badge>
            )}
          </div>
          <p className="text-gray-600 mb-2">{profile.businessType || "Business Type"}</p>
          {profile.websiteUrl && (
            <a
              href={profile.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <Globe className="h-4 w-4" /> Visit Website
            </a>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {isEdit ? (
          <>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-1" />
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEdit(false)}
              disabled={saving}
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            onClick={() => setIsEdit(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit2 className="h-4 w-4 mr-1" /> Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}
