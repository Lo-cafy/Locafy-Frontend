import { useEffect } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { X } from "lucide-react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function ModalWrapper({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "2xl"
}: ModalWrapperProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${widthClasses[maxWidth]} max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </Card>
    </div>
  );
}