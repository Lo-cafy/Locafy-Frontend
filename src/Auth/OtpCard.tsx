import { Button } from "@/ui/button";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

import {InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot} from "@/ui/input-otp"


export function OtpInput({ onSwitch }: { onSwitch: () => void }) {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    console.log("Verifying OTP:", otp);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[320px]">
      <h2 className="text-lg font-semibold text-gray-800 text-center">Verify Your Account</h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        A verification code has been sent to your email.
      </p>

      <div className="flex gap-2 justify-center mt-6">
        <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button onClick={handleVerify} className="w-full bg-emerald-600 text-white hover:bg-emerald-700 mt-6">
        Verify Code
      </Button>

      <div className="flex justify-center mt-3">
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-emerald-600 hover:underline"
        >
          <RotateCcw size={16} /> Resend Code
        </button>
      </div>

      <p className="text-sm text-center text-gray-600 mt-3">
        Didn’t sign up?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-emerald-600 hover:underline"
        >
          Go Back
        </button>
      </p>
    </div>
  );
}