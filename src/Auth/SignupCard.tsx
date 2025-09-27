import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import GoogleLoginButton from "./Google"; // Import your component
import axios from "axios";
import FacebookLoginButton from "./FaceBook";

export function SignUp({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckbox = (checked: boolean) => {
    setFormData({ ...formData, agree: checked });
    if (checked) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agree) {
      setError("You must agree to the terms & conditions.");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      // Send form data to the server
      const response = await axios.post("http://localhost:5000/mailUsers", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        age: formData.age,
        agree: formData.agree,
        signupDate: new Date().toISOString()
      });
      
      console.log("Form Data submitted successfully:", response.data);
      onSuccess();
    } catch (error) {
      console.error("Failed to submit form data:", error);
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white backdrop-blur-lg rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 text-center">Create an Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">

        <div className="grid gap-2">
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            name="firstname"
            placeholder="Enter first name"
            value={formData.firstname}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            name="lastname"
            placeholder="Enter last name"
            value={formData.lastname}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agree}
              onCheckedChange={handleCheckbox}
              disabled={isLoading}
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                terms & conditions
              </a>
            </Label>
          </div>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-900 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "GET OTP"}
        </Button>

        <div className="flex items-center gap-2 my-2">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <div className="flex gap-3">
          {/* Use the GoogleLoginButton component */}
          <GoogleLoginButton />
          
          <FacebookLoginButton />
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-emerald-600 hover:underline"
            disabled={isLoading}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}