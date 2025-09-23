import { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import GoogleLoginButton from "./Google"; 
import axios from "axios";
import { useAuthStore } from "@/hooks/useAuth"; 

export function LogIn({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
 
 const { setUser } = useAuthStore(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
    
      const response = await axios.get("http://localhost:5000/mailUsers");
      const users = response.data;

   
      const user = users.find((user: any) => 
        user.email === loginData.email && user.password === loginData.password
      );

      if (user) {
        console.log("Login successful:", user);
        
      const userData = {
        id: user.id || user.email,
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,   
        picture: user.profilePhoto,   
        firstName: user.firstname,
        lastName: user.lastname,
        role: user.role || 'user'
      };
        
        setUser(userData);  
        
      } else {
        setError("Invalid email or password");
        console.error("Login failed: Invalid credentials");
      }
    } catch (error) {
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