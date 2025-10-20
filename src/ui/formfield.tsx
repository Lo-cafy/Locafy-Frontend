import { Input } from "./input";

interface Option {
  v: string;
  l: string;
}

interface FormFieldProps {
  label: string;
  value: string;
  isEdit: boolean;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "date" | "tel"|"select";
  opts?: Option[];
  max?: number;
  placeholder?: string;
}

export const FormField = ({
  label,
  value,
  isEdit,
  onChange,
  error,
  type = "text",
  opts,
  max,
  placeholder
}: FormFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {isEdit ? (
      <>
        {opts ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select {label.toLowerCase()}</option>
            {opts.map((o) => (
              <option key={o.v} value={o.v}>
                {o.l}
              </option>
            ))}
          </select>
        ) : (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={max}
            placeholder={placeholder}
            className={error ? "border-red-300" : ""}
          />
        )}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </>
    ) : (
      <p className="text-gray-900 py-2">
        {type === "date" && value
          ? new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          : opts && value
          ? opts.find((o) => o.v === value)?.l
          : value || "—"}
      </p>
    )}
  </div>
);

export type { FormFieldProps, Option };