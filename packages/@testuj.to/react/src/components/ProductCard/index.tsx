import { Card } from "../Card";
import { Tag, TagProps } from "../Tag";
import "./styles.css";

export interface ProductCardTagProps extends TagProps {}

export interface ProductCardProps {
  image: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  label: string;
  tags: ProductCardTagProps[];
}

export const ProductCard = ({ image, label, tags }: ProductCardProps) => {
  return (
    <div className="tt-product-card-warpper">
      <div className="tt-product-card-main">
        <div className="tt-product-card-image">{image}</div>
        <div className="tt-product-card-tags">
          {tags?.map((tag) => (
            <Tag {...tag} className="tt-product-card-tag" />
          ))}
        </div>
      </div>
      <div className="tt-product-card-label">
        <label>{label}</label>
      </div>
    </div>
  );
};
