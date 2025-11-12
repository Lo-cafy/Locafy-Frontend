import { CheckCircle, Clock, XCircle } from "lucide-react";

export const StatusCard = ({
  status,
  notes,
}: {
  status: number; // 👈 now expecting backend enum
  notes?: string;
}) => {
  // Backend numeric status → UI Status
  const mapStatus = (value: number): "Pending" | "Verified" | "Rejected" => {
    switch (value) {
      case 1:
        return "Verified";
      case 2:
        return "Rejected";
      default:
        return "Pending"; // 0 or unknown
    }
  };

  const normalized = mapStatus(status);

  const config = {
    Pending: {
      icon: Clock,
      wrapper: "bg-blue-50 border-blue-200",
      title: "text-blue-900",
      message: "text-blue-700",
      iconColor: "text-blue-600",
      titleText: "Documents Submitted",
      messageText: "Your KYC documents are under review. We'll notify you once verified.",
    },
    Verified: {
      icon: CheckCircle,
      wrapper: "bg-emerald-50 border-emerald-200",
      title: "text-emerald-900",
      message: "text-emerald-700",
      iconColor: "text-emerald-600",
      titleText: "KYC Verified",
      messageText: "Your identity has been successfully verified. No further action is needed.",
    },
    Rejected: {
      icon: XCircle,
      wrapper: "bg-red-50 border-red-200",
      title: "text-red-900",
      message: "text-red-700",
      iconColor: "text-red-600",
      titleText: "Submission Rejected",
      messageText: "Your submission was rejected. Please review the notes and resubmit.",
    },
  } as const;

  const current = config[normalized];
  const Icon = current.icon;

  return (
    <div className={`rounded-xl p-4 mb-6 flex items-start border ${current.wrapper}`}>
      <Icon className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${current.iconColor}`} />

      <div>
        <p className={`text-sm font-medium ${current.title}`}>{current.titleText}</p>
        <p className={`text-xs mt-1 ${current.message}`}>{current.messageText}</p>

        {normalized === "Rejected" && notes && (
          <p className="text-xs font-semibold text-red-800 mt-2 p-2 bg-red-100 rounded">
            Reason: {notes}
          </p>
        )}
      </div>
    </div>
  );
};
