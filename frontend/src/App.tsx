import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import RootLayout from "./layouts/RootLayout/RootLayout";
import { Routes, Route, Outlet } from "react-router-dom";
import RequireAuth from "./components/Shared/RequireAuth/RequireAuth";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import AddressOrder from "./pages/AddressOrder/AddressOrder";
import OrderSubmit from "./pages/OrderSubmit/OrderSubmit";
import { useAppDispatch } from "./services/redux/useTypedSelector";
import {
  authSelector,
  cartSelector,
  orderSelector,
  productSelector,
  userSelector,
} from "./services/redux/selecters/selector";
import { useSelector } from "react-redux";
import { toaster } from "./helper/toaster";
import { NotificationConstant } from "./interface/models/notification";
import Loading from "./components/Shared/Loading/Loading";
import { clearNotificationCart } from "./services/redux/slices/cart.slice";
import { clearNotificationOrder } from "./services/redux/slices/order.slice";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import { clearAuthSucceedStatus } from "./services/redux/slices/auth.slice";

function App() {
  const dispatch = useAppDispatch();
  const productPayload = useSelector(productSelector);
  const cartPayload = useSelector(cartSelector);
  const orderPayload = useSelector(orderSelector);
  const userPayload = useSelector(userSelector);
  const authPayload = useSelector(authSelector);
  useEffect(() => {
    if (authPayload.notification) {
      const { type, message } = authPayload.notification;
      if (type === NotificationConstant.SUCCESS) {
        toaster.success({ text: message });
      } else if (type === NotificationConstant.ERROR) {
        toaster.error({ text: message });
      }
      dispatch(clearAuthSucceedStatus());
    }
    if (productPayload.notification) {
      const { type, message } = productPayload.notification;
      if (type === NotificationConstant.SUCCESS) {
        toaster.success({ text: message });
      } else if (type === NotificationConstant.ERROR) {
        toaster.error({ text: message });
      }
    }
    if (cartPayload.notification) {
      const { type, message } = cartPayload.notification;
      if (type === NotificationConstant.SUCCESS) {
        toaster.success({ text: message });
      } else if (type === NotificationConstant.ERROR) {
        toaster.error({ text: message });
      }
      dispatch(clearNotificationCart());
    }
    if (orderPayload.notification) {
      const { type, message } = orderPayload.notification;
      if (type === NotificationConstant.SUCCESS) {
        toaster.success({ text: message });
      } else if (type === NotificationConstant.ERROR) {
        toaster.error({ text: message });
      }
      dispatch(clearNotificationOrder());
    }
    if (userPayload.notification) {
      const { type, message } = userPayload.notification;
      if (type === NotificationConstant.SUCCESS) {
        toaster.success({ text: message });
      } else if (type === NotificationConstant.ERROR) {
        toaster.error({ text: message });
      }
    }
  }, [
    authPayload.notification,
    cartPayload.notification,
    dispatch,
    orderPayload.notification,
    productPayload.notification,
    userPayload.notification,
  ]);
  return (
    <div className="App">
      {(authPayload.loading ||
        cartPayload.loading ||
        productPayload.loading ||
        orderPayload.loading ||
        userPayload.loading) && <Loading />}
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<RootLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="delivering" element={<AddressOrder />} />
            <Route path="order" element={<OrderSubmit />} />
            <Route path="history" element={<OrderHistory />} />
            <Route path="history/:orderId" element={<OrderDetails />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignIn />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Outlet />}>
            <Route index element={<Cart />} />
          </Route>
          <Route path="product/:productId" element={<ProductDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
