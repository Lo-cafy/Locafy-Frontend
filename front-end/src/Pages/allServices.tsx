"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "@/Components/Services/serviceCard";
import Sidebar from "@/Components/Services/sidebar";
import SearchBar from "@/Components/Services/searchBar";

interface Service {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  categoryId?: number;
  description?: string;
  reviews?: number;
  duration?: string;
  isFeatured?: boolean;
}

// Dummy data fallback
const dummyServices: Service[] = [
  {
    id: 1,
    name: "Professional Home Cleaning",
    location: "New York, NY",
    price: 120,
    rating: 4.8,
    categoryId: 1,
    description: "Deep cleaning service for your entire home. We use eco-friendly products and professional equipment.",
    reviews: 124,
    duration: "3-4 hours",
    isFeatured: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Web Development Service",
    location: "San Francisco, CA",
    price: 2500,
    rating: 4.9,
    categoryId: 2,
    description: "Custom website development with modern technologies. Responsive design and SEO optimized.",
    reviews: 89,
    duration: "2-3 weeks",
    isFeatured: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "Personal Fitness Training",
    location: "Miami, FL",
    price: 75,
    rating: 4.6,
    categoryId: 3,
    description: "One-on-one personal training sessions tailored to your fitness goals.",
    reviews: 67,
    duration: "1 hour",
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    name: "Garden Maintenance",
    location: "Austin, TX",
    price: 90,
    rating: 4.4,
    categoryId: 4,
    description: "Regular garden upkeep including planting, pruning, and lawn care.",
    reviews: 42,
    duration: "2 hours",
    image: "/api/placeholder/300/200"
  },
  {
    id: 5,
    name: "Graphic Design Package",
    location: "Chicago, IL",
    price: 500,
    rating: 4.7,
    categoryId: 2,
    description: "Complete branding package including logo design and marketing materials.",
    reviews: 156,
    duration: "1 week",
    isFeatured: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 6,
    name: "Dog Walking Service",
    location: "Seattle, WA",
    price: 25,
    rating: 4.9,
    categoryId: 5,
    description: "Daily dog walking services with experienced and caring walkers.",
    reviews: 203,
    duration: "30 min",
    image: "/api/placeholder/300/200"
  },
  {
    id: 7,
    name: "Math Tutoring",
    location: "Boston, MA",
    price: 60,
    rating: 4.5,
    categoryId: 6,
    description: "K-12 math tutoring with certified teachers and customized lesson plans.",
    reviews: 78,
    duration: "1 hour",
    image: "/api/placeholder/300/200"
  },
  {
    id: 8,
    name: "Event Photography",
    location: "Los Angeles, CA",
    price: 800,
    rating: 4.8,
    categoryId: 7,
    description: "Professional event photography for weddings, corporate events, and parties.",
    reviews: 134,
    duration: "4-6 hours",
    isFeatured: true,
    image: "/api/placeholder/300/200"
  },
  {
    id: 9,
    name: "Car Detailing",
    location: "Dallas, TX",
    price: 150,
    rating: 4.3,
    categoryId: 8,
    description: "Complete interior and exterior car detailing service at your location.",
    reviews: 91,
    duration: "2-3 hours",
    image: "/api/placeholder/300/200"
  }
];

export default function ServiceListingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState({});
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/services")
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API error, using dummy data:", err);
        setServices(dummyServices);
        setLoading(false);
        setError("Failed to load services. Showing demo data.");
      });
  }, []);

  const filteredServices = services.filter(s => {
    const { categoryId, minPrice, maxPrice, minRating } = filters as any;
    return (
      (!categoryId || s.categoryId === categoryId) &&
      (!minPrice || s.price >= minPrice) &&
      (!maxPrice || s.price <= maxPrice) &&
      (!minRating || s.rating >= minRating) &&
      (s.name.toLowerCase().includes(searchText.toLowerCase()) || 
       s.location.toLowerCase().includes(searchText.toLowerCase()) ||
       s.description?.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Discover Amazing Services
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find the perfect service for your needs. From home maintenance to professional consulting.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-amber-800">{error}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Available Services
                </h2>
                <p className="text-slate-600">
                  {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
                  {searchText && ` for "${searchText}"`}
                </p>
              </div>
              
              {/* Sort Dropdown (optional) */}
              <select className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: Highest First</option>
              </select>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <svg className="h-16 w-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No services found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms</p>
                <button 
                  onClick={() => { setFilters({}); setSearchText(""); }}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}