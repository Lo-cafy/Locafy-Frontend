import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Save, Edit2, X, Landmark } from "lucide-react";
import { Alert } from "@/ui/AlertProps";
import BankForm from "./BankForm";
import { usePaymentStore } from "@/hooks/useBankAccountStore";

interface BankDetailsProps {
  isModal?: boolean;
  initialEdit?: boolean;
  onEditChange?: (editing: boolean) => void;
  onSaveSuccess?: () => void;
}

export default function BankDetails({
  isModal = false,
  initialEdit = false,
  onEditChange,
  onSaveSuccess
}: BankDetailsProps) {
  const {
    bank,
    dataBank,
    edit: storeEdit,
    loading,
    err,
    success,
    errors,
    changeBank,
    submitBank,
    handleCancel: storeCancel,
    setEdit: setStoreEdit,
    loading: fetchLoading
  } = usePaymentStore();

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!fetchLoading) {
      setDataLoaded(true);
    }
  }, [fetchLoading]);

  useEffect(() => {
    if (dataLoaded && initialEdit !== undefined) {
      setStoreEdit(initialEdit);
    }
  }, [initialEdit, dataLoaded, setStoreEdit]);

  useEffect(() => {
    onEditChange?.(storeEdit);
  }, [storeEdit, onEditChange]);

  const handleSubmit = async () => {
    await submitBank();
    if (!err) {
      onSaveSuccess?.();
    }
  };

  const handleLocalCancel = () => {
    storeCancel();
    onEditChange?.(false);
  };

  if (fetchLoading || !dataLoaded) {
    return (
      <Card className={!isModal ? "bg-white shadow-sm border p-6" : ""}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      </Card>
    );
  }

  const content = (
    <>
      {!isModal && (
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
          {!storeEdit && bank && (
            <Button size="icon" onClick={() => setStoreEdit(true)} variant="ghost">
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {success && <Alert type="success" message={success} />}
      {err && <Alert type="error" message={err} />}

      <BankForm data={dataBank} edit={storeEdit} errors={errors} change={changeBank} />

      {storeEdit && (
        <div className="mt-8 pt-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={handleLocalCancel} disabled={loading} className="px-6">
            <X className="h-4 w-4 mr-2" />Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
            {loading ? "Saving..." : <><Save className="h-4 w-4 mr-2" />Save Bank Details</>}
          </Button>
        </div>
      )}
    </>
  );

  return isModal ? (
    <div className="space-y-6">{content}</div>
  ) : (
    <Card className="bg-white shadow-sm border p-6 relative">
      {content}
    </Card>
  );
}