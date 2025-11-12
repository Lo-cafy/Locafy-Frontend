import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Alert } from "@/ui/AlertProps";
import { Edit2, Shield, Camera, CheckCircle } from "lucide-react";
import api from "@/Api/baseurl";
import { StatusCard } from "./StatusCard";
import { FileUpload } from "@/ui/fileupload";
import LiveCameraCapture from "./UserProfile/LiveCamaraCapture";

type DocumentType = "Passport" | "DriversLicense" | "NationalId";

interface KycSubmission {
  id: number;
  documentType: DocumentType;
  documentNumber: string;
  documentFrontUrl: string;
  documentBackUrl?: string;
  photoUrl: string;
  status: number;
  submittedAt: string;
  reviewerNotes?: string;
}

const documentTypes = [
  { value: "Passport", label: "Passport", requiresBack: false },
  { value: "DriversLicense", label: "Driver's License", requiresBack: true },
  { value: "NationalId", label: "National ID", requiresBack: true },
];

export default function KYC() {
  const [submission, setSubmission] = useState<KycSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState("");

  const [documentType, setDocumentType] = useState<DocumentType>("Passport");
  const [documentNumber, setDocumentNumber] = useState("");
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("/kyc/my-submissions", { withCredentials: true });
      if (res.data.success && res.data.data.length > 0) {
        setSubmission(res.data.data[0]);
      } else {
        setSubmission(null);
      }
    } catch {
      setErr("Could not load your KYC status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (submission) {
      setDocumentType(submission.documentType);
      setDocumentNumber(submission.documentNumber || "");
      if (submission.status === 2) setEdit(true);
      else setEdit(false);
    } else {
      setEdit(true);
      setDocumentType("Passport");
    }
  }, [submission]);

  const handleSubmit = async () => {
    setErr("");

    const needsBack = documentTypes.find(d => d.value === documentType)?.requiresBack;
    if (!documentType || !documentNumber || !front || !photo || (needsBack && !back)) {
      setErr("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("DocumentType", documentType);
      fd.append("DocumentNumber", documentNumber);
      fd.append("FrontSide", front);
      if (back) fd.append("BackSide", back);
      fd.append("Photo", photo);

      const res = await api.post("/kyc/submit", fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        await fetchSubmissions();
        resetForm();
      } else setErr("Submission failed.");
    } catch {
      setErr("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFront(null);
    setBack(null);
    setPhoto(null);
    setDocumentNumber("");
    setEdit(false);
  };

  const isVerified = submission?.status === 1;
  const showForm = edit || !submission;
  const needsBack = documentTypes.find(d => d.value === documentType)?.requiresBack;

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">

      <h2 className="text-2xl font-semibold mb-2">KYC Verification</h2>
      <p className="text-sm text-gray-600 mb-6">Upload your identity documents</p>

      {err && <Alert type="error" message={err} />}

      {submission && <StatusCard status={submission.status} notes={submission.reviewerNotes} />}

      {!isVerified && submission && submission.status !== 2 && !edit && (
        <Button size="icon" onClick={() => setEdit(true)} className="absolute top-6 right-6" variant="ghost">
          <Edit2 className="h-4 w-4" />
        </Button>
      )}

      {showForm && !isVerified && (
        <div className="space-y-6 mt-6">

          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            disabled={submitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          >
            {documentTypes.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>

          <input
            type="text"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            disabled={submitting}
            placeholder="Enter Document Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          <FileUpload   id="document-front" file={front} onChange={setFront} label="Front Side" required disabled={submitting} />

          {needsBack && (
            <FileUpload   id="document-back" file={back} onChange={setBack} label="Back Side" required disabled={submitting} />
          )}

          <div
            onClick={() => setShowCamera(true)}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-emerald-50"
          >
            {photo ? (
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="text-emerald-600" />
                <span className="text-xs text-emerald-700">Photo Captured</span>
              </div>
            ) : (
              <>
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to capture photo</span>
              </>
            )}
          </div>

          <div className="flex justify-end gap-2">
            {edit && submission && (
              <Button variant="outline" onClick={resetForm} disabled={submitting}>Cancel</Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {submitting ? "Submitting..." : submission?.status === 2 ? "Resubmit" : "Submit"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 flex items-center">
            <Shield className="h-3.5 w-3.5 mr-2 text-emerald-600" />
            Your documents are encrypted and stored securely.
          </p>
        </div>
      )}

      {showCamera && (
        <LiveCameraCapture
          onCapture={(file) => { setPhoto(file); setShowCamera(false); }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </Card>
  );
}
