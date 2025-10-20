import { CheckCircle, Clock, XCircle } from "lucide-react";

export const StatusCard = ({ status, notes }: { status: "Verified" | "Pending" | "Rejected"; notes?: string }) => {
  const config = {
    Pending: { icon: Clock, color: "blue", title: "Documents Submitted", message: "Your KYC documents are under review. We'll notify you once verified." },
    Verified: { icon: CheckCircle, color: "emerald", title: "KYC Verified", message: "Your identity has been successfully verified. No further action is needed." },
    Rejected: { icon: XCircle, color: "red", title: "Submission Rejected", message: "Your submission was rejected. Please review the notes and resubmit." },
  };
  const current = config[status];
  const Icon = current.icon;

  return (
    <div className={`bg-${current.color}-50 border border-${current.color}-200 rounded-xl p-4 mb-6 flex items-start`}>
      <Icon className={`h-5 w-5 text-${current.color}-600 mr-3 mt-0.5 flex-shrink-0`} />
      <div>
        <p className={`text-sm font-medium text-${current.color}-900`}>{current.title}</p>
        <p className={`text-xs text-${current.color}-700 mt-1`}>{current.message}</p>
        {status === "Rejected" && notes && (
            <p className="text-xs font-semibold text-red-800 mt-2 p-2 bg-red-100 rounded">Reason: {notes}</p>
        )}
      </div>
    </div>
  );
};

