import { StarIcon } from "./StarIcon";
import "./styles.css";

export interface StarsRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

export const StarsRating = ({ rating, onChange }: StarsRatingProps) => {
  const ratingInt = Math.floor(rating);
  const ratingDecimal = rating - ratingInt;

  return (
    <div>
      {[1, 2, 3, 4, 5].map((filled) => {
        const filledPercent =
          filled <= ratingInt ? 100 : filled > ratingInt + 1 ? 0 : ratingDecimal * 100;

        return (
          <StarIcon
            key={filled}
            filled={filledPercent}
            onClick={() => onChange(filled)}
            setGradient={filled > ratingInt}
          />
        );
      })}
    </div>
  );
};
