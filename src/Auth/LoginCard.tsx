import { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import GoogleLoginButton from "./Google"; 
import { useAuthStore } from "@/store/authStore";
import api from "@/Api/baseurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function LogIn({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cardStyles = "bg-white rounded-2xl shadow-lg p-6 w-[320px] min-h-[520px]";

  // Auth store
  const setUser = useAuthStore((state) => state.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = (await api.post("/Auth/login", loginData)).data;
      console.log("Login response:", response);

     if (response.accessToken) { 
  toast.success("Login successful");

  // Save access token in cookie
  Cookies.set("accessToken", response.accessToken, {
    expires: 1, // 1 day
    sameSite: "strict",
  });

  const userData = {
    id: response.user.userId || response.user.email,
    name: `${response.user.firstName || ""} ${response.user.lastName || ""}`,
    email: response.user.email,
    role: response.user.role || "customer", // Include role from backend
  };

  setUser(userData);
  
  // Role-based navigation after successful login
  const userRole = (response.user.role || "customer").toLowerCase();
  
  switch(userRole) {
    case "customer":
      navigate("/all-services");
      break;
    case "provider":
      navigate("/provider");
      break;
    case "admin":
      navigate("/admin");
      break;
    case "superadmin":
    case "super_admin":
      navigate("/superadmin");
      break;
    default:
      navigate("/all-services"); // Default fallback for unknown roles
  }
} else {
  toast.error(response.message || "Login failed");
}
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cardStyles}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Login</h2>

      <form onSubmit={handleLogin} className="space-y-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-emerald-600 hover:underline"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="flex flex-col space-y-2">
          <GoogleLoginButton />

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-blue-600"
            disabled={isLoading}
          >
            <FaFacebook size={20} /> Login with Facebook
          </Button>
        </div>

        {/* Switch to Sign Up */}
        <p className="text-sm text-gray-600 text-center mt-3">
          Don't have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-emerald-600 hover:underline"
            disabled={isLoading}
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
}
