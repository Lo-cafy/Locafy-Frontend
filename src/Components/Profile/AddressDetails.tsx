import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Save, Edit2, X, MapPin } from "lucide-react";
import { Alert } from "@/ui/AlertProps";
import { useProfile } from "@/hooks/useProfileStore";
import { AddressForm } from "./AddressForm";
import { useAddressDetails } from "@/hooks/useAddressDetails";
import { initialDataState } from "@/types/addressConstants";

interface AddressDetailsProps {
  isModal?: boolean;
  initialEdit?: boolean;
  onEditChange?: (editing: boolean) => void;
  onSaveSuccess?: () => void;
}

export default function AddressDetails({
  isModal = false,
  initialEdit = false,
  onEditChange,
  onSaveSuccess
}: AddressDetailsProps) {
  const { primaryAddress, refetch, loading: profileLoading } = useProfile();
  const [data, setData] = useState(initialDataState);
  const [edit, setEdit] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const {
    loading,
    err,
    success,
    errors,
    setErrors,
    setErr,
    submit: originalSubmit
  } = useAddressDetails(primaryAddress, refetch);
  
 useEffect(() => {
  if (profileLoading) return;

  setDataLoaded(true);

  if (primaryAddress) {
    // Fill data normally
    setData({
      addressType: primaryAddress.addressType || "home",
      addressTitle: primaryAddress.addressTitle || "",
      addressLine1: primaryAddress.addressLine1 || "",
      addressLine2: primaryAddress.addressLine2 || "",
      landmark: primaryAddress.landmark || "",
      postalCode: primaryAddress.postalCode || "",
      isPrimary: primaryAddress.isPrimary,
    });

    // ✅ Only allow initialEdit when address exists
    setEdit(initialEdit);
  } else {
    // ✅ No address → always start in edit mode
    setData(initialDataState);
    setEdit(true);
  }
}, [primaryAddress, profileLoading, initialEdit]);


  // Sync with parent's initialEdit only after data is loaded
  useEffect(() => {
    if (dataLoaded && initialEdit !== undefined) {
      setEdit(initialEdit);
    }
  }, [initialEdit, dataLoaded]);

  const handleEditChange = (newEditState: boolean) => {
    setEdit(newEditState);
    onEditChange?.(newEditState);
  };

  const change = (k: string, v: string | boolean) => {
    setData(p => ({ ...p, [k]: v }));
    if (errors[k]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[k];
        return updated;
      });
    }
  };

const handleSubmit = async () => {
  const ok = await originalSubmit(data);
  if (ok) {
    handleEditChange(false);
    onSaveSuccess?.();
  }
};


  const handleCancel = () => {
    if (primaryAddress) {
      setData({
        addressType: primaryAddress.addressType || "home",
        addressTitle: primaryAddress.addressTitle || "",
        addressLine1: primaryAddress.addressLine1 || "",
        addressLine2: primaryAddress.addressLine2 || "",
        landmark: primaryAddress.landmark || "",
        postalCode: primaryAddress.postalCode || "",
        isPrimary: primaryAddress.isPrimary,
      });
    } else setData(initialDataState);

    handleEditChange(false);
    setErr("");
    setErrors({});
  };

  // Loading skeleton
  if (profileLoading || !dataLoaded) {
    return (
      <Card className={!isModal ? "bg-white shadow-sm border p-6" : ""}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      </Card>
    );
  }

  const content = (
    <>
      {!isModal && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-emerald-600 mr-2" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Address Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                {primaryAddress ? "Manage your primary address" : "Add a new primary address"}
              </p>
            </div>
          </div>
          {!edit && primaryAddress && (
            <Button size="icon" onClick={() => handleEditChange(true)} variant="ghost">
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {success && <Alert type="success" message={success} />}
      {err && <Alert type="error" message={err} />}

      <AddressForm data={data} edit={edit} change={change} errors={errors} />

      {edit && (
        <div className="mt-8 pt-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel} disabled={loading} className="px-6">
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
            {loading ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Address</>}
          </Button>
        </div>
      )}
    </>
  );

  return isModal ? (
    <div className="space-y-6">{content}</div>
  ) : (
    <Card className="bg-white shadow-sm border p-6 relative">
      {content}
    </Card>
  );
}