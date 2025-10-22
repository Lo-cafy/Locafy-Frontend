import type { ProviderBusinessProfile } from "@/types/bussinessprofile";
import { DollarSign } from "lucide-react";

export default function BusinessProfilePricing({ profile }: { profile: ProviderBusinessProfile }) {
  if (!profile.baseServiceRate && !profile.currencyCode) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <DollarSign className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-xs text-gray-600">Base Service Rate</p>
          <p className="text-xl font-bold text-gray-900">
            {profile.currencyCode || "USD"} {profile.baseServiceRate || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
