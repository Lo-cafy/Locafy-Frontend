import { Input } from "../../ui/input";

interface UPIFormProps {
  data: any;
  edit: boolean;
  errors: any;
  change: (key: string, value: any) => void;
}

export default function UPIForm({ data, edit, errors, change }: UPIFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">UPI Handle</label>
        {edit ? (
          <Input
            value={data.upiHandle || ""}
            onChange={(e) => change("upiHandle", e.target.value)}
            placeholder="Enter your UPI handle"
          />
        ) : (
          <p className="text-gray-700">{data.upiHandle || "-"}</p>
        )}
        {errors.upiHandle && <p className="text-red-600 text-sm">{errors.upiHandle}</p>}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Display Name</label>
        {edit ? (
          <Input
            value={data.displayName || ""}
            onChange={(e) => change("displayName", e.target.value)}
            placeholder="Enter display name"
          />
        ) : (
          <p className="text-gray-700">{data.displayName || "-"}</p>
        )}
        {errors.displayName && <p className="text-red-600 text-sm">{errors.displayName}</p>}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Primary Account?</label>
        {edit ? (
          <select
            value={data.isPrimary ? "yes" : "no"}
            onChange={(e) => change("isPrimary", e.target.value === "yes")}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        ) : (
          <p className="text-gray-700">{data.isPrimary ? "Yes" : "No"}</p>
        )}
      </div>
    </div>
  );
}
