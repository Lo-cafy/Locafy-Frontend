import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Clock, Shield, AlertCircle, FileText } from 'lucide-react';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { Alert } from '@/ui/AlertProps';
import { Progress } from '@/ui/progress';

type KYCStatus = 'not_started' | 'pending' | 'verified' | 'rejected';
type DocumentType = 'passport' | 'drivers_license' | 'national_id';

interface Document {
  type: DocumentType;
  frontImage: File | null;
  backImage: File | null;
}

interface KYCData {
  status: KYCStatus;
  submittedDate?: string;
  verifiedDate?: string;
  rejectionReason?: string;
  document?: {
    type: string;
    frontUrl: string;
    backUrl?: string;
  };
}

// Dummy KYC data
const dummyKYCData: KYCData = {
  status: 'not_started',
};

export default function KYCVerification() {
  const [kycData] = useState<KYCData>(dummyKYCData);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('passport');
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusConfig = (status: KYCStatus) => {
    switch (status) {
      case 'verified':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Verified',
          badgeClass: 'bg-green-100 text-green-800'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          label: 'Pending Review',
          badgeClass: 'bg-yellow-100 text-yellow-800'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Rejected',
          badgeClass: 'bg-red-100 text-red-800'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Not Started',
          badgeClass: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const handleFileChange = (file: File | null, side: 'front' | 'back') => {
    if (side === 'front') {
      setFrontImage(file);
    } else {
      setBackImage(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file, side);
  };

  const handleSubmit = async () => {
    if (!frontImage) {
      alert('Please upload the front side of your document');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('KYC documents submitted successfully!');
    }, 2000);
  };

  const statusConfig = getStatusConfig(kycData.status);
  const StatusIcon = statusConfig.icon;

  const documentTypes = [
    { value: 'passport', label: 'Passport', requiresBack: false },
    { value: 'drivers_license', label: "Driver's License", requiresBack: true },
    { value: 'national_id', label: 'National ID Card', requiresBack: true },
  ];

  const selectedDocConfig = documentTypes.find(d => d.value === selectedDocType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification</h2>
        <p className="text-gray-600">Complete your identity verification to unlock all features</p>
      </div>

      {/* Status Card */}
      <Card className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
                <Badge className={statusConfig.badgeClass}>{statusConfig.label}</Badge>
              </div>
            </div>
          </div>

          {kycData.status === 'verified' && kycData.verifiedDate && (
            <Alert type="success" message={`Your identity was verified on ${kycData.verifiedDate}`} />
          )}

          {kycData.status === 'pending' && kycData.submittedDate && (
            <Alert type="info" message={`Documents submitted on ${kycData.submittedDate}. Review typically takes 1-2 business days.`} />
          )}

          {kycData.status === 'rejected' && kycData.rejectionReason && (
            <Alert type="error" message={`Rejection reason: ${kycData.rejectionReason}`} />
          )}
        </div>
      </Card>

      {/* Verification Progress */}
      {kycData.status !== 'verified' && (
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Complete your verification</span>
                <span className="text-sm font-medium text-gray-900">
                  {kycData.status === 'pending' ? '50' : kycData.status === 'verified' ? '100' : '0'}%
                </span>
              </div>
              <Progress 
                value={kycData.status === 'pending' ? 50 : kycData.status === 'verified' ? 100 : 0} 
              />
            </div>
          </div>
        </Card>
      )}

      {/* Upload Form */}
      {(kycData.status === 'not_started' || kycData.status === 'rejected') && (
        <Card className="bg-white border border-gray-200">
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Upload Identity Documents</h3>

            {/* Document Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Document Type
              </label>
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value as DocumentType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {documentTypes.map(doc => (
                  <option key={doc.value} value={doc.value}>{doc.label}</option>
                ))}
              </select>
            </div>

            {/* Front Side Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Front Side <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, 'front')}
                  className="hidden"
                  id="front-upload"
                />
                <label
                  htmlFor="front-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50 hover:bg-emerald-50"
                >
                  {frontImage ? (
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-gray-700">{frontImage.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Click to upload front side</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Back Side Upload */}
            {selectedDocConfig?.requiresBack && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Back Side {selectedDocConfig?.requiresBack && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInputChange(e, 'back')}
                    className="hidden"
                    id="back-upload"
                  />
                  <label
                    htmlFor="back-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50 hover:bg-emerald-50"
                  >
                    {backImage ? (
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm text-gray-700">{backImage.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Click to upload back side</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !frontImage || (selectedDocConfig?.requiresBack && !backImage)}
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
            </Button>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
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
      {kycData.status === 'pending' && kycData.document && (
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {kycData.document.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
