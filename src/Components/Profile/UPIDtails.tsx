import { Card } from '@/ui/card'
import UPIForm from './UPIForm'
import { Button } from '@/ui/button'
import { CreditCard, Edit2, Save, X } from 'lucide-react'
import { usePaymentStore } from '@/hooks/useBankAccountStore';

export default function UPIDtails() {
    const {
        upi,
        dataUPI,
        edit,
        loading,
        errors,
        changeUPI,
        submitUPI,
        handleCancel,
        setEdit,
      } = usePaymentStore();
  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">
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
          {!edit && upi && (
            <Button size="icon" onClick={() => setEdit(true)} variant="ghost">
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <UPIForm data={dataUPI} edit={edit} errors={errors} change={changeUPI} />

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
              onClick={submitUPI}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
            >
              {loading ? "Saving..." : <>
                <Save className="h-4 w-4 mr-2" />Save UPI Details
              </>}
            </Button>
          </div>
        )}
      </Card>
  )
}
