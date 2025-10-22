import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Save, Edit2, X, MapPin } from "lucide-react";
import { Alert } from "@/ui/AlertProps";
import { useProfile } from "../../hooks/useProfileStore";
import { AddressForm } from "./AddressForm";
import { useAddressDetails } from "../../hooks/useAddressDetails";
import { initialDataState } from "../../types/addressConstants";

export default function AddressDetails() {
  const { primaryAddress, refetch } = useProfile();
  const [data, setData] = useState(initialDataState);

  const {
    edit, setEdit, loading, err, success, errors, setErrors, setErr, submit
  } = useAddressDetails(primaryAddress, refetch);

  useEffect(() => {
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
      setEdit(false);
    } else {
      setData(initialDataState);
      setEdit(true);
    }
  }, [primaryAddress]);

  const change = (k: string, v: any) => {
    setData(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p: any) => ({ ...p, [k]: undefined }));
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

    setEdit(false);
    setErr("");
    setErrors({});
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">
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
          <Button size="icon" onClick={() => setEdit(true)} className="hover:bg-gray-100" variant="ghost">
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {success && <Alert type="success" message={success} />}
      {err && <Alert type="error" message={err} />}

      <AddressForm data={data} edit={edit} change={change} errors={errors} />

      {edit && (
        <div className="mt-8 pt-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel} disabled={loading} className="px-6">
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button onClick={() => submit(data)} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
            {loading ? 'Saving...' : <><Save className="h-4 w-4 mr-2" /> Save Address</>}
          </Button>
        </div>
      )}
    </Card>
  );
}
