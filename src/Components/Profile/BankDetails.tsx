import { useState } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Save, Edit2 } from "lucide-react";

export default function BankDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [bankName, setBankName] = useState("HDFC Bank");
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [ifscCode, setIfscCode] = useState("HDFC0001234");

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Bank Account Details
        </h2>
        {/* Edit Button */}
        <Button
          variant="ghost"
          onClick={() => setIsEditing(!isEditing)}
          className="p-1"
        >
          <Edit2 className="h-5 w-5 text-gray-600" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Bank Name */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">Bank Name</label>
          <Input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Enter bank name"
            className="bg-gray-50 border-gray-200"
            readOnly={!isEditing} // make read-only if not editing
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">Account Number</label>
          <Input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            className="bg-gray-50 border-gray-200"
            readOnly={!isEditing}
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">IFSC Code</label>
          <Input
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            placeholder="Enter IFSC code"
            className="bg-gray-50 border-gray-200"
            readOnly={!isEditing}
          />
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-end space-x-3">
             <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setIsEditing(false)}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Bank Details
          </Button>
        </div>
      )}
    </Card>
  );
}
