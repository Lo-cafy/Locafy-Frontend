import { ModalWrapper } from "./ModalWrapper";
import KYC from "../Kyc";

export default function KYCModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      title="KYC Verification"
      description="Complete your identity verification"
      maxWidth="2xl"
    >
      <div className="p-6">
        <KYC />
      </div>
    </ModalWrapper>
  );
}