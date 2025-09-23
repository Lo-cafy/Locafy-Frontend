import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchReviews, fetchReviewStats } from '@/store/reviewStore';
import { Star, User } from 'lucide-react';
import { Button } from '@/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  serviceId: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({ serviceId }) => {
  const dispatch = useAppDispatch();
  const { reviews, stats, loading, hasMore } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews({ serviceId, page: 1 }));
    dispatch(fetchReviewStats(serviceId));
  }, [dispatch, serviceId]);

  const loadMore = () => {
    const nextPage = Math.ceil(reviews.length / 10) + 1;
    dispatch(fetchReviews({ serviceId, page: nextPage }));
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Review Stats */}
      {stats && (
        <div className="mb-6 pb-6 border-b">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(stats.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {stats.totalReviews} reviews
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.reviewId} className="border-b pb-6 last:border-0">
            <div className="flex items-start gap-4">
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
                <div className="flex items-center justify-between mb-2">
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
                  <p className="text-gray-600">{review.comment}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-6">
          <Button
            onClick={loadMore}
            variant="outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Reviews'}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {reviews.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-8">
          No reviews yet. Be the first to review!
        </p>
      )}
    </div>
  );
};