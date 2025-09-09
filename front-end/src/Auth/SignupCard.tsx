import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import { FaFacebook } from "react-icons/fa";
import GoogleLoginButton from "@/Auth/Google"; // Import your component

export function SignUp({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    agree: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckbox = (checked: boolean) => {
    setFormData({ ...formData, agree: checked });
    if (checked) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      setError("You must agree to the terms & conditions.");
      return;
    }
    setError("");
    console.log("Form Data:", formData);
    onSuccess();
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
            required/>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            name="lastname"
            placeholder="Enter last name"
            value={formData.lastname}
            onChange={handleChange}
            required/>
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
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agree}
              onCheckedChange={handleCheckbox}
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
        >
          GET OTP
        </Button>

        <div className="flex items-center gap-2 my-2">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <div className="flex gap-3">
          {/* Use the GoogleLoginButton component */}
          <GoogleLoginButton />
          
          <Button
            type="button"
            variant="outline"
            className="flex-1 flex items-center gap-2 text-blue-600 border border-blue-600"
          >
            <FaFacebook className="text-blue-600" />Facebook
          </Button>
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-emerald-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}