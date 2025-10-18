import { useEffect, useState } from "react";
import BrowseCategories from "@/Components/Category";
import { HeroSection } from "../Components/HeroSection";
import { Navbar } from "../Components/Navbar";
import WhyChooseLocafy from "@/Components/MiddleSection";
import TrustedByThousands from "@/Components/TrustedyBy";
import Footer from "@/Components/Footer";
import FeaturedServices from "@/Components/ServiceSection";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { useAuthStore } from "@/store/authStore";

function Home() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleProviderDashboardClick = () => {
    if (isLoggedIn && user) {
      navigate("/provider");
    } else {
      // For testing purposes, create a test user and log them in
      const testUser = {
        id: "test-user-123",
        name: "Test Provider",
        email: "test@provider.com",
        role: "provider" as const
      };
      
      // Set the test user in the auth store
      const { setUser } = useAuthStore.getState();
      setUser(testUser);
      
      // Navigate to provider dashboard
      navigate("/provider");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-emerald-50">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div  className="bg-gradient-to-br from-emerald-50 to-green-0 min-h-screen pt-20">
      
      <Navbar />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={handleProviderDashboardClick}
          variant="outline" 
          className="bg-white/80"
        >
          Provider Dashboard
        </Button>
        <Link to="/admin/dashboard">
          <Button variant="outline" className="bg-white/80">Admin Dashboard</Button>
        </Link>
        <Link to="/super-admin-test/dashboard">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Super Admin Dashboard</Button>
        </Link>
      </div>
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
