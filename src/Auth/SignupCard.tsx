"use client";

import { useState } from "react";

// Your custom UI components
import { Button } from "@/ui/button";
import { Input } from "@/ui/input"; 

// Social login components
import GoogleLoginButton from "./Google";
import FacebookLoginButton from "./FaceBook";
import api from "@/Api/baseurl";
import { toast } from "react-toastify";

export function SignUp({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: (email: string) => void }) {
    const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    referralCode: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // State to manage the visibility of the referral code input
  const [showReferralInput, setShowReferralInput] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || null,
        referralCode: formData.referralCode || null,
      };

      const response = (await api.post("/users/register", payload)).data;
      if(response.success){
        toast.success(response.message)
      onSuccess(formData.email); 
      }else{
        toast.error(response.message)
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white backdrop-blur-lg rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 text-center">Create an Account</h2>

      <div className="mt-6 flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input name="email" type="email" value={formData.email} onChange={handleChange} disabled={isLoading} placeholder="Email Address*" />
          <Input name="password" type="password" value={formData.password} onChange={handleChange} disabled={isLoading} placeholder="Password (min. 8 characters)*" />
          <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} disabled={isLoading} placeholder="Confirm Password*" />
          <div className="flex gap-4">
            <Input name="firstName" type="text" value={formData.firstName} onChange={handleChange} disabled={isLoading} placeholder="First Name" />
            <Input name="lastName" type="text" value={formData.lastName} onChange={handleChange} disabled={isLoading} placeholder="Last Name" />
          </div>
          <Input name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} disabled={isLoading} placeholder="Phone Number" />
          
          {/* --- Conditional Referral Code Input --- */}
          {showReferralInput ? (
            <Input
              name="referralCode"
              type="text"
              value={formData.referralCode}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Referral Code"
            />
          ) : (
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm font-medium text-blue-600 hover:underline self-start"
              onClick={() => setShowReferralInput(true)}
            >
              Have a referral code?
            </Button>
          )}
          
          {error && <p className="text-sm text-center text-red-600 -my-2">{error}</p>}

          <Button type="submit" className="w-full bg-emerald-600 text-white hover:bg-emerald-700" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 flex-shrink-0 text-xs font-medium text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <GoogleLoginButton />
          <FacebookLoginButton />
        </div>
        
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Button variant="link" onClick={onSwitch} className="p-0 h-auto font-medium text-blue-600">
            Sign In
          </Button>
        </p>
      </div>
    </div>
  );
}