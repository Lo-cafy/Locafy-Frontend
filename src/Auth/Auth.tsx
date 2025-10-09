"use client";

import { useState } from "react";
import { LogIn } from "./LoginCard";
import { SignUp } from "./SignupCard";
import { EmailSentNotification } from "./EmailSentNotification";

type AuthView = "login" | "signup" | "email-sent";

export function AuthDialog({ startOn = "signup" }: { startOn?: AuthView }) {
  const [currentView, setCurrentView] = useState<AuthView>(startOn);
  const [userEmail, setUserEmail] = useState("");

  const handleSignUpSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentView("email-sent");
  };

  return (
    <div className="relative w-[360px] h-auto min-h-[580px] [perspective:1000px]">
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          currentView !== "login" ? "rotate-y-180" : ""
        }`}
      >
        {/* === FRONT FACE (Login) === */}
        <div className="absolute inset-0 [backface-visibility:hidden] flex items-center justify-center">
          <LogIn onSwitch={() => setCurrentView("signup")} />
        </div>

        {/* === BACK FACE (Container for SignUp & EmailSent) === */}
        <div className="absolute inset-0 rotate-y-180 [backface-visibility:hidden] flex items-center justify-center">
          {/* EDIT: Instead of instantly swapping components with a ternary,
            we now render both and use opacity to fade between them.
          */}
          <div
            className={`transition-opacity duration-300 ease-in-out ${
              currentView === "signup" ? "opacity-100" : "opacity-0"
            }`}
          >
            <SignUp onSwitch={() => setCurrentView("login")} onSuccess={handleSignUpSuccess} />
          </div>

          <div
            className={`absolute transition-opacity duration-300 ease-in-out ${
              currentView === "email-sent" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <EmailSentNotification email={userEmail} onSwitch={() => setCurrentView("login")} />
          </div>
        </div>
      </div>
    </div>
  );
}