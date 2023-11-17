import React, { useEffect, useState } from "react";
import "./ordersubmit.scss";
import { useSelector } from "react-redux";
import {
  cartSelector,
  orderSelector,
} from "../../services/redux/selecters/selector";
import TextInput from "../../components/Shared/TextInput/TextInput";
import ElevatedButton from "../../components/Shared/ElevatedButton/ElevatedButton";
import { storageManager } from "../../helper/storager";
import {
  ICreateOrderRequest,
  IOrderProduct,
} from "../../interface/requests/order.request";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { createOrder } from "../../services/redux/slices/order.slice";
import { useNavigate } from "react-router-dom";
import { deliveringSchema } from "../../validators/Cart";
import { useValidator } from "../../hooks/useValidator";

const OrderSubmit: React.FC = () => {
  const carPayload = useSelector(cartSelector);
  const [item, setItem] = useState<ICreateOrderRequest | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartPayload = useSelector(cartSelector);
  const orderPayload = useSelector(orderSelector);
  const { errors, validate } = useValidator(deliveringSchema);

  useEffect(() => {
    if (carPayload.deliveringInfo) {
      const result = validate(carPayload.deliveringInfo);
      if (!result) {
        navigate("/cart");
      }
    }
    if (
      !cartPayload.totalPrice ||
      !cartPayload.items ||
      carPayload.items.length === 0
    ) {
      navigate("/cart");
    }
  }, [
    carPayload.deliveringInfo,
    carPayload.items.length,
    cartPayload.deliveringInfo,
    cartPayload.items,
    cartPayload.totalPrice,
    navigate,
  ]);

  useEffect(() => {
    const productsInfo = carPayload.items.map((it) => {
      return {
        productId: it.id,
        quantity: it.quantity,
        price: it.price,
      } as IOrderProduct;
    });
    const it = {
      userId: storageManager.getUserId(),
      products: productsInfo,
      address: carPayload.deliveringInfo?.address,
      phoneNumber: carPayload.deliveringInfo?.phoneNumber,
      note: carPayload.deliveringInfo?.note,
      totalPrice: carPayload.totalPrice,
    } as ICreateOrderRequest;

    setItem(it);
  }, [
    carPayload.deliveringInfo?.address,
    carPayload.deliveringInfo?.note,
    carPayload.deliveringInfo?.phoneNumber,
    carPayload.items,
    carPayload.totalPrice,
  ]);

  useEffect(() => {
    if (orderPayload.succeed) {
      carPayload.items.map((item) => storageManager.removeItemById(item.id));
      navigate("/cart");
    }
  }, [carPayload.items, navigate, orderPayload.succeed]);
  // event handlers =================================================================

  const handleOrder = async () => {
    if (item) {
      dispatch(createOrder(item));
    }
  };
  return (
    <div className="orderSubmitContainer">
      <h3 className="orderSubmitHeader">Order</h3>
      <div className="orderSubmitBody">
        <div className="orderSubmitFormProduct orderSubmitForm">
          <div className="orderSubmitFormTitle">Product</div>
          {carPayload.items &&
            carPayload.items.map((it) => (
              <div className=" orderSubmitField">
                <span className="orderSubmitProductFieldTitle">
                  {it.name} x {it.quantity}
                </span>
                <span className="orderSubmitProductFieldValue">
                  ${it.quantity * it.price}
                </span>
              </div>
            ))}

          <hr />

          <div className="orderSubmitField">
            <span className="orderSubmitProductFieldTitle">Total</span>
            <span className="orderSubmitProductFieldValue">
              ${carPayload.totalPrice}
            </span>
          </div>
        </div>
        <div className="orderSubmitFormDelivering orderSubmitForm">
          <div className="orderSubmitFormTitle">Delivering</div>
          {carPayload.deliveringInfo && (
            <>
              <div className="orderSubmitField">
                <span className="orderSubmitProductFieldTitle">Address</span>
                <span className="orderSubmitProductFieldValue">
                  {carPayload.deliveringInfo.address}
                </span>
              </div>
              <div className="orderSubmitField">
                <span className="orderSubmitProductFieldTitle">
                  Phone number
                </span>
                <span className="orderSubmitProductFieldValue">
                  {carPayload.deliveringInfo.phoneNumber}
                </span>
              </div>
              <div className="orderSubmitField">
                <span className="orderSubmitProductFieldTitle">Note</span>
                <span className="orderSubmitProductFieldValue">
                  {carPayload.deliveringInfo.note}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="orderSubmitButton">
          <ElevatedButton
            text="Confirm"
            color="white"
            backgroundColor="black"
            width="300px"
            onClick={handleOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSubmit;
