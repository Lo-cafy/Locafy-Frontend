import { useState } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Save, Edit2, X, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export default function Preference() {
  const [isEditing, setIsEditing] = useState(false);
  const [serviceRadius, setServiceRadius] = useState("10");
  const [contactMethod, setContactMethod] = useState("Email & SMS");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const defaultCategories = ["Home Cleaning", "Handyman", "Pet Care", "Beauty", "Fitness", "Tutoring", "Tech Support", "Photography"];
  const defaultLanguages = ["English", "Spanish", "Hindi", "French", "German"];
  const defaultPayments = ["Cash", "Card", "UPI", "PayPal", "Bank Transfer"];

  const [selectedCategories, setSelectedCategories] = useState(["Home Cleaning", "Handyman", "Pet Care"]);
  const [selectedLanguages, setSelectedLanguages] = useState(["English"]);
  const [selectedPayments, setSelectedPayments] = useState(["Cash", "Card"]);

  const toggleSelection = (item: string, array: string[], setter: any) => {
    setter(array.includes(item) ? array.filter(i => i !== item) : [...array, item]);
  };

  const addCustomCategory = () => {
    if (customCategory.trim() && !selectedCategories.includes(customCategory)) {
      setSelectedCategories([...selectedCategories, customCategory]);
      setCustomCategory("");
    }
  };

  const SelectionGroup = ({ title, items, selected, setSelected, tooltip }: any) => (
    <div>
      <label className="block font-medium text-gray-900 mb-3 flex items-center gap-1">
        {title}
        <Tooltip>
          <TooltipTrigger><Info className="h-4 w-4 text-gray-400 cursor-pointer" /></TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </label>
      <div className="flex flex-wrap gap-3">
        {items.map((item: string) => (
          <Badge
            key={item}
            onClick={() => isEditing && toggleSelection(item, selected, setSelected)}
            className={`cursor-pointer px-3 py-2 ${
              selected.includes(item)
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-white shadow-sm border border-gray-100 p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Service Preferences</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-gray-700">
            <Edit2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <SelectionGroup
            title="Preferred Service Categories"
            items={defaultCategories}
            selected={selectedCategories}
            setSelected={setSelectedCategories}
            tooltip="Click to select preferred services. Add your own!"
          />
          
          <div className="flex flex-wrap gap-3 my-4">
            {selectedCategories
              .filter(cat => !defaultCategories.includes(cat))
              .map(custom => (
                <Badge
                  key={custom}
                  onClick={() => isEditing && toggleSelection(custom, selectedCategories, setSelectedCategories)}
                  className="cursor-pointer bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 px-3 py-2"
                >
                  {custom}
                  {isEditing && <X className="inline ml-1 h-3 w-3" />}
                </Badge>
              ))}
          </div>

          {isEditing && (
            <div className="flex gap-3">
              <Input
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Add custom preference..."
                className="bg-gray-50 border-gray-200"
              />
              <Button onClick={addCustomCategory} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Save className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          )}
        </div>

        {/* Service Radius & Contact */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-900 mb-2 flex items-center gap-1">
              Service Radius (miles)
              <Tooltip>
                <TooltipTrigger><Info className="h-4 w-4 text-gray-400 cursor-pointer" /></TooltipTrigger>
                <TooltipContent>Maximum distance you are willing to travel for a service.</TooltipContent>
              </Tooltip>
            </label>
            {isEditing ? (
              <Input
                value={serviceRadius}
                onChange={(e) => setServiceRadius(e.target.value)}
                type="number"
                className="bg-gray-50 border-gray-200"
              />
            ) : (
              <p className="text-gray-700">{serviceRadius} miles</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-2">Preferred Contact Method</label>
            {isEditing ? (
              <Input
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
                className="bg-gray-50 border-gray-200"
              />
            ) : (
              <p className="text-gray-700">{contactMethod}</p>
            )}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block font-medium text-gray-900 mb-2">Budget Range</label>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                placeholder="Min ($)"
                className="bg-gray-50 border-gray-200"
              />
              <Input
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="Max ($)"
                className="bg-gray-50 border-gray-200"
              />
            </div>
          ) : (
            <p className="text-gray-700">${minBudget || "0"} – ${maxBudget || "0"}</p>
          )}
        </div>

        {/* Languages */}
        <SelectionGroup
          title="Languages Spoken"
          items={defaultLanguages}
          selected={selectedLanguages}
          setSelected={setSelectedLanguages}
          tooltip="Select all languages you can communicate in."
        />

        {/* Payment Methods */}
        <SelectionGroup
          title="Preferred Payment Methods"
          items={defaultPayments}
          selected={selectedPayments}
          setSelected={setSelectedPayments}
          tooltip="Select how you want to receive payments."
        />
      </div>

      {/* Save / Cancel Buttons */}
      {isEditing && (
        <div className="mt-8 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setIsEditing(false)}>
            <Save className="h-4 w-4 mr-2" /> Save Preferences
          </Button>
        </div>
      )}
    </Card>
  );
}