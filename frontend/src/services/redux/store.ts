import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import productSlice from "./slices/product.slice";
import cartSlice from "./slices/cart.slice";
import orderSlice from "./slices/order.slice";
import userSlice from "./slices/user.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
