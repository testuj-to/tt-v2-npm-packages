import { Tag, TagProps } from "../Tag";
import "./styles.css";

export interface ProductCardTagProps extends TagProps {}

export interface ProductCardProps {
  image: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  label: string;
  tags: ProductCardTagProps[];
  onClick?: () => void;
}

export const ProductCard = ({ image, label, tags, onClick }: ProductCardProps) => {
  return (
    <div className="tt-product-card-warpper" onClick={() => onClick?.()}>
      <div className="tt-product-card-main">
        <div className="tt-product-card-image">{image}</div>
        <div className="tt-product-card-tags">
          {tags?.map((tag, index) => (
            <Tag {...tag} key={index} className="tt-product-card-tag" />
          ))}
        </div>
      </div>
      <div className="tt-product-card-label">
        <label>{label}</label>
      </div>
    </div>
  );
};
