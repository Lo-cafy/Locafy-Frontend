import api from "@/Api/baseurl";
import { useState } from "react";

interface Address {
  id?: number;
  addressType?: string;
  addressTitle?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  postalCode?: string;
  isPrimary?: boolean;
}

export function useAddressDetails(_primaryAddress: Address | undefined, refetch: () => void) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (data: Address): Promise<boolean> => {
    setLoading(true);
    setErr("");
    setSuccess("");

    const payload = {
      addressType: data.addressType,
      addressTitle: data.addressTitle,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      landmark: data.landmark,
      postalCode: data.postalCode,
      isPrimary: data.isPrimary,
    };

    try {
      if(data.id==null){
        let res = await api.post("/users/address", payload,{withCredentials:true});
      if (res.data.success) {
                setSuccess("Address added successfully");
        setEdit(false);
        setTimeout(() => setSuccess(""), 3000);
        return true;
      }
      return false;

      }else{

      
      await api.put(`/users/address/${data.id}`, payload, { withCredentials: true });

      setSuccess("Address updated successfully");

      await new Promise(resolve => setTimeout(resolve, 600));

      setEdit(false);
      refetch();
      return true;   // ✅ important
      }
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Failed to update address");
      return false;  // ✅ important
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
    submit,
  };
}
