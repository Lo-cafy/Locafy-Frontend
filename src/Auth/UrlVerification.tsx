"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { Button } from "@/ui/button";
import { Loader2, CircleCheck, CircleX } from "lucide-react";
import api from "@/Api/baseurl";

interface UrlVerificationProps {
  onSuccess: () => void; 
}

export function UrlVerification({ onSuccess }: UrlVerificationProps) {

  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your account, please wait...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification link is missing or incomplete.");
      return;
    }

    const verifyToken = async () => {
      try {
        await api.post("/finalize-registration", { token });
        
        setStatus("success");
        setMessage("Your account has been successfully verified!");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed. The link may be invalid or expired.");
      }
    };

    verifyToken();
  }, []);

  if (status === "verifying") {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[350px] flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
        <h2 className="text-lg font-semibold text-gray-800">Verifying...</h2>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[350px] flex flex-col items-center gap-4 text-center">
        <CircleCheck className="h-12 w-12 text-emerald-600" />
        <h2 className="text-lg font-semibold text-gray-800">Verification Successful!</h2>
        <p className="text-sm text-gray-600">{message}</p>
        <Button onClick={onSuccess} className="w-full bg-emerald-600 text-white hover:bg-emerald-700 mt-2">
          Continue to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-[350px] flex flex-col items-center gap-4 text-center">
      <CircleX className="h-12 w-12 text-red-500" />
      <h2 className="text-lg font-semibold text-gray-800">Verification Failed</h2>
      <p className="text-sm text-red-600">{message}</p>
      <Button onClick={onSuccess} variant="outline" className="w-full mt-2">
        Go to Homepage
      </Button>
    </div>
  );
}