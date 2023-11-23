import React, { useEffect, useState } from "react";
import "./productdetails.scss";
import OutLineButton from "../../components/Shared/OutlineButton/OutLineButton";
import ElevatedButton from "../../components/Shared/ElevatedButton/ElevatedButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { useSelector } from "react-redux";
import { productSelector } from "../../services/redux/selecters/selector";
import { getProductById } from "../../services/redux/slices/product.slice";
import { IProductDetails } from "../../interface/response/product.response";
import ControlNumberPanel from "../../components/Shared/ControlNumberPanel/ControlNumberPanel";
import { storageManager } from "../../helper/storager";
import { ICartItem } from "../../interface/models/cart.model";
import { toaster } from "../../helper/toaster";
import { getItemsCart } from "../../services/redux/slices/cart.slice";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productPayload = useSelector(productSelector);
  const [product, setProduct] = useState<IProductDetails>();
  useEffect(() => {
    if (productId) dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setProduct(productPayload.product);
  }, [productPayload.product]);

  // event handlers =================================================================

  const handleAddToCart = () => {
    if (product) {
      storageManager.pushItemToCart({
        id: product?.id,
        quantity: product?.quantity,
      } as ICartItem);
      toaster.success({ text: "Add to cart successfully" });
    }
  };

  const handlePayNow = () => {
    if (product) {
      storageManager.pushItemToCart({
        id: product?.id,
        quantity: product?.quantity,
      } as ICartItem);
      dispatch(getItemsCart());
      navigate("/delivering");
    }
  };

  return (
    <div className="productDetailsContainer">
      {product ? (
        <>
          <div className="productDetailsImage">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="productDetailsInfo">
            <div className="productDetailsName productDetailsField">
              {product.name}
            </div>
            <div className="productDetailsDescription productDetailsField">
              {product.description}
            </div>
            <div className="productDetailsPrice productDetailsField">
              ${product.price}
            </div>
            <ControlNumberPanel
              value={product.quantity}
              onDecreaseValue={(value) => {
                setProduct((prev) => {
                  return {
                    ...prev,
                    quantity: value === 1 ? 1 : value - 1,
                  } as IProductDetails;
                });
              }}
              onIncreaseValue={(value) => {
                setProduct((prev) => {
                  return {
                    ...prev,
                    quantity: value + 1,
                  } as IProductDetails;
                });
              }}
            />
            <div className="productDetailsAction">
              <div className="productDetailBuyNowButton productDetailsActionButton">
                <OutLineButton
                  color="black"
                  text="Buy now"
                  onClick={handlePayNow}
                />
              </div>
              <div className="productDetailAddToCartButton productDetailsActionButton">
                <ElevatedButton
                  backgroundColor="black"
                  text="Add to cart"
                  onClick={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Product is not existed</h1>
      )}
    </div>
  );
};

export default ProductDetails;
