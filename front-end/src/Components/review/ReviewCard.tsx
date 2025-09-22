import { Star, User } from 'lucide-react';
import type { Review } from '@/types/review.types';
import { formatDistanceToNow } from 'date-fns';

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b pb-4 mb-4 last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {review.reviewer?.profilePhoto ? (
            <img
              src={review.reviewer.profilePhoto}
              alt={review.reviewer.firstname}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-gray-500" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium">
              {review.reviewer?.firstname} {review.reviewer?.lastname}
            </h4>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          {review.comment && (
            <p className="text-gray-600 text-sm">{review.comment}</p>
          )}
        </div>
      </div>
    </div>
  );
}