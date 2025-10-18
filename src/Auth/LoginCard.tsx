import { useState } from "react";
import { isAxiosError } from "axios";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import GoogleLoginButton from "./Google"; 
import { useAuthStore } from "@/store/authStore"; // Import your auth store
import api from "@/Api/baseurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function LogIn({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cardStyles = "bg-white rounded-2xl shadow-lg p-6 w-[320px] min-h-[520px]";
  
  // Get the setUser function from your auth store
  const setUser = useAuthStore((state) => state.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const resp = await api.post("/Auth/login", loginData);
      const data = resp.data as Record<string, any>;

      const isSuccess = resp.status === 200 && (data.success === true || data.sucess === true || !!data.user);

      if (isSuccess && data.user) {
        toast.success("Login successful");
        const rawRole =
          data.user.role ?? data.role ?? data.user.roles?.[0] ?? data.roles?.[0] ?? "user";
        const roleStr = String(rawRole || "user").toLowerCase();
        const mappedRole: "user" | "provider" | "admin" | "superadmin" =
          roleStr === "provider"
            ? "provider"
            : roleStr === "admin"
            ? "admin"
            : roleStr === "superadmin"
            ? "superadmin"
            : "user";

        const userData = {
          id: data.user.userId || data.user.email,
          name: `${data.firstname ?? data.user.firstname ?? ""} ${data.lastname ?? data.user.lastname ?? ""}`.trim(),
          email: data.user.email,
          role: mappedRole,
        };
        setUser(userData);  
        const destination = mappedRole === "provider" ? "/provider" : "/all-services";
        console.info("Login successful for:", userData.email, "role:", mappedRole, "->", destination);
        navigate(destination);
      } else {
        console.warn("Login rejected:", data);
        toast.error(String(data.message || "Invalid email or password"));
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const apiMsg = (error.response?.data as any)?.message;
        if (status === 401) {
          setError("Invalid email or password");
          toast.error("Invalid email or password");
        } else {
          setError(apiMsg || error.message || "Login failed. Please try again.");
          toast.error(apiMsg || "Login failed. Please try again.");
        }
        console.error("Login error (axios):", { status, data: error.response?.data });
      } else {
        const message = error instanceof Error ? error.message : "Login failed. Please try again.";
        setError(message);
        toast.error(message);
        console.error("Login error:", error);
      }
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

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

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