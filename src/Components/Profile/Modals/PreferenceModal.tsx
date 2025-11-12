import { ModalWrapper } from "./ModalWrapper";
import Preference from "../Prefrence";

export default function PreferenceModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      title="Availability Settings"
      description="Manage your availability and vacation settings"
    >
      <div className="p-6">
        <Preference />
      </div>
    </ModalWrapper>
  );
}