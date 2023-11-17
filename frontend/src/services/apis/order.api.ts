import { OrderStatus } from "../../enums/OrderStatus.enum";
import { ICreateOrderRequest } from "../../interface/requests/order.request";
import { axiosPrivate } from "./axios";

export const OrderApi = {
  createOrder: async (item: ICreateOrderRequest) => {
    const { data } = await axiosPrivate.post(`/order`, item);
    return data;
  },
  getOrdersByUerIdAndStatus: async (userId: string, status: OrderStatus) => {
    const { data } = await axiosPrivate.get(
      `/order/user/${userId}?status=${status}`
    );
    return data;
  },

  getOrderDetailsById: async (id: string) => {
    const { data } = await axiosPrivate.get(`/order/${id}`);
    return data;
  },
};
