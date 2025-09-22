import type { ReviewStats as ReviewStatsType } from '@/types/review.types';
import { Star } from 'lucide-react';
import { Progress } from '@/ui/progress';

type ReviewStatsProps = {
  stats: ReviewStatsType;
};

export function ReviewStats({ stats }: ReviewStatsProps) {
  const maxCount = Math.max(...Object.values(stats.ratingDistribution));

  return (
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

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2 mb-2">
              <span className="text-sm w-3">{rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <div className="flex-1">
                <Progress
                  value={(stats.ratingDistribution[rating] / maxCount) * 100}
                  className="h-2"
                />
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">
                {stats.ratingDistribution[rating]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}