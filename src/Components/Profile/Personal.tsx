import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Save, Edit2, X } from "lucide-react";
import api from "@/Api/baseurl";
import { useProfile } from "./useProfile";
import { FormField } from "@/ui/formfield";
import { Alert } from "@/ui/AlertProps";

const genderOpts = [
    { v: "M", l: "Male" }, { v: "F", l: "Female" }, { v: "O", l: "Other" },
    { v: "N", l: "Non-binary" }, { v: "PREFER_NOT_TO_SAY", l: "Prefer not to say" }
];

export default function Personal() {
    // 1. Get profile and the primary phone number from the hook
    const { profile, primaryPhone, refetch } = useProfile();

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState<any>({});

    // 2. Initialize form data state as empty
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: ""
    });

    // 3. Use useEffect to populate form data when the profile is loaded or changes
    useEffect(() => {
        if (profile) {
            setData({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                // Use the primary phone number string from the hook
                phoneNumber: primaryPhone?.phoneNumber || "",
                // Format date for the input field: YYYY-MM-DD
                dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : "",
                gender: profile.gender || ""
            });
        }
    }, [profile, primaryPhone]); // This effect runs when profile data arrives

    const validate = () => {
        const e: any = {};
        if (data.firstName && data.firstName.length > 50) e.firstName = "Max 50 characters";
        if (data.lastName && data.lastName.length > 50) e.lastName = "Max 50 characters";
        // 4. Align validation regex with the backend for consistency
        if (data.phoneNumber && !/^\+?[1-9]\d{1,14}$/.test(data.phoneNumber)) e.phoneNumber = "Invalid phone number format.";
        if (data.dateOfBirth && new Date(data.dateOfBirth) >= new Date()) e.dateOfBirth = "Date must be in the past.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submit = async () => {
        setErr("");
        setSuccess("");
        if (!validate()) return setErr("Please fix the validation errors.");

        setLoading(true);
        try {
            // 5. Build the payload with camelCase keys to match the C# DTO
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender
            };

            const res = (await api.put("/users/personal-details", payload,{withCredentials:true})).data;
            if (res.success) {
                setSuccess("Updated successfully!");
                setEdit(false);
                refetch(); // Refetch profile data to show the latest info
                setTimeout(() => setSuccess(""), 3000);
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
                dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : "",
                gender: profile.gender || ""
            });
        }
        setEdit(false);
        setErr("");
        setErrors({});
    }

    return (
        <Card className="bg-white shadow-sm border p-8 rounded-2xl relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage your personal details</p>
                </div>
                {!edit && <Button size="icon" onClick={() => setEdit(true)} className="hover:bg-gray-100" variant="ghost"><Edit2 className="h-4 w-4" /></Button>}
            </div>

            {success && <Alert type="success" message={success} />}
            {err && <Alert type="error" message={err} />}

            <div className="grid md:grid-cols-2 gap-6">
                <FormField label="First Name" value={data.firstName} isEdit={edit} onChange={(v: string) => change("firstName", v)} error={errors.firstName} />
                <FormField label="Last Name" value={data.lastName} isEdit={edit} onChange={(v: string) => change("lastName", v)} error={errors.lastName} />
                <FormField label="Phone Number" value={data.phoneNumber} isEdit={edit} onChange={(v: string) => change("phoneNumber", v)} error={errors.phoneNumber} />
                <FormField label="Date of Birth" value={data.dateOfBirth} isEdit={edit} onChange={(v: string) => change("dateOfBirth", v)} error={errors.dateOfBirth} type="date" />
                <div className="md:col-span-2">
                    <FormField label="Gender" value={data.gender} isEdit={edit} onChange={(v: string) => change("gender", v)} opts={genderOpts} error={errors.gender} type="select" />
                </div>
            </div>

            {edit && (
                <div className="mt-8 pt-6 border-t flex justify-end gap-3">
                    <Button variant="outline" onClick={handleCancel} disabled={loading} className="px-6">
                        <X className="h-4 w-4 mr-2" />Cancel
                    </Button>
                    <Button onClick={submit} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                        {loading ? 'Saving...' : <><Save className="h-4 w-4 mr-2" />Save Changes</>}
                    </Button>
                </div>
            )}
        </Card>
    );
}