import React, { forwardRef, useCallback, useState, useEffect, useMemo } from "react";
import cx from "classnames";
import "./styles.css";
import { debounce } from "lodash";

export interface CarouselProps {
  items: React.ReactNode[];
  wrapperClassName?: string;
  itemClassName?: string;
  arrow?: React.ReactNode;
  arrowClassName?: string;
  infinite?: boolean;
}

export const Carousel = ({
  items,
  wrapperClassName,
  itemClassName,
  arrow,
  arrowClassName,
  infinite,
}: CarouselProps) => {
  const [translateX, setTranslateX] = useState(0);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemsLocal, setItemsLocal] = useState([...items]);

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

  const handleGrabonMobile = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const startX = e.touches[0].pageX;
      const startTranslateX = translateX;

      const handleHorizontalMove = (e) => {
        const currentX = e.touches[0].pageX;
        const diff = currentX - startX;

        setTranslateX(startTranslateX + diff);
      };

      const handleHorizontalRelease = () => {
        window.removeEventListener("touchmove", handleHorizontalMove);
        window.removeEventListener("touchend", handleHorizontalRelease);
      };

      window.addEventListener("touchmove", handleHorizontalMove);
      window.addEventListener("touchend", handleHorizontalRelease);
    },
    [translateX]
  );

  const transform = `translateX(${translateX}px)`;

  useEffect(() => {
    if (innerRef.current) {
      setItemWidth(innerRef.current?.clientWidth / items.length || 1);
    }
    setItemsLocal([...items]);
  }, [innerRef.current?.clientWidth, items]);

  const handleArrowClick = useCallback(() => {
    setTranslateX((prev) => prev - itemWidth * 2);
  }, [itemWidth]);

  useEffect(() => {
    if (infinite) {
      const handleResize = debounce(() => {
        setTranslateX(0);
      }, 100);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [infinite]);

  return (
    <div className={cx("tt-carousel-wrapper", wrapperClassName)}>
      <div
        className="tt-carousel-wrapper-inner"
        onMouseDown={handleHorizontalGrab}
        onTouchStart={handleGrabonMobile}
        style={{ transform }}
        ref={innerRef}
      >
        {itemsLocal?.map((item, index) => {
          return (
            <CarouselItem key={index} className={itemClassName}>
              {item}
            </CarouselItem>
          );
        })}
      </div>
      {arrow ? (
        <div className={cx("tt-carousel-arrow", arrowClassName)} onClick={handleArrowClick}>
          {arrow}
        </div>
      ) : null}
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
