import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const authSelector = (state: RootState) => state.auth;
export const productSelector = (state: RootState) => state.product;
export const cartSelector = (state: RootState) => state.cart;
export const orderSelector = (state: RootState) => state.order;
export const userSelector = (state: RootState) => state.user;
