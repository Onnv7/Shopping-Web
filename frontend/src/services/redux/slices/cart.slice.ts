import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../../interface/models/notification";
import {
  ICartItem,
  IDeliveringInfo,
} from "../../../interface/models/cart.model";
import { ProductApi } from "../../apis/product.api";
import { storageManager } from "../../../helper/storager";

export type CartPayload = {
  loading: boolean;
  succeed?: boolean;
  items: ICartItem[];
  deliveringInfo?: IDeliveringInfo;
  totalPrice: number;
  notification?: INotification;
};

const initialState = {
  loading: false,
  items: [],
  totalPrice: 0,
} as CartPayload;

export const getItemsCart = createAsyncThunk(
  "cart/get-items-info",
  async (_, thunkAPI) => {
    try {
      const items: ICartItem[] = storageManager.getCartItems();
      let data: ICartItem[] = [];
      const fetchItemInfo = async (item: ICartItem) => {
        const response = await ProductApi.getProductById(item.id);
        const itemInfo: ICartItem = response.data;
        itemInfo.quantity = item.quantity;
        data.push(itemInfo);
      };
      await Promise.all(items.map((it) => fetchItemInfo(it)));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Loading failed");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearNotificationCart: (state) => {
      state.notification = undefined;
    },

    clearItemCart: (state) => {
      state.items = [];
      state.deliveringInfo = undefined;
      state.totalPrice = 0;
    },
    changeQuantityItem: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.totalPrice =
          state.totalPrice -
          state.items[itemIndex].price *
            (state.items[itemIndex].quantity - quantity);
        state.items[itemIndex].quantity = quantity;
      }
    },

    updateDeliveringInfo: (state, action: PayloadAction<IDeliveringInfo>) => {
      state.deliveringInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItemsCart.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload;
        state.totalPrice = state.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      })
      .addCase(getItemsCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  changeQuantityItem,
  updateDeliveringInfo,
  clearNotificationCart,
  clearItemCart,
} = cartSlice.actions;
export default cartSlice.reducer;
