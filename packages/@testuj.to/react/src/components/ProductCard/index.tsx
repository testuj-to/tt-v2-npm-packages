import { LikeButton } from "../LikeButton";
import { Tag, TagProps } from "../Tag";
import "./styles.css";

export interface ProductCardTagProps extends TagProps {}

export interface ProductCardProps {
  image: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  label: string;
  tags: ProductCardTagProps[];
  onClick?: () => void;
  onDoubleClick?: () => void;
  onLikeClick?: () => void;
  liked?: boolean;
  showLikeButton?: boolean;
}

export const ProductCard = ({
  image,
  label,
  tags,
  onClick,
  onDoubleClick,
  onLikeClick,
  liked,
  showLikeButton,
}: ProductCardProps) => {
  return (
    <div
      className="tt-product-card-warpper"
      onClick={() => onClick?.()}
      onDoubleClick={() => onDoubleClick?.()}
    >
      <div className="tt-product-card-main">
        <div className="tt-product-card-image">{image}</div>
        <div className="tt-product-card-tags">
          {tags?.map((tag, index) => (
            <Tag {...tag} key={index} className="tt-product-card-tag" />
          ))}
        </div>
        {showLikeButton ? (
          <LikeButton
            variant="circle"
            className="tt-product-card-like-button"
            liked={liked}
            onClick={onLikeClick}
          />
        ) : null}
      </div>
      <div className="tt-product-card-label">
        <label>{label}</label>
      </div>
    </div>
  );
};
