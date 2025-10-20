import { useState, useEffect } from "react";
import api from "@/Api/baseurl";

export interface BankAccount {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName?: string;
  accountType: string;
  isPrimary: boolean;
}

export const initialDataState: BankAccount = {
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  bankName: "",
  branchName: "",
  accountType: "savings",
  isPrimary: true,
};

export function useBankAccount() {
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [data, setData] = useState(initialDataState);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAccount = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bank-account",{withCredentials:true});
      if (res.data.success && res.data.data) {
        setAccount(res.data.data);
      } else {
        setAccount(null);
      }
    } catch (error) {
      console.error("Failed to fetch bank details", error);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (account) {
      setData({
        accountHolderName: account.accountHolderName || "",
        accountNumber: account.accountNumber || "",
        ifscCode: account.ifscCode || "",
        bankName: account.bankName || "",
        branchName: account.branchName || "",
        accountType: account.accountType || "savings",
        isPrimary: account.isPrimary || true,
      });
      setEdit(false);
    } else {
      setData(initialDataState);
      setEdit(true);
    }
  }, [account]);

  const validate = () => {
    const e: any = {};
    if (!data.accountHolderName || data.accountHolderName.length < 2)
      e.accountHolderName = "Min 2 characters required";
    if (!/^\d{9,18}$/.test(data.accountNumber))
      e.accountNumber = "A valid account number is required (9–18 digits)";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscCode))
      e.ifscCode = "Invalid IFSC format (e.g., HDFC0001234)";
    if (!data.bankName) e.bankName = "Bank name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setErr("");
    setSuccess("");
    if (!validate()) return setErr("Please fix validation errors");
    setLoading(true);
    try {
      const res = await api.post("/bank-account", data,{withCredentials:true});
      if (res.data.success) {
        setSuccess("Bank account saved successfully!");
        setEdit(false);
        fetchAccount();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err: any) {
      setErr(err.response?.data?.message || "Failed to save bank account");
    } finally {
      setLoading(false);
    }
  };

  const change = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev: any) => ({ ...prev, [key]: undefined }));
  };

  const handleCancel = () => {
    if (account) {
      setData(account);
    } else {
      setData(initialDataState);
    }
    setEdit(false);
    setErr("");
    setErrors({});
  };

  return {
    data,
    account,
    edit,
    loading,
    err,
    success,
    errors,
    change,
    submit,
    handleCancel,
    setEdit,
  };
}
