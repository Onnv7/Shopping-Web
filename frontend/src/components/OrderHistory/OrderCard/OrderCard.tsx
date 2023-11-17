import React from "react";
import "./ordercard.scss";
import { GetAllOrderHistoryByUserIdAnd } from "../../../interface/response/orther.response";
import { useNavigate } from "react-router-dom";
type Props = {
  itemInfo: GetAllOrderHistoryByUserIdAnd;
  orderStatus: string;
};

const OrderCard: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { itemInfo, orderStatus } = props;
  return (
    <div
      className="orderCardContainer"
      onClick={(e) => navigate(`/history/${itemInfo.id}`)}
    >
      <div className="orderCardImage">
        <img src={itemInfo.imageUrl} alt="" />
      </div>
      <div className="orderCardBody">
        <div className="orderCardNameWrap">
          <div className="orderCardName">
            {itemInfo.productName} x {itemInfo.quantity}
          </div>
          <div className="orderCardStatus">{orderStatus}</div>
        </div>
        <div className="orderCardPrice">Total ${itemInfo.totalPrice}</div>
        <div className="orderCardCreatedAt">
          {new Date(itemInfo.createdAt).toDateString()}
        </div>
        {itemInfo.itemSize > 1 && (
          <div className="orderCardItemMore">
            Have {itemInfo.itemSize} items more
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
