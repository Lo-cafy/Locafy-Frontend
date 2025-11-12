import { useState, useEffect } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Alert } from "@/ui/AlertProps";
import { Progress } from "@/ui/progress";
import { 
  Upload, CheckCircle, XCircle, Clock, Shield, AlertCircle, 
  FileText, Edit2, Camera 
} from "lucide-react";
import api from "@/Api/baseurl";
import LiveCameraCapture from "@/Components/Profile/UserProfile/LiveCamaraCapture";

type KycStatus = "Pending" | "Verified" | "Rejected";
type DocumentType = "Passport" | "DriversLicense" | "NationalId";

interface KycSubmission {
  id: number;
  documentType: DocumentType;
  documentNumber: string;
  documentFrontUrl: string;
  documentBackUrl?: string;
  photoUrl: string;
  status: KycStatus;
  submittedAt: string;
  reviewerNotes?: string;
}

const documentTypes = [
  { value: "Passport", label: "Passport", requiresBack: false },
  { value: "DriversLicense", label: "Driver's License", requiresBack: true },
  { value: "NationalId", label: "National ID", requiresBack: true },
];

export default function KYCVerification() {
  // Data state
  const [submission, setSubmission] = useState<KycSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  // Form state
  const [documentType, setDocumentType] = useState<string>("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Fetch submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/kyc/my-submissions", { withCredentials: true });
      if (res.data.success && res.data.data.length > 0) {
        setSubmission(res.data.data[0]);
      } else {
        setSubmission(null);
      }
    } catch (err) {
      console.error("Failed to fetch KYC status:", err);
      setError("Could not load your KYC status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (submission) {
      setDocumentType(String(submission.documentType));
      setDocumentNumber(submission.documentNumber || "");
      if (submission.status === "Rejected") {
        setEdit(true);
      } else {
        setEdit(false);
      }
    } else {
      setEdit(true);
      setDocumentType("Passport");
    }
  }, [submission]);

  // File handlers
  const handleFileChange = (field: 'frontSide' | 'backSide') => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (field === 'frontSide') setFrontSide(file);
      else setBackSide(file);
    };

  const handleCameraCapture = (file: File) => {
    setPhoto(file);
    setShowCamera(false);
  };

  // Submit handler
  const handleSubmit = async () => {
    setError("");
    
    if (!documentType || !documentNumber || !frontSide || !photo) {
      setError("Document type, number, front side, and photo are required.");
      return;
    }

    const selectedDoc = documentTypes.find(d => d.value === documentType);
    if (selectedDoc?.requiresBack && !backSide) {
      setError("Back side is required for this document type.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("DocumentType", documentType);
      formData.append("DocumentNumber", documentNumber);
      formData.append("FrontSide", frontSide);
      if (backSide) formData.append("BackSide", backSide);
      formData.append("Photo", photo);

      const res = await api.post("/kyc/submit", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        await fetchSubmissions();
        resetForm();
      } else {
        setError(res.data.message || "Submission failed.");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFrontSide(null);
    setBackSide(null);
    setPhoto(null);
    setDocumentNumber("");
    setEdit(false);
    setError("");
  };

  const handleCancel = () => {
    resetForm();
    if (submission) {
      setDocumentType(String(submission.documentType));
      setDocumentNumber(submission.documentNumber || "");
    }
  };

  // Status config
  const getStatusConfig = (status?: KycStatus) => {
    switch (status) {
      case "Verified":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Verified",
          badgeClass: "bg-green-100 text-green-800"
        };
      case "Pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          label: "Pending Review",
          badgeClass: "bg-yellow-100 text-yellow-800"
        };
      case "Rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Rejected",
          badgeClass: "bg-red-100 text-red-800"
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Not Started",
          badgeClass: "bg-gray-100 text-gray-800"
        };
    }
  };

  if (loading) {
    return (
      <Card className="bg-white shadow-sm border border-gray-100 p-6">
        <p className="text-gray-600">Loading KYC Status...</p>
      </Card>
    );
  }

  const statusConfig = getStatusConfig(submission?.status);
  const StatusIcon = statusConfig.icon;
  const showForm = edit || !submission;
  const isVerified = submission?.status === "Verified";
  const selectedDocConfig = documentTypes.find(d => d.value === documentType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification</h2>
        <p className="text-gray-600">Complete your identity verification to become a provider</p>
      </div>

      {/* Error Alert */}
      {error && <Alert type="error" message={error} />}

      {/* Status Card */}
      <Card className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2 relative`}>
        <div className="p-6">
          {!isVerified && submission && submission.status !== "Rejected" && !edit && (
            <Button
              size="icon"
              onClick={() => setEdit(true)}
              className="absolute top-4 right-4 hover:bg-white/50"
              variant="ghost"
            >
              <Edit2 className="h-4 w-4 text-gray-600" />
            </Button>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
                <Badge className={statusConfig.badgeClass}>{statusConfig.label}</Badge>
              </div>
            </div>
          </div>

          {submission?.status === "Verified" && (
            <Alert type="success" message={`Your identity was verified on ${new Date(submission.submittedAt).toLocaleDateString()}`} />
          )}

          {submission?.status === "Pending" && (
            <Alert type="info" message={`Documents submitted on ${new Date(submission.submittedAt).toLocaleDateString()}. Review typically takes 1-2 business days.`} />
          )}

          {submission?.status === "Rejected" && submission.reviewerNotes && (
            <Alert type="error" message={`Rejection reason: ${submission.reviewerNotes}`} />
          )}
        </div>
      </Card>

      {/* Progress Bar */}
      {!isVerified && (
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Complete your verification</span>
                <span className="text-sm font-medium text-gray-900">
                  {submission?.status === "Pending" ? "50" : "0"}%
                </span>
              </div>
              <Progress value={submission?.status === "Pending" ? 50 : 0} />
            </div>
          </div>
        </Card>
      )}

      {/* Upload Form */}
      {showForm && !isVerified && (
        <Card className="bg-white border border-gray-200">
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Upload Identity Documents</h3>

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Document Type <span className="text-red-500">*</span>
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select your document type</option>
                {documentTypes.map((doc) => (
                  <option key={doc.value} value={doc.value}>{doc.label}</option>
                ))}
              </select>
            </div>

            {/* Document Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your document number"
              />
            </div>

            {/* Front Side */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Front Side <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange('frontSide')}
                className="hidden"
                id="front-upload"
                disabled={submitting}
              />
              <label
                htmlFor="front-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50 hover:bg-emerald-50"
              >
                {frontSide ? (
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-700">{frontSide.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload front side</span>
                  </>
                )}
              </label>
            </div>

            {/* Back Side (conditional) */}
            {selectedDocConfig?.requiresBack && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Back Side <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange('backSide')}
                  className="hidden"
                  id="back-upload"
                  disabled={submitting}
                />
                <label
                  htmlFor="back-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50 hover:bg-emerald-50"
                >
                  {backSide ? (
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-gray-700">{backSide.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Click to upload back side</span>
                    </>
                  )}
                </label>
              </div>
            )}

            {/* Photo Capture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Photo <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => !submitting && setShowCamera(true)}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50 hover:bg-emerald-50"
              >
                {photo ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                    <span className="text-sm text-gray-700">{photo.name}</span>
                    <span className="text-xs text-emerald-600">✓ Photo captured</span>
                  </div>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to capture live photo</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {edit && submission && (
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={submitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={submitting || !documentType || !documentNumber || !frontSide || !photo || (selectedDocConfig?.requiresBack && !backSide)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {submitting ? "Submitting..." : submission?.status === "Rejected" ? "Resubmit for Verification" : "Submit for Verification"}
              </Button>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Your data is secure</p>
                <p className="text-xs text-blue-700 mt-1">
                  All documents are encrypted and stored securely. We only use them for verification purposes.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Submitted Documents View */}
      {submission && submission.status === "Pending" && !edit && (
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {submission.documentType.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <LiveCameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}