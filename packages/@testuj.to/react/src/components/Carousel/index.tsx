import React, { forwardRef, useCallback, useState } from "react";
import cx from "classnames";
import "./styles.css";

export interface CarouselProps {
  items: React.ReactNode[];
  wrapperClassName?: string;
  itemClassName?: string;
}

export const Carousel = ({ items, wrapperClassName, itemClassName }: CarouselProps) => {
  const [translateX, setTranslateX] = useState(0);

  const handleHorizontalGrab = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startX = e.pageX;
      const startTranslateX = translateX;

      const handleHorizontalMove = (e) => {
        const currentX = e.pageX;
        const diff = currentX - startX;

        setTranslateX(startTranslateX + diff);
      };

      const handleHorizontalRelease = () => {
        window.removeEventListener("mousemove", handleHorizontalMove);
        window.removeEventListener("mouseup", handleHorizontalRelease);
      };

      window.addEventListener("mousemove", handleHorizontalMove);
      window.addEventListener("mouseup", handleHorizontalRelease);
    },
    [translateX]
  );

  const transform = `translateX(${translateX}px)`;

  return (
    <div className={cx("tt-carousel-wrapper", wrapperClassName)}>
      <div
        className="tt-carousel-wrapper-inner"
        onMouseDown={handleHorizontalGrab}
        style={{ transform }}
      >
        {items?.map((item, index) => {
          return (
            <CarouselItem key={index} className={itemClassName}>
              {item}
            </CarouselItem>
          );
        })}
      </div>
    </div>
  );
};

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CarouselItem = forwardRef<HTMLDivElement, { children: React.ReactNode; className: string }>(
  ({ children, className }, ref) => {
    return (
      <div className={cx("tt-carousel-item", className)} {...ref}>
        {children}
      </div>
    );
  }
);
