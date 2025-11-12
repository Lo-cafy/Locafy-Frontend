import { useState, useEffect } from "react";
import { Card } from '@/ui/card';
import UPIForm from './UPIForm';
import { Button } from '@/ui/button';
import { CreditCard, Edit2, Save, X } from 'lucide-react';
import { Alert } from '@/ui/AlertProps';
import { usePaymentStore } from '@/hooks/useBankAccountStore';

interface UPIDetailsProps {
  isModal?: boolean;
  initialEdit?: boolean;
  onEditChange?: (editing: boolean) => void;
  onSaveSuccess?: () => void;
}

export default function UPIDetails({
  isModal = false,
  initialEdit = false,
  onEditChange,
  onSaveSuccess
}: UPIDetailsProps) {
  const {
    upi,
    dataUPI,
    edit: storeEdit,
    loading,
    err,
    success,
    errors,
    changeUPI,
    submitUPI,
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
    await submitUPI();
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
          <div className="space-y-3">
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
            <CreditCard className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">UPI Account Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                {upi ? "Manage your UPI handle for payouts" : "Add a UPI account to receive payouts"}
              </p>
            </div>
          </div>
          {!storeEdit && upi && (
            <Button size="icon" onClick={() => setStoreEdit(true)} variant="ghost">
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {success && <Alert type="success" message={success} />}
      {err && <Alert type="error" message={err} />}

      <UPIForm data={dataUPI} edit={storeEdit} errors={errors} change={changeUPI} />

      {storeEdit && (
        <div className="mt-8 pt-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={handleLocalCancel} disabled={loading} className="px-6">
            <X className="h-4 w-4 mr-2" />Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            {loading ? "Saving..." : <><Save className="h-4 w-4 mr-2" />Save UPI Details</>}
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