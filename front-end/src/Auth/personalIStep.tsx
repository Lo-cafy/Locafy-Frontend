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
  nextStep: () => void;
  error: string;
  isLoading: boolean;
}

export function PersonalInfoStep({ formData, handleChange, handleCheckbox, nextStep, error, isLoading }: Props) {
  return (
    <div className="w-full flex-shrink-0 space-y-4 pr-4">
      <div className="grid gap-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName}
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

      <div className="flex items-center gap-2">
        <Checkbox
          id="useReferral"
          checked={formData.useReferral}
          onCheckedChange={(checked) => handleCheckbox("useReferral", checked as boolean)}
          disabled={isLoading}
        />
        <Label htmlFor="useReferral" className="text-sm text-gray-600">
          I have a referral code
        </Label>
      </div>

      {formData.useReferral && (
        <div className="flex gap-2">
          <Input
            name="referralCode"
            placeholder="Enter referral code"
            value={formData.referralCode}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Button type="button" onClick={nextStep} className="px-4">
            Next
          </Button>
        </div>
      )}

      {!formData.useReferral && (
        <Button type="button" onClick={nextStep} className="w-full">
          Next
        </Button>
      )}

       <div className="flex gap-3">
              <GoogleLoginButton />
              <FacebookLoginButton />
            </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
