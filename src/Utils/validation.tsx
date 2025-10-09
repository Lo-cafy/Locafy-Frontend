// src/validation/authValidation.ts

import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, "Must be a valid 10-digit mobile number")
    .nullable(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  referralCode: Yup.string().nullable(),
});