import React, { useEffect, useState } from "react";
import "./orderdetails.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { getOrderDetailsById } from "../../services/redux/slices/order.slice";
import { useSelector } from "react-redux";
import {
  cartSelector,
  orderSelector,
} from "../../services/redux/selecters/selector";
import { GetOrderDetailsById } from "../../interface/response/orther.response";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const orderPayload = useSelector(orderSelector);
  const [orderDetails, setOrderDetails] = useState<
    GetOrderDetailsById | undefined
  >(orderPayload.orderDetails);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetailsById(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    setOrderDetails(orderPayload.orderDetails);
  }, [orderPayload.orderDetails]);
  return (
    <div className="orderDetailsContainer">
      <div className="orderDetailsWrap">
        <h3 className="orderDetailsHeader">Order details: {orderId}</h3>
        <div className="orderDetailsBody">
          <span className="orderDetailsProductWrap">
            <div className="orderDetailsProductInfo">
              {orderDetails?.products &&
                orderDetails.products.map((it) => (
                  <div className="orderDetailsProductItem">
                    <span className="orderDetailsImage">
                      <img src={it.imageUrl} alt="" />
                    </span>
                    <span className="orderDetailsItemInfo">
                      <div className="orderDetailsNameQuantity">
                        {it.name} x {it.quantity}
                      </div>
                      <div className="orderDetailsPrice">
                        ${it.quantity * it.price}
                      </div>
                    </span>
                  </div>
                ))}

              <hr />
              <div className="orderDetailsTotal">
                Total: ${orderDetails?.totalPrice}
              </div>
              <div className="orderDetailsStatus">
                Status: {orderDetails?.orderStatus}
              </div>
            </div>
            <div className="orderDetailsDelivering">
              <div className="orderDetailsDeliveringField">
                <span className="orderDetailsDeliveringFieldKey">Address:</span>
                <span className="orderDetailsDeliveringFieldValue">
                  {orderDetails?.address}
                </span>
              </div>
              <div className="orderDetailsDeliveringField">
                <span className="orderDetailsDeliveringFieldKey">
                  Phone number:
                </span>
                <span className="orderDetailsDeliveringFieldValue">
                  {orderDetails?.phoneNumber}
                </span>
              </div>
              <div className="orderDetailsDeliveringField">
                <span className="orderDetailsDeliveringFieldKey">Note:</span>
                <span className="orderDetailsDeliveringFieldValue">
                  {orderDetails?.note}
                </span>
              </div>
              <div className="orderDetailsDeliveringField">
                <span className="orderDetailsDeliveringFieldKey">
                  Created at:
                </span>
                <span className="orderDetailsDeliveringFieldValue">
                  {new Date(orderDetails?.createdAt!).toDateString()}
                </span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
