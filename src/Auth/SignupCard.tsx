// src/components/SignUp.tsx

"use client";

import { useState } from "react";
import api from "@/Api/baseurl";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { SignUpForm } from "./SignUpForm";
import {signUpValidationSchema} from "@/Utils/validation.tsx"

// Define the component props
interface SignUpProps {
  onSwitch: () => void;
  onSuccess: (email: string) => void;
}

export function SignUp({ onSwitch, onSuccess }: SignUpProps) {
  const [showReferralInput, setShowReferralInput] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      referralCode: "",
    },
    validationSchema: signUpValidationSchema, // Use the imported schema
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ...values,
          phoneNumber: values.phoneNumber || null,
          referralCode: values.referralCode || null,
        };
        const response = (await api.post("/users/register", payload)).data;
        if (response.success) {
          toast.success(response.message);
          onSuccess(values.email);
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <SignUpForm
      formik={formik}
      onSwitch={onSwitch}
      showReferralInput={showReferralInput}
      setShowReferralInput={setShowReferralInput}
    />
  );
}