import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { FaFacebookF } from "react-icons/fa";
import { Button } from "@/ui/button";

interface FacebookUser {
  id: string;
  name: string;
  email: string;
  picture: string;
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
      const profileRes = await axios.get(
        `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
      );

      const profile = profileRes.data;

      const userData: FacebookUser = {
        id: profile.id,
        name: profile.name,
        email: profile.email || "",
        picture: profile.picture?.data?.url || "",
      };

      // Update authentication state
      setUser(userData);

      // Save user data to backend
      await axios.post("http://localhost:5000/facebookUsers", userData);
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