import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INotification,
  NotificationConstant,
} from "../../../interface/models/notification";
import { ICreateOrderRequest } from "../../../interface/requests/order.request";
import { OrderApi } from "../../apis/order.api";
import { boolean } from "zod";
import { OrderStatus } from "../../../enums/OrderStatus.enum";
import {
  GetAllOrderHistoryByUserIdAnd,
  GetOrderDetailsById,
} from "../../../interface/response/orther.response";
export type OrderPayload = {
  loading: boolean;
  succeed?: boolean;
  orderHistory?: GetAllOrderHistoryByUserIdAnd[];
  orderDetails?: GetOrderDetailsById;
  notification?: INotification;
};

const initialState = {
  loading: false,
} as OrderPayload;

export const createOrder = createAsyncThunk(
  "order/create-order",
  async (item: ICreateOrderRequest, thunkAPI) => {
    try {
      const response = await OrderApi.createOrder(item);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Created fail");
    }
  }
);

export const getOrdersByUerIdAndStatus = createAsyncThunk(
  "order/get-order-by-user-id-and-status",
  async (
    { userId, status }: { userId: string; status: OrderStatus },
    thunkAPI
  ) => {
    try {
      const response = await OrderApi.getOrdersByUerIdAndStatus(userId, status);
      const data: GetAllOrderHistoryByUserIdAnd[] = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Created fail");
    }
  }
);

export const getOrderDetailsById = createAsyncThunk(
  "order/get-order-details",
  async (id: string, thunkAPI) => {
    try {
      const response = await OrderApi.getOrderDetailsById(id);
      const data: GetOrderDetailsById = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Get fail");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearNotificationOrder: (state) => {
      state.notification = undefined;
      state.succeed = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
        state.succeed = true;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Created order successfully",
        };
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Created order fail",
        };
      })
      // get orders by user id and status
      .addCase(getOrdersByUerIdAndStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersByUerIdAndStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload;
      })
      .addCase(getOrdersByUerIdAndStatus.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Get order fail",
        };
      })
      // get order details by id
      .addCase(getOrderDetailsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetailsById.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Get order fail",
        };
      });
  },
});

export const { clearNotificationOrder } = orderSlice.actions;
export default orderSlice.reducer;
