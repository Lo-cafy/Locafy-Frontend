"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // <-- corrected
import { ArrowLeft } from "lucide-react";
import axios from "axios";

import Footer from "@/Components/Footer";
import ImageCarousel from "@/Components/ServiceDetails/ImageCarousel";
import ServiceInfo from "@/Components/ServiceDetails/serviceDetails";
import ReviewSection from "@/Components/ServiceDetails/ReviewSection";
import RelatedServices from "@/Components/ServiceDetails/RelatedService";
import { calculateAvgRating } from "@/Components/ServiceDetails/ratingService";

export default function ServiceDetailPage() {
  const { id } = useParams(); // service id from URL
  const navigate = useNavigate(); // <-- correct hook for navigation

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(1);
  const [reviewFilter, setReviewFilter] = useState("all");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/services/${id}`);
        const data = res.data.service || res.data;

        // Fetch service photos
        const photoRes = await axios.get(
          `http://localhost:5000/api/photoservices/${data.id}/photos`
        );
        const photos = photoRes.data.data.photos || [];
        data.photos = photos;

        // Fetch related services (optional)
        const relatedRes = await axios.get(
          `http://localhost:5000/api/services/category/${data.category_id}`
        );
        data.relatedServices = relatedRes.data.services || [];

        setService(data);
      } catch (err) {
        console.error(err);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
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
          onClick={() => navigate(-1)} // <-- go back
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
