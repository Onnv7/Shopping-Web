import React, { useEffect, useState } from "react";
import "./cartitem.scss";
import ControlNumberPanel from "../../Shared/ControlNumberPanel/ControlNumberPanel";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useSelector } from "react-redux";
import { IProductDetails } from "../../../interface/response/product.response";
import {
  cartSelector,
  productSelector,
} from "../../../services/redux/selecters/selector";
import { getProductById } from "../../../services/redux/slices/product.slice";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { ICartItem } from "../../../interface/models/cart.model";
import { storageManager } from "../../../helper/storager";
import { ProductApi } from "../../../services/apis/product.api";
import {
  changeQuantityItem,
  clearItemCart,
} from "../../../services/redux/slices/cart.slice";

type Props = {
  item: ICartItem;
};

const CartItem: React.FC<Props> = (props) => {
  const { item } = props;

  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ICartItem | null>(item);

  // event handlers =================================================================
  const handleIncreaseItem = (value: number) => {
    if (product) {
      setProduct((prev) => {
        return {
          ...prev,
          quantity: value + 1,
        } as IProductDetails;
      });
      storageManager.updateQuantityById(item?.id, value + 1);
      dispatch(changeQuantityItem({ id: item?.id, quantity: value + 1 }));
    }
  };
  const handleDecreaseItem = (value: number) => {
    if (product?.quantity === 1) {
      handleDeleteItem();
      return;
    }
    if (product) {
      setProduct((prev) => {
        return {
          ...prev,
          quantity: value === 1 ? 1 : value - 1,
        } as IProductDetails;
      });
      storageManager.updateQuantityById(
        item?.id,
        product?.quantity === 1 ? 1 : product?.quantity - 1
      );
      dispatch(
        changeQuantityItem({
          id: item?.id,
          quantity: value === 1 ? 1 : value - 1,
        })
      );
    }
  };
  const handleDeleteItem = () => {
    storageManager.removeItemById(item.id);
    dispatch(clearItemCart());
    setProduct(null);
  };
  return (
    <>
      {product && (
        <div className="cartItemContainer">
          <div className="cartItemImage">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="cartItemInfo">
            <div className="cartItemName cartItemField">{product?.name}</div>
            <div className="cartItemPrice cartItemField">${product?.price}</div>
          </div>

          <div className="cartItemAction">
            <div className="cartItemControlNumber">
              <ControlNumberPanel
                value={product?.quantity!}
                onIncreaseValue={handleIncreaseItem}
                onDecreaseValue={handleDecreaseItem}
              />
            </div>
            <div className="cartItemDelete" onClick={handleDeleteItem}>
              <DeleteForeverRoundedIcon
                style={{ height: 40, width: 40, color: "red" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
