import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import { Edit2 } from "lucide-react";
import { ModalWrapper } from "./ModalWrapper";
import AddressDetails from "../AddressDetails";

export default function AddressModal({ onClose }: { onClose: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowEditButton(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      title="Address Details"
      description="Manage your primary address"
      maxWidth="2xl"
    >
      <div className="p-6">
        {showEditButton && !isEditing && (
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Address
            </Button>
          </div>
        )}
        <AddressDetails
          isModal={true}
          initialEdit={isEditing}
          onEditChange={setIsEditing}
          onSaveSuccess={() => setTimeout(() => onClose(), 1500)}
        />
      </div>
    </ModalWrapper>
  );
}