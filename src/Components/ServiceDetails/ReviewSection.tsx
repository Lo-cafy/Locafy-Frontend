"use client";
import { Star } from "lucide-react";

export default function ReviewSection({ reviews, reviewFilter, setReviewFilter }: any) {
  const filteredReviews =
    reviewFilter === "all" ? reviews : reviews.filter((r: any) => r.rating === parseInt(reviewFilter));

  return (
    <section className="bg-gray-50 rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Reviews</h2>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={reviewFilter}
          onChange={(e) => setReviewFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
        </select>
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto">
        {filteredReviews.map((r: any, i: number) => (
          <div key={i} className="bg-white p-3 rounded shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{r.user}</span>
              <div className="flex text-yellow-400">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
