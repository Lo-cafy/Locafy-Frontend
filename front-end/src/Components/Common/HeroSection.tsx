import { Search, MapPin, Star, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Badge } from "@/ui/badge";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-0">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 md:px-4 md:py-2 text-sm md:text-base">
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" /> Most Trusted Platform
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Trusted
            </span>{" "}
            Local Services
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-md">
            Connect with verified professionals near you. From home repairs to personal care, we've got you covered.
          </p>
          <div className="backdrop-blur-xl bg-white/40 p-4 md:p-6 rounded-2xl border border-white/30 shadow-lg space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <Input placeholder="e.g., Plumbing, tutoring..." className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <Input placeholder="Your location" className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base" />
              </div>
            </div>
            <Button className="w-full h-10 md:h-12 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold text-sm md:text-base">
              Find Services
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { number: "15K+", label: "Providers", icon: Users },
              { number: "98%", label: "Satisfaction", icon: Star },
              { number: "4.9", label: "Rating", icon: CheckCircle },
            ].map((stat, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-lg p-3 md:p-4 rounded-xl text-center shadow-sm">
                <stat.icon className="h-4 w-4 md:h-6 md:w-6 text-emerald-600 mx-auto mb-1 md:mb-2" />
                <div className="text-lg md:text-xl font-bold">{stat.number}</div>
                <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Image Placeholder) */}
        <div className="hidden lg:block">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl shadow-2xl flex items-center justify-center">
            <span className="text-emerald-600 font-medium">Service Providers Image</span>
          </div>
        </div>
      </div>
    </section>
  );
}