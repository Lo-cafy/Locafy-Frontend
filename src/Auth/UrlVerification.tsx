"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Loader2, CircleCheck, CircleX } from "lucide-react";
import api from "@/Api/baseurl";


export function UrlVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState(
    "Verifying your account, please wait..."
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification link is missing or incomplete.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = (await api.post("/users/finalize-registration", { token }))
          .data;
        if (res.success) {
          setStatus("success");
          setMessage("Your account has been successfully verified!");
        } else {
          setStatus("error");
          setMessage(res.message || "An unexpected error occurred.");
        }
      } catch (err: unknown) {
        setStatus("error");
        type ApiError = { response?: { data?: { message?: string } } };
        const apiErr = err as ApiError;
        const messageOverride = apiErr.response?.data?.message;
        setMessage(
          messageOverride ?? "Verification failed. The link may be invalid or expired."
        );
      }
    };

    verifyToken();
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <>
            <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
            <h2 className="text-2xl font-bold text-slate-800">Verifying...</h2>
            <p className="text-base text-slate-600">{message}</p>
          </>
        );
      case "success":
        return (
          <>
            <CircleCheck className="h-16 w-16 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Verification Successful!
            </h2>
            <p className="text-base text-slate-600">{message}</p>
            <Button
              onClick={()=>navigate('/provider')}
              className="w-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 mt-4 py-3 rounded-lg transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Continue
            </Button>
          </>
        );
      case "error":
        return (
          <>
            <CircleX className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-slate-800">
              Verification Failed
            </h2>
            <p className="text-base text-red-600">{message}</p>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full mt-4 py-3 font-semibold rounded-lg transition-all hover:bg-slate-50"
            >
              Go to Homepage
            </Button>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm flex flex-col items-center gap-5 text-center transition-all">
        {renderContent()}
      </div>
    </div>
  );
}