"use client";

import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import { MailCheck, RotateCcw } from "lucide-react";
import api from "@/Api/baseurl";
import { toast } from "react-toastify";

interface EmailSentProps {
  email: string;
  onSwitch: () => void; // To switch back to the Sign In view
}

export function EmailSentNotification({ email, onSwitch }: EmailSentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResend = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setMessage("");
    setError("");
    try {
     const res = (await api.post("/users/resend-verification", { email })).data;
     if(res.success){
      setMessage("A new verification link has been sent.");
      toast.success(res.message)
      setCanResend(false);
      setCountdown(120);
     }else{
        toast.error(res.message)
     }
    } catch (err:any) {
      setError("Failed to resend. Please try again later.");
              toast.error(err.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center gap-4 h-full justify-center">
      <MailCheck className="h-16 w-16 text-emerald-500" />
      <h2 className="text-xl font-semibold text-gray-800">Check Your Email</h2>
      <p className="text-sm text-gray-600">
        We've sent a verification link to <br />
        <span className="font-medium text-gray-900">{email}</span>.
      </p>
      
      {message && <p className="text-sm text-emerald-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-4 w-full flex flex-col items-center gap-2">
        <p className="text-xs text-gray-500">Didn't receive the email?</p>
        <Button
          variant="link"
          onClick={handleResend}
          disabled={!canResend || isLoading}
          className="p-0 h-auto text-sm font-medium text-blue-600 disabled:text-gray-400 disabled:no-underline"
        >
          <RotateCcw size={14} className="mr-1.5" />
          {isLoading ? "Sending..." : `Resend Email ${canResend ? "" : `in ${countdown}s`}`}
        </Button>
      </div>

      <Button variant="outline" onClick={onSwitch} className="w-full mt-4">
        Back to Sign In
      </Button>
    </div>
  );
}