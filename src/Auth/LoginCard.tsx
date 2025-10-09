import { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import GoogleLoginButton from "./Google"; 
import { useAuthStore } from "@/store/authStore"; // Import your auth store
import api from "@/Api/baseurl";
import { toast } from "react-toastify";

export function LogIn({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
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
      // Fetch all users from the server
      const response = (await api.post("/Auth/login",loginData)).data;
    if(response.sucess){
      toast.success(response.message)
              console.log("Login successful:", response.data);
        const userData = {
          id: response.id || response.email, // Use email as ID if no id field
          name: `${response.firstname} ${response.lastname}`,
          email: response.email,
        };
         setUser(userData); // This will save to both Zustand and localStorage

      } else {
        console.log(response);
        
        toast.error(response.message)
      }
    } catch (error:any) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[320px]">
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