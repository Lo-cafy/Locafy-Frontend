import { FormField } from "@/ui/formfield";

const accountTypes = [
  { v: "savings", l: "Savings Account" },
  { v: "current", l: "Current Account" },
  { v: "checking", l: "Checking Account" },
  { v: "overdraft", l: "Overdraft Account" },
];

interface Props {
  data: any;
  edit: boolean;
  errors: any;
  change: (key: string, value: any) => void;
}

export default function BankForm({ data, edit, errors, change }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FormField
        label="Account Holder Name"
        value={data.accountHolderName}
        isEdit={edit}
        onChange={(v) => change("accountHolderName", v)}
        error={errors.accountHolderName}
        placeholder="Enter name as per bank record"
      />

      <FormField
        label="Account Number"
        value={data.accountNumber}
        isEdit={edit}
        onChange={(v) => change("accountNumber", v)}
        error={errors.accountNumber}
        placeholder="e.g. 123456789012"
      />

      <FormField
        label="IFSC Code"
        value={data.ifscCode}
        isEdit={edit}
        onChange={(v) => change("ifscCode", v)}
        error={errors.ifscCode}
        placeholder="e.g. HDFC0001234"
      />

      <FormField
        label="Bank Name"
        value={data.bankName}
        isEdit={edit}
        onChange={(v) => change("bankName", v)}
        error={errors.bankName}
        placeholder="e.g. HDFC Bank"
      />

      <FormField
        label="Branch Name"
        value={data.branchName}
        isEdit={edit}
        onChange={(v) => change("branchName", v)}
        placeholder="e.g. Andheri West Branch"
      />

      <FormField
        label="Account Type"
        value={data.accountType}
        isEdit={edit}
        onChange={(v) => change("accountType", v)}
        opts={accountTypes}
        type="select"
      />
    </div>
  );
}
