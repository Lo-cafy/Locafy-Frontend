import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getServiceDetails, clearSelectedService } from '@/store/serviceStore';
import { Navbar,Footer } from '@/Components/Layout/index';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { MapPin, Star, ArrowLeft, Share2, Heart } from 'lucide-react';
import { BookingModals, ServiceProviderCard } from '@/Components/service';
import { ReviewList } from '@/Components/review/ReviewList';

import { useState } from 'react';

export function ServiceDetails() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedService, loading } = useAppSelector((state) => state.services);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceDetails(serviceId));
    }
    return () => {
      dispatch(clearSelectedService());
    };
  }, [dispatch, serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-gray-500">Service not found</p>
          <Button onClick={() => navigate('/services')} className="mt-4">
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg overflow-hidden">
                {selectedService.photos && selectedService.photos.length > 0 ? (
                  <>
                    <img
                      src={selectedService.photos[selectedImage].photoUrl}
                      alt={selectedService.title}
                      className="w-full h-96 object-cover"
                    />
                    {selectedService.photos.length > 1 && (
                      <div className="flex gap-2 p-4 overflow-x-auto">
                        {selectedService.photos.map((photo, index) => (
                          <img
                            key={photo.photoId}
                            src={photo.photoUrl}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(index)}
                            className={`w-20 h-20 object-cover rounded cursor-pointer ${
                              selectedImage === index ? 'ring-2 ring-emerald-600' : ''
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <img
                    src="/placeholder-service.jpg"
                    alt={selectedService.title}
                    className="w-full h-96 object-cover"
                  />
                )}
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{selectedService.title}</h1>
                    <Badge variant="secondary">{selectedService.categoryName}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedService.locationText}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{selectedService.rating.toFixed(1)} ({selectedService.totalReviews || 0} reviews)</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h2 className="font-semibold text-lg mb-3">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {selectedService.description}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h2 className="font-semibold text-lg mb-4">Customer Reviews</h2>
                <ReviewList serviceId={selectedService.serviceId} />
              </div>
            </div>

          
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <div className="text-3xl font-bold text-emerald-600 mb-4">
                  ₹{selectedService.price}
                </div>
                <Button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 mb-3"
                  size="lg"
                >
                  Book Now
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Free cancellation up to 24 hours before
                </p>
              </div>
              <ServiceProviderCard
                provider={{
                  userId: selectedService.providerId,
                  firstname: selectedService.providerFirstname,
                  lastname: selectedService.providerLastname,
                  rating: selectedService.providerRating,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModals
          service={selectedService}
          onClose={() => setShowBooking(false)}
        />
      )}
      <Footer />
    </div>
  );
}