import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Edit2, Shield } from "lucide-react";
import api from "@/Api/baseurl";
import { FileUpload } from "@/ui/fileupload";
import { StatusCard } from "./StatusCard";
import { Alert } from "@/ui/AlertProps";


type KycStatus = "Pending" | "Verified" | "Rejected";
type DocumentType = "Passport" | "DriversLicense" | "NationalID";

interface KycSubmission {
  id: number;
  documentType: DocumentType;
  documentFrontUrl: string;
  documentBackUrl?: string;
  status: KycStatus;
  submittedAt: string;
  reviewerNotes?: string;
}

const docOptions = [
  { v: "Passport", l: "Passport" },
  { v: "DriversLicense", l: "Drivers License" },
  { v: "NationalID", l: "National ID" }
];

export default function KYC() {
  const [submission, setSubmission] = useState<KycSubmission | null>(null);
  const [loading, setLoading] = useState(true); // For initial data fetch
  const [submitting, setSubmitting] = useState(false); // For form submission
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState("");

  // Form state
  const [docType, setDocType] = useState("");
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/kyc/my-submissions",{withCredentials:true});
      // The API returns an array, we'll take the most recent one
      if (res.data.success && res.data.data.length > 0) {
        setSubmission(res.data.data[0]);
      } else {
        setSubmission(null);
      }
    } catch (error) {
      console.error("Failed to fetch KYC status:", error);
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
      setDocType(String(submission.documentType));
      if (submission.status === "Rejected") {
        setEdit(true); // Automatically open form if rejected
      } else {
        setEdit(false);
      }
    } else {
      setEdit(true); // If no submission exists, open form by default
    }
  }, [submission]);

  const submit = async () => {
    setErr("");
    if (!docType || !front) {
      setErr("Document type and front side image are required.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("DocumentType", docType);
      fd.append("FrontSide", front);
      if (back) fd.append("BackSide", back);

      const res = await api.post("/kyc/submit", fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      ,withCredentials:true},);

      if (res.data.success) {
        await fetchSubmissions(); // Refresh data to show the new "Pending" status
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setErr("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCancel = () => {
      setEdit(false);
      setErr('');
      // Reset files to null
      setFront(null);
      setBack(null);
      // Reset doc type if submission exists
      if (submission) {
          setDocType(String(submission.documentType));
      }
  }

  if (loading) {
    return <Card className="bg-white shadow-sm border border-gray-100 p-6 relative"><p>Loading KYC Status...</p></Card>;
  }

  const showForm = edit || !submission;
  const isVerified = submission?.status ==="Verified";

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">
        {!isVerified && submission && submission.status !== "Rejected" && !edit && (
             <Button size="icon" onClick={() => setEdit(true)} className="absolute top-6 right-6 hover:bg-gray-100" variant="ghost">
                <Edit2 className="h-4 w-4 text-gray-600" />
            </Button>
        )}

        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">KYC Verification</h2>
            <p className="text-sm text-gray-600">Upload your identity documents for verification</p>
        </div>
        
        {err && <Alert type="error" message={err} />}

        {submission?.status === "Verified" && <StatusCard status="Verified" />}
        {submission?.status === "Pending" && <StatusCard status="Pending" />}
        {submission?.status === "Rejected" && <StatusCard status="Rejected" notes={submission.reviewerNotes} />}

        {showForm && !isVerified && (
            <div className="space-y-6">
                <select value={docType} onChange={(e) => setDocType(e.target.value)} disabled={submitting} className="w-full px-4 py-3 border border-gray-300 rounded-xl ...">
                    <option value="">Select your document type</option>
                    {docOptions.map((d) => <option key={d.v} value={d.v}>{d.l}</option>)}
                </select>

                <FileUpload file={front} onChange={setFront} label="Front Side" required disabled={submitting} id="front-upload" />
                <FileUpload file={back} onChange={setBack} label="Back Side" disabled={submitting} id="back-upload" />

                <div className="mt-8 flex justify-end gap-3">
                    {edit && submission && (
                         <Button variant="outline" onClick={handleCancel} disabled={submitting} className="px-6">Cancel</Button>
                    )}
                    <Button onClick={submit} disabled={submitting || !docType || !front} className="bg-emerald-600 hover:bg-emerald-700 ...">
"                        {submitting ? 'Submitting...' : submission?.status === "Rejected" ? 'Resubmit for Verification' : 'Submit for Verification'}
"                    </Button>
                </div>
            </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 flex items-center">
            <Shield className="h-3.5 w-3.5 mr-2 text-emerald-600" />
            Your documents are encrypted and will only be used for verification.
          </p>
        </div>
    </Card>
  );
}