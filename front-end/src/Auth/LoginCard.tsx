import { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export function LogIn({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[320px]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Login</h2>

      <div className="space-y-3">
       
        <Input type="email" placeholder="Email or Phone" />

        <div className="relative">
          <Input type={showPassword ? "text" : "password"} placeholder="Password" />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="flex justify-end">
          <button className="text-sm text-emerald-600 hover:underline">
            Forgot password?
          </button>
        </div>
        <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
          Login
        </Button>
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Login with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-blue-600"
          >
            <FaFacebook size={20} /> Login with Facebook
          </Button>
        </div>

        {/* Switch to Sign Up */}
        <p className="text-sm text-gray-600 text-center mt-3">
          Don’t have an account?{" "}
          <button onClick={onSwitch} className="text-emerald-600 hover:underline">
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
