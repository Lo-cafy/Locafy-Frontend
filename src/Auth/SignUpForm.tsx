
"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import GoogleLoginButton from "./Google";
import FacebookLoginButton from "./FaceBook";
import { type FormikProps } from "formik";
// Define the type for the form values
interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referralCode: string;
}

// Define the props for this component
interface SignUpFormProps {
  formik: FormikProps<SignUpFormValues>;
  onSwitch: () => void;
  showReferralInput: boolean;
  setShowReferralInput: (show: boolean) => void;
}
export function SignUpForm({ formik, onSwitch, showReferralInput, setShowReferralInput }: SignUpFormProps) {
  return (
    <div className="w-full max-w-md bg-white backdrop-blur-lg rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 text-center">Create an Account</h2>
      <div className="mt-6 flex flex-col gap-4">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex gap-4">
            <div className="w-1/2">
              {/* This style is fine, no getFieldProps used */}
              <Input
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                placeholder="First Name*"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-xs text-red-600 mt-1">{formik.errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <Input
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                placeholder="Last Name*"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-xs text-red-600 mt-1">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            {/* FIX: Removed redundant name="email" */}
            <Input {...formik.getFieldProps('email')} disabled={formik.isSubmitting} placeholder="Email Address*" />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            {/* FIX: Removed redundant name="phoneNumber" */}
            <Input {...formik.getFieldProps('phoneNumber')} disabled={formik.isSubmitting} placeholder="Phone Number" />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.phoneNumber}</p>
            )}
          </div>
          <div>
            {/* FIX: Removed redundant name="password" */}
            <Input type="password" {...formik.getFieldProps('password')} disabled={formik.isSubmitting} placeholder="Password (min. 8 characters)*" />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.password}</p>
            )}
          </div>
          <div>
            {/* FIX: Removed redundant name="confirmPassword" */}
            <Input type="password" {...formik.getFieldProps('confirmPassword')} disabled={formik.isSubmitting} placeholder="Confirm Password*" />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>
          
          {showReferralInput ? (
             // FIX: Removed redundant name="referralCode"
             <Input {...formik.getFieldProps('referralCode')} disabled={formik.isSubmitting} placeholder="Referral Code" />
          ) : (
            <Button type="button" variant="link" className="p-0 h-auto text-sm font-medium text-blue-600 hover:underline self-start" onClick={() => setShowReferralInput(true)}>
              Have a referral code?
            </Button>
          )}

          <Button type="submit" className="w-full bg-emerald-600 text-white hover:bg-emerald-700" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-4 flex-shrink-0 text-xs font-medium text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200" />
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