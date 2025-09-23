// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useAuthStore} from "@/hooks/useAuth"; 
// import { Button } from "@/ui/button";
// import { FcGoogle } from "react-icons/fc";

// export default function GoogleLoginButton() {
//     const { setUser } = useAuthStore();

//     const handleGoogleLogin = async (tokenResponse: any) => {
//         try {
//             const res = await axios.get(
//                 "https://www.googleapis.com/oauth2/v3/userinfo",
//                 {
//                     headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//                 }
//             );

//             const userObj = {
//                 id: res.data.sub,
//                 name: res.data.name,
//                 email: res.data.email,
//                 picture: res.data.picture,
//             };

//             setUser(userObj);
//             console.log("Google signup successful:", userObj);

//             await axios.post("http://localhost:5000/googleUsers", userObj);
//         } catch (error) {
//             console.error("Google login failed:", error);
//         }
//     };

//     const login = useGoogleLogin({
//         onSuccess: handleGoogleLogin,
//         onError: () => console.log("Google login failed"),
//     });

//     return (
//         <Button
//             type="button"
//             onClick={() => login()}
//             variant="outline"
//             className="flex-1 flex items-center gap-2 border border-gray-300 hover:bg-green-800 hover:text-white"
//         >
//             <FcGoogle /> Google
//         </Button>
//     );
// }