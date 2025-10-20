import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

const alertConfig = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    icon: CheckCircle,
    iconColor: "text-emerald-600"
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: AlertCircle,
    iconColor: "text-red-600"
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: AlertTriangle,
    iconColor: "text-yellow-600"
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: Info,
    iconColor: "text-blue-600"
  }
};

export const Alert = ({ type, message, className = "" }: AlertProps) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-xl p-4 flex items-start ${className}`}
    >
      <Icon className={`h-5 w-5 ${config.iconColor} mr-3 mt-0.5 flex-shrink-0`} />
      <p className={`text-sm ${config.text}`}>{message}</p>
    </div>
  );
};

export type { AlertType, AlertProps };