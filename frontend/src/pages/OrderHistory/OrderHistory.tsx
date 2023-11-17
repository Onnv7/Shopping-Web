import React, { useEffect, useState } from "react";
import "./orderhistory.scss";
import OrderCard from "../../components/OrderHistory/OrderCard/OrderCard";
import { useLocation, useSearchParams } from "react-router-dom";
import useQuery from "../../hooks/useQueryUrl";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { OrderStatus } from "../../enums/OrderStatus.enum";
import { getOrdersByUerIdAndStatus } from "../../services/redux/slices/order.slice";
import { storageManager } from "../../helper/storager";
import { useSelector } from "react-redux";
import { orderSelector } from "../../services/redux/selecters/selector";

const OrderHistory: React.FC = () => {
  const statusList = ["All", "Created", "Accepted", "Delivering"];
  const query = useQuery();
  const dispatch = useAppDispatch();
  const orderPayload = useSelector(orderSelector);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    OrderStatus.CREATED
  );
  useEffect(() => {
    dispatch(
      getOrdersByUerIdAndStatus({
        userId: storageManager.getUserId()!,
        status: selectedStatus as OrderStatus,
      })
    );
  }, [dispatch, selectedStatus]);
  return (
    <div className="orderHistoryContainer">
      <div className="orderHistoryWrap">
        <h3 className="orderHistoryHeader">Order history</h3>
        <div className="orderHistoryBody">
          <div className="orderHistoryStatusTab">
            <ul>
              <li
                className={`orderHistoryStatusItem ${
                  selectedStatus === OrderStatus.CREATED && "selected"
                }`}
                onClick={() => setSelectedStatus(OrderStatus.CREATED)}
              >
                Created
              </li>
              <li
                className={`orderHistoryStatusItem ${
                  selectedStatus === OrderStatus.ACCEPTED && "selected"
                }`}
                onClick={() => setSelectedStatus(OrderStatus.ACCEPTED)}
              >
                Accepted
              </li>

              <li
                className={`orderHistoryStatusItem ${
                  selectedStatus === OrderStatus.DELIVERING && "selected"
                }`}
                onClick={() => setSelectedStatus(OrderStatus.DELIVERING)}
              >
                Delivering
              </li>

              <li
                className={`orderHistoryStatusItem ${
                  selectedStatus === OrderStatus.SUCCEED && "selected"
                }`}
                onClick={() => setSelectedStatus(OrderStatus.SUCCEED)}
              >
                Succeed
              </li>
              <li
                className={`orderHistoryStatusItem ${
                  selectedStatus === OrderStatus.CANCELED && "selected"
                }`}
                onClick={() => setSelectedStatus(OrderStatus.CANCELED)}
              >
                Canceled
              </li>
            </ul>
            <hr />
          </div>
          <div className="orderHistoryList">
            {orderPayload.orderHistory?.map((it) => (
              <div className="orderHistoryItem">
                <OrderCard itemInfo={it} orderStatus={selectedStatus} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
