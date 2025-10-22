import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Save, Edit2, X, Landmark } from "lucide-react";
import { Alert } from "@/ui/AlertProps";
import BankForm from "./BankForm";
import { usePaymentStore } from "@/hooks/useBankAccountStore";

export default function PaymentDetails() {
  const {
    bank,
    dataBank,
    edit,
    loading,
    err,
    success,
    errors,
    changeBank,
    submitBank,
    handleCancel,
    setEdit,
  } = usePaymentStore();

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Landmark className="h-6 w-6 text-emerald-600 mr-3" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Bank Account Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                {bank ? "Manage your bank account for payouts" : "Add a bank account to receive payouts"}
              </p>
            </div>
          </div>
          {!edit && bank && (
            <Button size="icon" onClick={() => setEdit(true)} variant="ghost">
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {success && <Alert type="success" message={success} />}
        {err && <Alert type="error" message={err} />}

        <BankForm data={dataBank} edit={edit} errors={errors} change={changeBank} />

        {edit && (
          <div className="mt-8 pt-6 border-t flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="px-6"
            >
              <X className="h-4 w-4 mr-2" />Cancel
            </Button>
            <Button
              onClick={submitBank}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
            >
              {loading ? "Saving..." : <>
                <Save className="h-4 w-4 mr-2" />Save Bank Details
              </>}
            </Button>
          </div>
        )}
      </Card>
  );
}
