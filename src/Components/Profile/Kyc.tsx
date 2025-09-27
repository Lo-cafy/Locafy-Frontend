import { useState, useRef, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Save, Shield, Upload, ChevronDown, Check, Edit2 } from "lucide-react";

const proofOptions = [
  { value: "", label: "-- Select Proof Type --" },
  { value: "pan", label: "PAN Card" },
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "license", label: "Driving License" }
];

const statusConfig = {
  pending: { text: "Pending Verification", class: "bg-yellow-100 text-yellow-700" },
  verified: { text: "Verified", class: "bg-green-100 text-green-700" },
  rejected: { text: "Rejected", class: "bg-red-100 text-red-700" }
};

function Dropdown({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = proofOptions.find(o => o.value === value)?.label || "-- Select Proof Type --";

  useEffect(() => {
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full p-2.5 border border-gray-200 rounded-lg flex justify-between items-center ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>{selected}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {proofOptions.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-50 ${
                value === opt.value ? "bg-emerald-50 text-emerald-700" : "text-gray-900"
              }`}
            >
              {opt.label}
              {value === opt.value && <Check className="h-4 w-4 text-emerald-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function KYC() {
  const [isEditing, setIsEditing] = useState(false);
  const [kycType, setKycType] = useState("");
  const [kycNumber, setKycNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"pending" | "verified" | "rejected">("pending");

  const validateNumber = () =>
    (kycType === "pan" && /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(kycNumber)) ||
    (kycType === "aadhaar" && /^[0-9]{12}$/.test(kycNumber)) ||
    (kycType === "license" && /^[A-Z0-9]{6,15}$/.test(kycNumber)) ||
    true;

  const handleSave = () => {
    if (!kycType || !kycNumber || !file) return alert("Please complete all fields before saving.");
    if (!validateNumber()) return alert("Please enter a valid proof number.");
    setLoading(true);
    setTimeout(() => { setStatus("verified"); setLoading(false); setIsEditing(false); }, 1500);
  };

  return (
    <Card className="bg-white shadow-sm border p-6 rounded-2xl relative">
      {/* Edit2 Button */}
      {!isEditing && (
        <Button
          size="icon"
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 text-black"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}

      <h2 className="text-xl font-semibold mb-6">KYC Verification</h2>

      {/* Status */}
      <div className="mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status].class}`}>
          {statusConfig[status].text}
        </span>
      </div>

      <div className="space-y-6">
        {/* Proof Type */}
        <div>
          <label className="block font-medium mb-2">Select Proof Type</label>
          <Dropdown value={kycType} onChange={setKycType} disabled={!isEditing} />
        </div>

        {/* Proof Number */}
        <div>
          <label className="block font-medium mb-2">Proof Number</label>
          <Input
            value={kycNumber}
            onChange={(e) => setKycNumber(e.target.value.toUpperCase())}
            placeholder="Enter proof number"
            className={`border-gray-200 ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
            disabled={!isEditing}
          />
          {!validateNumber() && kycNumber && (
            <p className="text-sm text-red-500 mt-1">Invalid format for {kycType.toUpperCase()}.</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-2">Upload Proof Document</label>
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className={`border-gray-200 ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
            disabled={!isEditing}
          />
          {file && (
            <p className="text-sm text-emerald-600 mt-1 flex items-center">
              <Upload className="h-4 w-4 mr-1" /> {file.name}
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-8 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {loading ? "Saving..." : (<><Save className="h-4 w-4 mr-2" /> Save KYC Details</>)}
          </Button>
        </div>
      )}

      {/* Security Note */}
      <p className="text-xs text-gray-500 mt-6 flex items-center">
        <Shield className="h-3 w-3 mr-1 text-emerald-500" />
        Your documents are encrypted and stored securely.
      </p>
    </Card>
  );
}
