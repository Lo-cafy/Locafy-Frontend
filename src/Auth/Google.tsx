import { useGoogleLogin } from "@react-oauth/google";
import api from "@/Api/baseurl";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
    const setUser = useAuthStore((state) => state.setUser);
    const handleGoogleLogin = async (tokenResponse: any) => {
        console.log("Google Token Response:", tokenResponse);

        // get user info from Google API using the access_token
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const userObj = {
            id: res.data.sub,
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture,
        };

        setUser(userObj);
        console.log("Google signup successful:", userObj);

        // Save to db.json
        api.post("/googleUsers", userObj)
            .then((r) => console.log("Saved to db.json:", r.data))
            .catch((err) => console.error("Failed to save to db.json:", err));
    };


    const login = useGoogleLogin({
        onSuccess: handleGoogleLogin,
        onError: () => console.log("Google login failed"),
    });

    return (
        <Button
            type="button"
            onClick={() => login()}
            variant="outline"
            className="flex-1 flex items-center gap-2 border border-gray-300 hover:bg-green-800 hover:text-white"
        >
            <FcGoogle /> Google
        </Button>
    );
}