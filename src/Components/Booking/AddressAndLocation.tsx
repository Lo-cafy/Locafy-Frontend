import { MapPin, CheckCircle, Plus } from "lucide-react";

interface AddressAndLocationProps {
  selectedAddress: string;
  onAddressChange: (address: string) => void;
}

export default function AddressAndLocation({ selectedAddress, onAddressChange }: AddressAndLocationProps) {
  const savedAddresses = [
    { id: "home", label: "Home", address: "123 Main St, Apt 4B, New York, NY 10001" },
    { id: "work", label: "Work", address: "456 Business Ave, Floor 12, New York, NY 10002" },
    { id: "other", label: "Other", address: "789 Park Road, New York, NY 10003" }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-green-600" />
        Address & Location
      </h2>
      
      <div className="space-y-3">
        {savedAddresses.map((address) => (
          <button
            key={address.id}
            onClick={() => onAddressChange(address.id)}
            className={`w-full p-3 rounded-lg border text-left transition ${
              selectedAddress === address.id
                ? "border-green-600 bg-green-50"
                : "border-gray-300 hover:border-green-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{address.label}</div>
                <div className="text-sm text-gray-600">{address.address}</div>
              </div>
              <CheckCircle className={`w-5 h-5 ${selectedAddress === address.id ? "text-green-600" : "text-gray-400"}`} />
            </div>
          </button>
        ))}
        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-green-600 hover:border-green-600 transition-colors">
          <Plus className="w-5 h-5 mx-auto" />
          <span className="text-sm">Add New Address</span>
        </button>
      </div>
    </div>
  );
}