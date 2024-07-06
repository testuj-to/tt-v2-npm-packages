import { useCallback, useState } from "react";

import "./styles.css";

import { StarIcon } from "./StarIcon";

export interface StarsRatingProps {
    rating: number;
    readOnly?: boolean;
    className?: string;
    starSize?: number;
    noOfStars?: number;
    onChange?(rating: number): void;
}

export const StarsRating = ({ rating, onChange, readOnly, className, starSize, noOfStars = 5 }: StarsRatingProps) => {
    const [ratingHover, setRatingHover] = useState<number | null>(null);
    const ratingInt = Math.floor(ratingHover) || Math.floor(rating);
    const ratingDecimal = (ratingHover || rating) - ratingInt;

    const stars = new Array(noOfStars).fill(0).map((_, i) => i + 1);

    const handleChange = useCallback((value: number) => {
        if (readOnly) {
            return;
        }

        onChange?.(value);
    }, []);

    const handleHover = useCallback((value: number) => {
        if (readOnly) {
            return;
        }

        setRatingHover(value);
    }, []);

    return (
        <div className={className}>
            {stars.map((star, index) => {
                const starPercent = star <= ratingInt ? 100 : star > ratingInt + 1 ? 0 : ratingDecimal * 100;

                return (
                    <div
                        key={`${index}${star}`}
                        className="tt-stars-rating-item"
                    >
                        <StarIcon
                            filled={starPercent}
                            setGradient={star > ratingInt}
                            height={starSize || 24}
                            width={starSize || 24}
                        />
                        <div
                            className="tt-stars-rating-item__overlay_left"
                            onClick={() =>
                                handleChange(star - 0.5)}
                            onMouseEnter={() =>
                                handleHover(star - 0.5)}
                            onMouseLeave={() =>
                                handleHover(null)}
                        />
                        <div
                            className="tt-stars-rating-item__overlay_right"
                            onClick={() =>
                                handleChange(star)}
                            onMouseEnter={() =>
                                handleHover(star)}
                            onMouseLeave={() =>
                                handleHover(null)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
