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
      // Test login as a basic user
      const testUser = {
        id: "test-user-123",
        name: "Test User",
        email: "test@user.com",
        role: "user" as const,
      };
      const { setUser } = useAuthStore.getState();
      setUser(testUser);
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
    <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 min-h-screen">
      <Navbar />
      
      {/* Professional Test Dashboard Access */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-4">
          <p className="text-xs text-emerald-700 font-medium mb-3 text-center">Development Access</p>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleProviderDashboardClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-200 text-sm px-4 py-2"
            >
              Provider Dashboard
            </Button>
            <Link to="/admin/dashboard">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 shadow-sm transition-all duration-200 text-sm px-4 py-2 w-full">
                Admin Dashboard
              </Button>
            </Link>
            <Link to="/super-admin-test/dashboard">
              <Button className="bg-emerald-800 hover:bg-emerald-900 text-white shadow-md transition-all duration-200 text-sm px-4 py-2">
                Super Admin
              </Button>
            </Link>
          </div>
        </div>
        
        {/* My Bookings Quick Access */}
        <Link to="/my-bookings">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all duration-200 px-6 py-3 rounded-xl font-semibold">
            My Bookings
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-20">
        <HeroSection />
        <BrowseCategories />
        <WhyChooseLocafy />
        <FeaturedServices />
        <TrustedByThousands />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
