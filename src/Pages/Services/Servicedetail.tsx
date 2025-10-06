"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

import Footer from "@/Components/Footer";
import ImageCarousel from "@/Components/ServiceDetails/ImageCarousel";
import ServiceInfo from "@/Components/ServiceDetails/serviceDetails";
import ReviewSection from "@/Components/ServiceDetails/ReviewSection";
import RelatedServices from "@/Components/ServiceDetails/RelatedService";
import { calculateAvgRating } from "@/Components/ServiceDetails/ratingService";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(1);
  const [reviewFilter, setReviewFilter] = useState("all");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://back-end-service-listing.onrender.com/api/services/${id}`);
        
        // Handle different response structures
        let data = res.data.service || res.data.data || res.data;
        
        if (!data) {
          console.error("No service data found");
          setService(null);
          return;
        }

        // Use service_id instead of id for photo API call
        const serviceId = data.service_id || data.id;
        
        if (!serviceId) {
          console.error("Service ID not found in response:", data);
          setService(null);
          return;
        }

        // Fetch service photos
        const photoRes = await axios.get(
          `https://back-end-service-listing.onrender.com/api/photoservices/${serviceId}/photos`
        );
        
        // Handle different photo response structures
        let photos = [];
        if (photoRes.data.data && Array.isArray(photoRes.data.data.photos)) {
          photos = photoRes.data.data.photos;
        } else if (Array.isArray(photoRes.data)) {
          photos = photoRes.data;
        } else if (photoRes.data.photos && Array.isArray(photoRes.data.photos)) {
          photos = photoRes.data.photos;
        }
        
        data.photos = photos;

        // Fetch related services
        const categoryId = data.category_id;
        if (categoryId) {
          try {
            const relatedRes = await axios.get(
              `https://back-end-service-listing.onrender.com/api/services/category/${categoryId}`
            );
            
            // Handle different related services response structures
            let relatedServices = [];
            if (relatedRes.data.services && Array.isArray(relatedRes.data.services)) {
              relatedServices = relatedRes.data.services;
            } else if (Array.isArray(relatedRes.data)) {
              relatedServices = relatedRes.data;
            } else if (relatedRes.data.data && Array.isArray(relatedRes.data.data)) {
              relatedServices = relatedRes.data.data;
            }
            
            // Filter out the current service from related services
            data.relatedServices = relatedServices.filter((s: any) => 
              (s.service_id || s.id) !== serviceId
            );
          } catch (err) {
            console.error("Error fetching related services:", err);
            data.relatedServices = [];
          }
        } else {
          data.relatedServices = [];
        }

        setService(data);
      } catch (err) {
        console.error("Error fetching service:", err);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    } else {
      setService(null);
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-center py-16">Loading...</p>;
  if (!service) return <p className="text-center py-16">Service not found</p>;

  const avgRating = calculateAvgRating(service.reviews || []);
  const serviceOptions = service.options || [{ id: 1, name: "Default", price: service.price }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* Navigation */}
      <section className="flex items-center mb-4">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2" size={20} /> Back to Services
        </button>
        <h1 className="ml-auto text-xl sm:text-2xl font-bold text-gray-900">
          {service.title}
        </h1>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ImageCarousel images={service.photos.map((p: any) => p.photo_url)} />
        </div>

        <div className="lg:col-span-5">
          <ServiceInfo
            service={service}
            serviceOptions={serviceOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            avgRating={avgRating}
          />
        </div>
      </section>

      <ReviewSection
        reviews={service.reviews || []}
        reviewFilter={reviewFilter}
        setReviewFilter={setReviewFilter}
      />

      <RelatedServices related={service.relatedServices || []} />

      <Footer />
    </div>
  );
}