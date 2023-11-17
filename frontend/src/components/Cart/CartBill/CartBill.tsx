import React, { useState } from "react";
import "./cartbill.scss";
import { useSelector } from "react-redux";
import { cartSelector } from "../../../services/redux/selecters/selector";
const CartBill = () => {
  const cartPayload = useSelector(cartSelector);

  return (
    <div className="cartBillContainer">
      <h3 className="cartBillTitle">PRODUCT BILL</h3>
      <div className="cartBillContent">
        {cartPayload &&
          cartPayload.items.map((it) => {
            return (
              <li className="cartBillItem">
                <span className="cartBillContentName">{`${it.name} x ${it.quantity}`}</span>
                <span className="cartBillContentPrice">
                  ${it.price * it.quantity}
                </span>
              </li>
            );
          })}
        <hr />
        <div className="cartBillTotal">
          <span className="cartBillTotalTitle">Total</span>
          <span className="cartBillTotalPrice">${cartPayload.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CartBill;
