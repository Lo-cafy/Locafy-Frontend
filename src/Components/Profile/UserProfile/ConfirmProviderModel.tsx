import { Button } from "@/ui/button";
import { X, Briefcase, FileText } from "lucide-react";

interface ConfirmProviderModalProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
  handleConfirmProvider: () => void;
}

export default function ConfirmProviderModal({
  showConfirmModal,
  setShowConfirmModal,
  handleConfirmProvider
}: ConfirmProviderModalProps) {
  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Become a Provider</h3>
              <p className="text-sm text-gray-600">Start offering your services</p>
            </div>
          </div>
          <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            To become a service provider, you'll need to complete KYC verification. This helps us maintain trust and safety in our community.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              What you'll need:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
              <li>Government ID (Aadhaar, PAN, etc.)</li>
              <li>Recent photograph</li>
              <li>Proof of address</li>
              <li>Contact information</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            onClick={handleConfirmProvider}
          >
            Continue to KYC
          </Button>
        </div>
      </div>
    </div>
  );
}