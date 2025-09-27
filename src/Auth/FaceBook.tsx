// src/Auth/FacebookLoginButton.tsx
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { FaFacebookF } from "react-icons/fa";
import { Button } from "@/ui/button";
import type { User } from "@/types/auth.types";

interface FacebookUser {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

interface FacebookResponse {
  accessToken: string;
  userID: string;
}

export default function FacebookLoginButton() {
  const setUser = useAuthStore((state) => state.setUser);

  const handleSuccess = async (response: FacebookResponse) => {
    const { accessToken, userID } = response;

    if (!accessToken) {
      console.error("No access token received from Facebook");
      return;
    }

    try {
      // Fetch user profile from Facebook Graph API
      const profileRes = await axios.get<FacebookUser>(
        `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
      );

      const profile = profileRes.data;

      // Convert Facebook user data to your User type
      const userData: User = {
        id: profile.id,
        name: profile.name,
        email: profile.email || "",
        role: "user",
        isVerified: true, // Facebook users are pre-verified
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profileImage: profile.picture?.data?.url || undefined
      };

      // Save user data to backend and get complete user profile
      const response = await axios.post<{ user: User }>(
        "http://localhost:5000/auth/facebook",
        userData
      );

      // Update authentication state with the complete user profile from backend
      setUser(response.data.user);
    } catch (error) {
      console.error("Error during Facebook authentication:", error);
    }
  };

  const handleFail = (error: unknown) => {
    console.error("Facebook authentication failed:", error);
  };

  return (
    <FacebookLogin
      appId="633177613199219" // Replace with your actual App ID
      fields="name,email,picture"
      onSuccess={handleSuccess}
      onFail={handleFail}
      render={({ onClick }) => (
        <Button
          type="button"
          onClick={onClick}
          variant="outline"
          className="flex-1 flex items-center gap-2 border border-gray-300 bg-blue-600 text-white hover:bg-blue-700"
        >
          <FaFacebookF />Facebook
        </Button>
      )}
    />
  );
}