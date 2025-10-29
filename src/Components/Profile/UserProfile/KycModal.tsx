import { X, Shield, Upload, CheckCircle, AlertCircle, Camera } from "lucide-react";

interface KYCData {
  documentType: string;
  documentNumber: string;
  frontSide: File | null;
  backSide: File | null;
  photo: File | null;
}

interface KYCModalProps {
  showKYCModal: boolean;
  setShowKYCModal: (show: boolean) => void;
  kycData: KYCData;
  setKycData: React.Dispatch<React.SetStateAction<KYCData>>;
  handleKYCSubmit: () => Promise<void>;
  handleFileChange: (field: 'frontSide' | 'backSide') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorMessage: string;
  onOpenCamera: () => void;
}

export default function KYCModal({
  showKYCModal,
  setShowKYCModal,
  kycData,
  setKycData,
  handleKYCSubmit,
  handleFileChange,
  isSubmitting,
  submitStatus,
  errorMessage,
  onOpenCamera
}: KYCModalProps) {
  if (!showKYCModal) return null;

  const resetAndClose = () => {
    setShowKYCModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">KYC Verification</h3>
              <p className="text-sm text-gray-600">Complete your verification to become a provider</p>
            </div>
          </div>
          <button 
            onClick={resetAndClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-semibold">KYC Submitted Successfully!</p>
              <p className="text-green-700 text-sm">Your verification is under review.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-semibold">Submission Failed</p>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Document Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Document Type <span className="text-red-500">*</span>
            </label>
            <select
              value={kycData.documentType}
              onChange={(e) => setKycData(prev => ({ ...prev, documentType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
            >
              <option value="Passport">Passport</option>
              <option value="DriversLicense">Driver's License</option>
              <option value="NationalId">National ID</option>
            </select>
          </div>

          {/* Document Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Document Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={kycData.documentNumber}
              onChange={(e) => setKycData(prev => ({ ...prev, documentNumber: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter your document number"
              disabled={isSubmitting}
            />
          </div>

          {/* File Uploads - Front and Back */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Front Side <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange('frontSide')}
                  className="hidden"
                  id="frontSide"
                  disabled={isSubmitting}
                />
                <label htmlFor="frontSide" className={`cursor-pointer ${isSubmitting ? 'opacity-50' : ''}`}>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 break-words">
                    {kycData.frontSide ? kycData.frontSide.name : "Upload Front Side"}
                  </p>
                  {kycData.frontSide && (
                    <p className="text-xs text-emerald-600 mt-1">✓ File selected</p>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Back Side <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange('backSide')}
                  className="hidden"
                  id="backSide"
                  disabled={isSubmitting}
                />
                <label htmlFor="backSide" className={`cursor-pointer ${isSubmitting ? 'opacity-50' : ''}`}>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 break-words">
                    {kycData.backSide ? kycData.backSide.name : "Upload Back Side"}
                  </p>
                  {kycData.backSide && (
                    <p className="text-xs text-emerald-600 mt-1">✓ File selected</p>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Photo Capture */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Photo <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
              {kycData.photo ? (
                <div className="space-y-3">
                  <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                  <p className="text-sm text-gray-600 break-words">{kycData.photo.name}</p>
                  <button
                    type="button"
                    onClick={onOpenCamera}
                    disabled={isSubmitting}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Retake Photo
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenCamera}
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <Camera className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to Capture Live Photo</p>
                  <p className="text-xs text-gray-500 mt-2">Use your camera to take a selfie</p>
                </button>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              onClick={resetAndClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleKYCSubmit}
              disabled={isSubmitting || !kycData.documentNumber || !kycData.frontSide || !kycData.photo}
            >
              {isSubmitting ? 'Submitting...' : 'Submit KYC'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}