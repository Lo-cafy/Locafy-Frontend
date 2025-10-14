import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import GoogleLoginButton from "./Google";
import FacebookLoginButton from "./FaceBook";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (field: "useReferral" | "agree", checked: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
  isLoading: boolean;
  onSwitch: () => void;
}

export function AccountInfoStep({ formData, handleChange, handleCheckbox,  error, isLoading, onSwitch }: Props) {
  return (
    <div className="w-full flex-shrink-0 space-y-4 pl-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="agree"
          checked={formData.agree}
          onCheckedChange={(checked) => handleCheckbox("agree", checked as boolean)}
          disabled={isLoading}
        />
        <Label htmlFor="agree" className="text-sm text-gray-600">
          I agree to the <a href="#" className="text-emerald-600 hover:underline">terms & conditions</a>
        </Label>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-900 text-white" disabled={isLoading}>
        {isLoading ? "Processing..." : "GET OTP"}
      </Button>

      <div className="flex items-center gap-2 my-2">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-gray-500 text-sm">OR</span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      <div className="flex gap-3">
        <GoogleLoginButton />
        <FacebookLoginButton />
      </div>

      <p className="text-sm text-center text-gray-600 mt-2">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-emerald-600 hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
}
