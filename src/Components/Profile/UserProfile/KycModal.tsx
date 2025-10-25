
import { Button } from "@/ui/button";
import { X, Shield, Upload } from "lucide-react";

interface KYCData {
  fullName: string;
  idType: string;
  idNumber: string;
  address: string;
  idProof: File | null;
  photo: File | null;
}

interface KYCModalProps {
  showKYCModal: boolean;
  setShowKYCModal: (show: boolean) => void;
  kycData: KYCData;
  setKycData: React.Dispatch<React.SetStateAction<KYCData>>;
  handleKYCSubmit: (e: React.FormEvent) => void;
  handleFileChange: (field: 'idProof' | 'photo') => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function KYCModal({
  showKYCModal,
  setShowKYCModal,
  kycData,
  setKycData,
  handleKYCSubmit,
  handleFileChange
}: KYCModalProps) {
  if (!showKYCModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center pt-25 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8 animate-scale-in">
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
          <button onClick={() => setShowKYCModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleKYCSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={kycData.fullName}
              onChange={(e) => setKycData(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          {/* ID Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Type</label>
            <select
              required
              value={kycData.idType}
              onChange={(e) => setKycData(prev => ({ ...prev, idType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="passport">Passport</option>
              <option value="driving_license">Driving License</option>
            </select>
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number</label>
            <input
              type="text"
              required
              value={kycData.idNumber}
              onChange={(e) => setKycData(prev => ({ ...prev, idNumber: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your ID number"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <textarea
              required
              value={kycData.address}
              onChange={(e) => setKycData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              rows={3}
              placeholder="Enter your complete address"
            />
          </div>

          {/* File Uploads */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ID Proof</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors">
                <input
                  type="file"
                  required
                  accept="image/*,.pdf"
                  onChange={handleFileChange('idProof')}
                  className="hidden"
                  id="idProof"
                />
                <label htmlFor="idProof" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {kycData.idProof ? kycData.idProof.name : "Upload ID Proof"}
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors">
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleFileChange('photo')}
                  className="hidden"
                  id="photo"
                />
                <label htmlFor="photo" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {kycData.photo ? kycData.photo.name : "Upload Photo"}
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setShowKYCModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              Submit KYC
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}