import { useState } from "react";
import { StarIcon } from "./StarIcon";
import "./styles.css";

export interface StarsRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  readOnly?: boolean;
}

export const StarsRating = ({ rating, onChange, readOnly }: StarsRatingProps) => {
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const ratingInt = ratingHover || Math.floor(rating);
  const ratingDecimal = (ratingHover || rating) - ratingInt;

  return (
    <div>
      {[1, 2, 3, 4, 5].map((filled) => {
        const filledPercent =
          filled <= ratingInt ? 100 : filled > ratingInt + 1 ? 0 : ratingDecimal * 100;

        return (
          <StarIcon
            key={filled}
            filled={filledPercent}
            onClick={() => !readOnly && onChange(filled)}
            setGradient={filled > ratingInt}
            onMouseEnter={() => !readOnly && setRatingHover(filled)}
            onMouseLeave={() => !readOnly && setRatingHover(null)}
          />
        );
      })}
    </div>
  );
};
