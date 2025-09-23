import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getServiceDetails, clearSelectedService } from '@/store/serviceStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { MapPin, Star } from 'lucide-react';
import { BookingModals } from '@/Components/service/BookingModals'
import { ReviewList } from '../review/ReviewList';

export function ServiceDetailsModal() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedService, loading } = useAppSelector((state) => state.services);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceDetails(serviceId));
    }
    return () => {
      dispatch(clearSelectedService());
    };
  }, [dispatch, serviceId]);

  const handleClose = () => {
    navigate(-1);
  };

  if (!selectedService && !loading) return null;

  return (
    <>
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : selectedService ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedService.title}</DialogTitle>
              </DialogHeader>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {selectedService.photos?.map((photo, index) => (
                  <img
                    key={photo.photoId}
                    src={photo.photoUrl}
                    alt={`Service ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>

              {/* Service Info */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-600 text-lg px-4 py-1">
                    ₹{selectedService.price}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedService.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedService.locationText}</span>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>

                {/* Provider Info */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Service Provider</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {selectedService.providerFirstname} {selectedService.providerLastname}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {selectedService.providerRating.toFixed(1)} Provider Rating
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowBooking(true)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Book Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contact Provider
                  </Button>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                <ReviewList serviceId={selectedService.serviceId} />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {showBooking && selectedService && (
        <BookingModals
          service={selectedService}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
}