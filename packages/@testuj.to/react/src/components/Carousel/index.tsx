import { useCallback, useState } from "react";
import "./styles.css";

export interface CarouselProps {
  items: React.ReactNode[];
}

export const Carousel = ({ items }: CarouselProps) => {
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
    <div className="tt-carousel-wrapper">
      <div
        className="tt-carousel-wrapper-inner"
        onMouseDown={handleHorizontalGrab}
        style={{ transform }}
      >
        {items?.map((item, index) => {
          return <CarouselItem key={index}>{item}</CarouselItem>;
        })}
      </div>
    </div>
  );
};

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CarouselItem = ({ children, ...props }) => {
  return (
    <div className="tt-carousel-item" {...props}>
      {children}
    </div>
  );
};
