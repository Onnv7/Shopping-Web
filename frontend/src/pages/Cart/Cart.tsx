import React, { useEffect, useState } from "react";
import "./cart.scss";
import CartItem from "../../components/Cart/CartItem/CartItem";
import CartBill from "../../components/Cart/CartBill/CartBill";
import { storageManager } from "../../helper/storager";
import { ICartItem } from "../../interface/models/cart.model";
import { useSelector } from "react-redux";
import { cartSelector } from "../../services/redux/selecters/selector";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { getItemsCart } from "../../services/redux/slices/cart.slice";
import ElevatedButton from "../../components/Shared/ElevatedButton/ElevatedButton";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [itemList, setItemList] = useState<ICartItem[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemsCart()).then((data) =>
      setItemList(data.payload as ICartItem[])
    );
  }, [dispatch]);
  const handleOrder = () => {
    // if (!storageManager.getToken() || !storageManager.getUserId()) {
    //   navigate("/login");
    // } else
    navigate("/delivering");
  };
  return (
    <div className="cartContainer">
      <div className="cartWrap">
        <div className="cartHeader">SHOPPING CART</div>
        <div className="cartBody">
          <ul className="cartItemList">
            {itemList &&
              itemList.map((it) => {
                return (
                  <li className="cartItem">
                    <CartItem item={it} />
                  </li>
                );
              })}
          </ul>
          <span className="cartBill">
            <div className="cartBillCard">
              <CartBill />
            </div>
            <div className="cartBillOrderButton" onClick={handleOrder}>
              <ElevatedButton
                text="Order now"
                width="300px"
                color="white"
                backgroundColor="black"
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
