// ==========================================
// File: EditProfileModal.tsx
// ==========================================

import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import { X, Save, User } from "lucide-react";
import { Alert } from "@/ui/AlertProps";
import { FormField } from "@/ui/formfield";
import api from "@/Api/baseurl";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  primaryPhone: any;
  onSuccess: () => void;
}

const genderOpts = [
  { v: "M", l: "Male" },
  { v: "F", l: "Female" },
  { v: "O", l: "Other" },
  { v: "N", l: "Non-binary" },
  { v: "PREFER_NOT_TO_SAY", l: "Prefer not to say" }
];

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  primaryPhone,
  onSuccess
}: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<any>({});

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: ""
  });

  // Populate form data when profile changes
  useEffect(() => {
    if (profile) {
      setData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: primaryPhone?.phoneNumber || "",
        dateOfBirth: profile.dateOfBirth 
          ? new Date(profile.dateOfBirth).toISOString().split('T')[0] 
          : "",
        gender: profile.gender || ""
      });
    }
  }, [profile, primaryPhone]);

  const validate = () => {
    const e: any = {};
    if (data.firstName && data.firstName.length > 50) 
      e.firstName = "Max 50 characters";
    if (data.lastName && data.lastName.length > 50) 
      e.lastName = "Max 50 characters";
    if (data.phoneNumber && !/^\+?[1-9]\d{1,14}$/.test(data.phoneNumber)) 
      e.phoneNumber = "Invalid phone number format.";
    if (data.dateOfBirth && new Date(data.dateOfBirth) >= new Date()) 
      e.dateOfBirth = "Date must be in the past.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setErr("");
    setSuccess("");
    if (!validate()) return setErr("Please fix the validation errors.");

    setLoading(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender
      };

      const res = (await api.put("/users/personal-details", payload, {
        withCredentials: true
      })).data;

      if (res.success) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          setSuccess("");
          onSuccess(); // Refetch profile data
          onClose(); // Close modal
        }, 1500);
      }
    } catch (err: any) {
      setErr(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const change = (k: string, v: string) => {
    setData(p => ({ ...p, [k]: v }));
    if (errors[k]) {
      setErrors((p: any) => ({ ...p, [k]: undefined }));
    }
  };

  const handleCancel = () => {
    if (profile) {
      setData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: primaryPhone?.phoneNumber || "",
        dateOfBirth: profile.dateOfBirth 
          ? new Date(profile.dateOfBirth).toISOString().split('T')[0] 
          : "",
        gender: profile.gender || ""
      });
    }
    setErr("");
    setSuccess("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8 animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <User className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <p className="text-sm text-gray-600">Update your personal information</p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Alerts */}
        {success && <Alert type="success" message={success} />}
        {err && <Alert type="error" message={err} />}

        {/* Form */}
        <div className="space-y-5 mt-6">
          {/* Name Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              value={data.firstName}
              isEdit={true}
              onChange={(v: string) => change("firstName", v)}
              error={errors.firstName}
              type="text"
              max={50}
              placeholder="Enter first name"
            />
            <FormField
              label="Last Name"
              value={data.lastName}
              isEdit={true}
              onChange={(v: string) => change("lastName", v)}
              error={errors.lastName}
              type="text"
              max={50}
              placeholder="Enter last name"
            />
          </div>

          {/* Phone Number */}
          <FormField
            label="Phone Number"
            value={data.phoneNumber}
            isEdit={true}
            onChange={(v: string) => change("phoneNumber", v)}
            error={errors.phoneNumber}
            type="tel"
            placeholder="Enter phone number"
          />

          {/* Date of Birth */}
          <FormField
            label="Date of Birth"
            value={data.dateOfBirth}
            isEdit={true}
            onChange={(v: string) => change("dateOfBirth", v)}
            error={errors.dateOfBirth}
            type="date"
          />

          {/* Gender */}
          <FormField
            label="Gender"
            value={data.gender}
            isEdit={true}
            onChange={(v: string) => change("gender", v)}
            error={errors.gender}
            type="select"
            opts={genderOpts}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 mt-6 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleCancel}
            disabled={loading}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            onClick={submit}
            disabled={loading}
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}