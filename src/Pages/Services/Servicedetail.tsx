"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "@/Api/baseurl";

import Footer from "@/Components/Footer";
import ImageCarousel from "@/Components/ServiceDetails/ImageCarousel";
import ServiceInfo from "@/Components/ServiceDetails/serviceDetails";
import ReviewSection from "@/Components/ServiceDetails/ReviewSection";
import RelatedServices from "@/Components/ServiceDetails/RelatedService";
import { calculateAvgRating } from "@/Components/ServiceDetails/ratingService";
import type { ServiceFull, Option } from "@/types/service.types";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState<ServiceFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | string>(1);
  const [reviewFilter, setReviewFilter] = useState("all");

  useEffect(() => {
    if (!id) return setLoading(false);

    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/services/services/${id}`);
        const data: ServiceFull = res.data.service || res.data.data || res.data;

        if (!data) return setService(null);

        // Photos
        const photoRes = await api.get(`/api/photoservices/${data.service_id}/photos`);
        const photos = Array.isArray(photoRes.data?.data?.photos)
          ? photoRes.data.data.photos
          : Array.isArray(photoRes.data)
          ? photoRes.data
          : Array.isArray(photoRes.data?.photos)
          ? photoRes.data.photos
          : [];
        data.photos = photos;

        // Related services
        if (data.category_id) {
          try {
            const relatedRes = await api.get(`/api/services/category/${data.category_id}`);
            const related: ServiceFull[] = Array.isArray(relatedRes.data.services)
              ? relatedRes.data.services
              : Array.isArray(relatedRes.data)
              ? relatedRes.data
              : Array.isArray(relatedRes.data?.data)
              ? relatedRes.data.data
              : [];
            data.relatedServices = related.filter(r => r.service_id !== data.service_id);
          } catch {
            data.relatedServices = [];
          }
        } else {
          data.relatedServices = [];
        }

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

  const reviewsTyped = (service.reviews ?? []).map(r => ({
    rating: Number(r.rating ?? 0),
  }));
  const avgRating = calculateAvgRating(reviewsTyped);

  // Map API options safely
  const serviceOptions: Option[] = (service.options ?? []).map((o, idx) => ({
    id: o.id ?? idx + 1,
    name: o.name ?? `Option ${idx + 1}`,
    price: o.price ?? 0,
    description: o.description,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Header */}
        <section className="flex items-center justify-between mb-6">
          <button
            className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-all duration-200 font-medium bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </button>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 px-6 py-3">
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-900">{service.title}</h1>
          </div>
        </section>

        {/* Main */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
              <ImageCarousel
                images={(service.photos ?? []).map(p => p.photo_url || p.url || "")}
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
              {/* Convert price to number only for UI */}
              <ServiceInfo
                service={{ ...service, price: Number(service.price) }}
                serviceOptions={serviceOptions}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                avgRating={avgRating}
              />
            </div>
          </div>
        </section>

        <ReviewSection
          reviews={service.reviews ?? []}
          reviewFilter={reviewFilter}
          setReviewFilter={setReviewFilter}
        />

        <RelatedServices related={service.relatedServices ?? []} />

        <Footer />
      </div>
    </div>
  );
}
