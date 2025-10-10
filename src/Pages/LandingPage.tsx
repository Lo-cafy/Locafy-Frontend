import { useEffect, useState } from "react";
import BrowseCategories from "@/Components/Category";
import { HeroSection } from "../Components/HeroSection";
import { Navbar } from "../Components/Navbar";
import { useAuthStore } from "@/store/authStore";
import { useEffect as useReactEffect } from "react";
import { useNavigate } from "react-router-dom";
import WhyChooseLocafy from "@/Components/MiddleSection";
import TrustedByThousands from "@/Components/TrustedyBy";
import Footer from "@/Components/Footer";
import FeaturedServices from "@/Components/ServiceSection";

function Home() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, hydrateFromStorage } = useAuthStore();
  const navigate = useNavigate();

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // hydrate auth and redirect logged-in users to all services
  useReactEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  useReactEffect(() => {
    if (isLoggedIn) {
      navigate("/all-services", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-emerald-50">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div  className="bg-gradient-to-br from-emerald-50 to-green-0 min-h-screen pt-20">
      
      {/* Landing navbar without search bar */}
      <Navbar showSearch={false} />
      <HeroSection />
      <BrowseCategories />
      <WhyChooseLocafy />
      <FeaturedServices />
      <TrustedByThousands />
      <Footer />

    </div>
  );
}

export default Home;
