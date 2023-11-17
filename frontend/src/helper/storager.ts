import { ICartItem } from "../interface/models/cart.model";

export const storageManager = {
  clearAuth: () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
  },
  getUserId: () => {
    return window.localStorage.getItem("userId");
  },
  setUserId: (userId: string) => {
    window.localStorage.setItem("userId", userId);
  },

  getToken: () => {
    return window.localStorage.getItem("token");
  },
  setToken: (token: string) => {
    window.localStorage.setItem("token", token);
  },
  clearStore: () => {
    window.localStorage.clear();
  },

  pushItemToCart: (item: ICartItem) => {
    const currentCart = JSON.parse(window.localStorage.getItem("cart") || "[]");

    const existingItemIndex = currentCart.findIndex(
      (cartItem: ICartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    window.localStorage.setItem("cart", JSON.stringify(currentCart));
  },
  getCartItems: () => {
    const cartItemsString = window.localStorage.getItem("cart");
    const cartItemsArray: ICartItem[] = cartItemsString
      ? JSON.parse(cartItemsString)
      : [];
    return cartItemsArray;
  },

  // findQuantityById: (itemId: string): number => {
  //   const currentCart = JSON.parse(window.localStorage.getItem("cart") || "[]");

  //   const foundItem = currentCart.find(
  //     (cartItem: ICartItem) => cartItem.id === itemId
  //   );

  //   return foundItem ? foundItem.quantity : 0;
  // },
  updateQuantityById: (itemId: string, newQuantity: number): void => {
    const currentCart = JSON.parse(window.localStorage.getItem("cart") || "[]");

    const updatedCart = currentCart.map((cartItem: ICartItem) => {
      if (cartItem.id === itemId) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  removeItemById: (itemId: string) => {
    const currentCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    const updatedCart = currentCart.filter(
      (cartItem: ICartItem) => cartItem.id !== itemId
    );
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  },
};
