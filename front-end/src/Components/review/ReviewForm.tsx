import { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { createReview } from '@/store/reviewStore';
import { Card, CardContent } from '@/ui/card';
import { Button } from '@/ui/button';
import { Textarea } from '@/ui/textarea';
import { RatingStars } from '@/Components/service/RatingStars';
import { toast } from '@/ui/toast';

interface ReviewFormProps {
  serviceId: string;
  onClose: () => void;
}

export function ReviewForm({ serviceId, onClose }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setLoading(true);
    try {
      await dispatch(createReview({
        serviceId,
        rating,
        comment,
      })).unwrap();
      
      toast.success('Review submitted successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">Write a Review</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Rate your experience</p>
          <RatingStars
            rating={rating}
            onChange={setRating}
            interactive
            size="lg"
          />
        </div>

        <div className="mb-4">
          <Textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}