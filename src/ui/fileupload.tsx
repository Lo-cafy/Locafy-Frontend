import { FileCheck2, Upload, X } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  id: string;
  accept?: string;
  maxSize?: number;
  placeholder?: string;
  description?: string;
  showRemove?: boolean;
  variant?: "default" | "compact";
  error?: string;
}

export const FileUpload = ({
  file,
  onChange,
  label,
  required = false,
  disabled = false,
  id,
  accept = "image/*,application/pdf",
  maxSize = 10,
  placeholder = "Click to upload",
  description,
  showRemove = true,
  variant = "default",
  error
}: FileUploadProps) => {
  const isCompact = variant === "compact";
  const padding = isCompact ? "p-4" : "p-6";
  const iconSize = isCompact ? "h-6 w-6" : "h-8 w-8";

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(null);
  };

  const getFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`relative border-2 border-dashed rounded-xl transition-all ${padding} ${
          error
            ? "border-red-300 bg-red-50"
            : disabled
            ? "bg-gray-50 border-gray-200 cursor-not-allowed"
            : file
            ? "bg-emerald-50 border-emerald-300"
            : "bg-white border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/30"
        }`}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="hidden"
          id={id}
          disabled={disabled}
        />

        <label
          htmlFor={id}
          className={`flex flex-col items-center ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {file ? (
            <div className="w-full text-center">
              <FileCheck2 className={`${iconSize} text-emerald-600 mb-2 mx-auto`} />
              <p className="text-sm font-medium text-emerald-700 truncate px-2">
                {file.name}
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                {getFileSize(file.size)} • Uploaded successfully
              </p>
            </div>
          ) : (
            <div className="w-full text-center">
              <Upload className={`${iconSize} text-gray-400 mb-2 mx-auto`} />
              <p className="text-sm font-medium text-gray-700">{placeholder}</p>
              <p className="text-xs text-gray-500 mt-1">
                {description || `Accepted formats: ${accept.split(",").join(", ")} (max ${maxSize}MB)`}
              </p>
            </div>
          )}
        </label>

        {file && showRemove && !disabled && (
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
            aria-label="Remove file"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1 flex items-center">
          <span className="mr-1">⚠</span> {error}
        </p>
      )}
    </div>
  );
};

// Optional: Export type for consumers
export type { FileUploadProps };