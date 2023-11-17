import React from "react";
import "./productcard.scss";

type Props = {
  // id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const ProductCard: React.FC<Props> = (props) => {
  const { name, price, imageUrl } = props;
  return (
    <div className="productCardContainer">
      <div className="productCardImage">
        <img src={imageUrl} alt="" />
      </div>
      <div className="productCardInfo">
        <div className="productCardName">{name}</div>
        <div className="productCardPrice">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
