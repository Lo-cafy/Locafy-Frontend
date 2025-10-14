"use client";

import { useState } from "react";
import axios from "axios";
import { PersonalInfoStep } from "./personalIStep";
import { AccountInfoStep } from "./accountInfoStep";

export function SignUp({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    useReferral: false,
    referralCode: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleCheckbox = (field: "useReferral" | "agree", checked: boolean) => {
    setFormData({ ...formData, [field]: checked });
    setError("");
  };

  const nextStep = () => {
    if (!formData.firstName || !formData.lastName || !formData.age) {
      setError("Please fill in all required fields");
      return;
    }
    if (formData.useReferral && !formData.referralCode) {
      setError("Please enter referral code");
      return;
    }
    setError("");
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email && !formData.phoneNumber) {
      setError("Please enter email or phone number");
      return;
    }
    if (!formData.password || !formData.confirmPassword) {
      setError("Please enter password and confirm password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.agree) {
      setError("You must agree to terms & conditions");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("https://back-end-service-listing.onrender.com/mailUsers", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        referralCode: formData.useReferral ? formData.referralCode : "",
        signupDate: new Date().toISOString(),
      });

      console.log("Signup successful:", response.data);
      onSuccess();
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white backdrop-blur-lg rounded-2xl shadow-lg p-6 overflow-hidden relative">
      <h2 className="text-lg font-semibold text-gray-800 text-center">Create an Account</h2>

      <form onSubmit={handleSubmit} className="relative mt-6 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          <PersonalInfoStep
            formData={formData}
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
            nextStep={nextStep}
            error={error}
            isLoading={isLoading}
          />

          <AccountInfoStep
            formData={formData}
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
            onSwitch={onSwitch}
          />
        </div>
      </form>
    </div>
  );
}
