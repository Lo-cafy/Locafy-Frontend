
interface CustomerInformationProps {
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  specialInstructions: string;
  onCustomerInfoChange: (field: string, value: string) => void;
  onSpecialInstructionsChange: (instructions: string) => void;
}

export default function CustomerInformation({
  customerInfo,
  specialInstructions,
  onCustomerInfoChange,
  onSpecialInstructionsChange
}: CustomerInformationProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4">Customer Information</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Name</label>
          <input
            type="text"
            value={customerInfo.name}
            onChange={(e) => onCustomerInfoChange("name", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">Phone</label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => onCustomerInfoChange("phone", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-2">Email</label>
        <input
          type="email"
          value={customerInfo.email}
          onChange={(e) => onCustomerInfoChange("email", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">Special Instructions</label>
        <textarea
          value={specialInstructions}
          onChange={(e) => onSpecialInstructionsChange(e.target.value)}
          placeholder="Any special requirements or instructions for the provider..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent h-20 resize-none"
        />
      </div>
    </div>
  );
}