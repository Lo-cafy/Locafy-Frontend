import { Check } from "lucide-react";

interface ExtrasAndAddonsProps {
  selectedAddons: string[];
  onAddonsChange: (addons: string[]) => void;
}

export default function ExtrasAndAddons({ selectedAddons, onAddonsChange }: ExtrasAndAddonsProps) {
  const addons = [
    { id: "express", name: "Express Delivery", price: 200, description: "Get your service within 24 hours" },
    { id: "ironing", name: "Ironing Service", price: 100, description: "Professional ironing included" },
    { id: "eco", name: "Eco-friendly Detergent", price: 50, description: "Environmentally safe cleaning" },
    { id: "fragrance", name: "Premium Fragrance", price: 75, description: "Add your favorite scent" }
  ];

  const handleAddonToggle = (addonId: string) => {
    const newAddons = selectedAddons.includes(addonId) 
      ? selectedAddons.filter(id => id !== addonId)
      : [...selectedAddons, addonId];
    onAddonsChange(newAddons);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4">Extras & Add-ons</h2>
      
      <div className="space-y-3">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={`p-4 rounded-lg border cursor-pointer transition ${
              selectedAddons.includes(addon.id)
                ? "border-green-600 bg-green-50"
                : "border-gray-300 hover:border-green-300"
            }`}
            onClick={() => handleAddonToggle(addon.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedAddons.includes(addon.id)
                    ? "border-green-600 bg-green-600"
                    : "border-gray-300"
                }`}>
                  {selectedAddons.includes(addon.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-black">{addon.name}</div>
                  <div className="text-sm text-gray-600">{addon.description}</div>
                </div>
              </div>
              <span className="text-green-600 font-semibold">+${addon.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}