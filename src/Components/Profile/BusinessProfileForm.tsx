import { Building2, Globe, DollarSign } from "lucide-react";
import { FormField } from "../../ui/formfield";
import type { ProviderBusinessProfile } from "@/types/bussinessprofile";

interface Props {
  profile: ProviderBusinessProfile;
  isEdit: boolean;
  onChange: (key: keyof ProviderBusinessProfile, value: string) => void;
}

export default function BusinessProfileForm({ profile, isEdit, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue-600" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Business Name" value={profile.businessName ?? ""} onChange={(v) => onChange("businessName", v)} isEdit={isEdit} />
          <FormField label="Business Type" value={profile.businessType ?? ""} onChange={(v) => onChange("businessType", v)} isEdit={isEdit} />
        </div>
      </div>

      <FormField label="Business Description" value={profile.businessDescription ?? ""} onChange={(v) => onChange("businessDescription", v)} isEdit={isEdit} />

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-blue-600" />
          Contact & Service Area
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Website URL" value={profile.websiteUrl ?? ""} onChange={(v) => onChange("websiteUrl", v)} isEdit={isEdit} />
          <FormField label="Service Radius (km)" value={profile.serviceRadiusKm?.toString() ?? ""} onChange={(v) => onChange("serviceRadiusKm", v)} isEdit={isEdit} type="tel" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-blue-600" />
          Pricing Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Base Service Rate" value={profile.baseServiceRate?.toString() ?? ""} onChange={(v) => onChange("baseServiceRate", v)} isEdit={isEdit} type="tel" />
          <FormField label="Currency Code" value={profile.currencyCode ?? ""} onChange={(v) => onChange("currencyCode", v)} isEdit={isEdit} placeholder="USD" />
        </div>
      </div>
    </div>
  );
}
