import { useState } from "react";
import { StarIcon } from "./StarIcon";
import "./styles.css";

export interface StarsRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
  starSize?: number;
}

export const StarsRating = ({
  rating,
  onChange,
  readOnly,
  className,
  starSize,
}: StarsRatingProps) => {
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const ratingInt = ratingHover || Math.floor(rating);
  const ratingDecimal = (ratingHover || rating) - ratingInt;

  return (
    <div className={className}>
      {[1, 2, 3, 4, 5].map((star) => {
        const starPercent =
          star <= ratingInt ? 100 : star > ratingInt + 1 ? 0 : ratingDecimal * 100;
        return (
          <StarIcon
            key={star}
            filled={starPercent}
            onClick={() => !readOnly && onChange(star)}
            setGradient={star > ratingInt}
            onMouseEnter={() => !readOnly && setRatingHover(star)}
            onMouseLeave={() => !readOnly && setRatingHover(null)}
            height={starSize || 24}
            width={starSize || 24}
          />
        );
      })}
    </div>
  );
};
