import { FormField } from "@/ui/formfield";
import { addressTypes } from "../../types/addressConstants";

export function AddressForm({ data, edit, change, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Address Type"
          value={data.addressType}
          isEdit={edit}
          onChange={(v) => change("addressType", v)}
          opts={addressTypes}
          type="select"
        />
        <FormField
          label="Address Title"
          value={data.addressTitle}
          isEdit={edit}
          onChange={(v) => change("addressTitle", v)}
          error={errors.addressTitle}
        />
      </div>

      <FormField
        label="Address Line 1"
        value={data.addressLine1}
        isEdit={edit}
        onChange={(v) => change("addressLine1", v)}
        error={errors.addressLine1}
      />
      <FormField
        label="Address Line 2"
        value={data.addressLine2}
        isEdit={edit}
        onChange={(v) => change("addressLine2", v)}
      />
      <FormField
        label="Landmark"
        value={data.landmark}
        isEdit={edit}
        onChange={(v) => change("landmark", v)}
      />
      <FormField
        label="Postal Code"
        value={data.postalCode}
        isEdit={edit}
        onChange={(v) => change("postalCode", v)}
        error={errors.postalCode}
      />
    </div>
  );
}
