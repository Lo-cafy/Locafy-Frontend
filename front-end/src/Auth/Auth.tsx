import { useState } from "react";
import { LogIn } from "./Login";
import { SignUp } from "./SignUp";
import { OtpInput } from "./Otp";

type AuthView = "login" | "signup" | "otp";

export function AuthDialog({ startOn = "signup" }: { startOn?: AuthView }) {
  const [currentView, setCurrentView] = useState<AuthView>(startOn);
  const [rotate, setRotate] = useState(0);

  const handleSwitch = (nextView: AuthView) => {
    setRotate((prev) => prev + 180); // rotate 180deg each change
    setCurrentView(nextView);
  };

  let ViewComponent;
  if (currentView === "login") ViewComponent = <LogIn onSwitch={() => handleSwitch("signup")} />;
  else if (currentView === "signup")
    ViewComponent = <SignUp onSwitch={() => handleSwitch("login")} onSuccess={() => handleSwitch("otp")} />;
  else ViewComponent = <OtpInput onSwitch={() => handleSwitch("signup")} />;

  // Determine if inner content should be flipped to avoid mirrored text
  const flipInner = rotate / 180 % 2 !== 0; // true for odd 180° rotations

  return (
    <div className="relative w-[360px] h-[480px] [perspective:1000px] flex items-center justify-center">
      <div
        className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] flex items-center justify-center"
        style={{ transform: `rotateY(${rotate}deg)` }}
      >
        {/* Conditionally flip inner content */}
        <div
          className={`w-full h-full flex items-center justify-center`}
          style={{ transform: flipInner ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {ViewComponent}
        </div>
      </div>
    </div>
  );
}
