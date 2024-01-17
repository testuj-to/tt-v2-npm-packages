import { useState } from "react";
import { StarIcon } from "./StarIcon";
import "./styles.css";

export interface StarsRatingProps {
    rating: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
    className?: string;
    starSize?: number;
    noOfStars?: number;
}

export const StarsRating = ({ rating, onChange, readOnly, className, starSize, noOfStars = 5 }: StarsRatingProps) => {
    const [ratingHover, setRatingHover] = useState<number | null>(null);
    const ratingInt = Math.floor(ratingHover) || Math.floor(rating);
    const ratingDecimal = (ratingHover || rating) - ratingInt;

    const stars = new Array(noOfStars).fill(0).map((_, i) => i + 1);

    return (
        <div className={className}>
            {stars.map((star) => {
                const starPercent = star <= ratingInt ? 100 : star > ratingInt + 1 ? 0 : ratingDecimal * 100;
                return (
                    <div className="tt-stars-rating-item" key={star}>
                        <StarIcon
                            filled={starPercent}
                            setGradient={star > ratingInt}
                            height={starSize || 24}
                            width={starSize || 24}
                        />
                        <div
                            className="tt-stars-rating-item__overlay_left"
                            onClick={() => !readOnly && onChange(star - 0.5)}
                            onMouseEnter={() => !readOnly && setRatingHover(star - 0.5)}
                            onMouseLeave={() => !readOnly && setRatingHover(null)}
                        />
                        <div
                            className="tt-stars-rating-item__overlay_right"
                            onClick={() => !readOnly && onChange(star)}
                            onMouseEnter={() => !readOnly && setRatingHover(star)}
                            onMouseLeave={() => !readOnly && setRatingHover(null)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
