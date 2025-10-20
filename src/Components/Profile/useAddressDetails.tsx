import { useState } from "react";
import api from "@/Api/baseurl";

export function useAddressDetails(primaryAddress: any, refetch: () => void) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<any>({});

  const validate = (data: any) => {
    const e: any = {};
    if (!data.addressLine1 || data.addressLine1.length < 5 || data.addressLine1.length > 200) {
      e.addressLine1 = "Address line 1 must be between 5 and 200 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (data: any) => {
    setErr("");
    setSuccess("");
    if (!validate(data)) return setErr("Please fix validation errors");

    setLoading(true);
    try {
      const payload = { ...data };
      let res;

      if (primaryAddress?.addressId) {
        res = await api.put(`/users/address/${primaryAddress.addressId}`, payload,{withCredentials:true});
        setSuccess("Address updated successfully");
      } else {
        res = await api.post("/users/address", payload,{withCredentials:true});
        setSuccess("Address added successfully");
      }

      if (res.data.success) {
        setEdit(false);
        refetch();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error: any) {
      setErr(error.response?.data?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return {
    edit,
    setEdit,
    loading,
    err,
    success,
    errors,
    setErrors,
    setErr,
    setSuccess,
    validate,
    submit,
  };
}
