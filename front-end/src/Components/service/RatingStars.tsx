import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function RatingStars({ 
  rating, 
  size = 'md', 
  showValue = false,
  interactive = false,
  onChange 
}: RatingStarsProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={`${sizes[size]} ${
            value <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => handleClick(value)}
        />
      ))}
      {showValue && (
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}