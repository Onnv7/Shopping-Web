import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INotification,
  NotificationConstant,
} from "../../../interface/models/notification";
import {
  IProductCard,
  IProductDetails,
} from "../../../interface/response/product.response";
import { ProductApi } from "../../apis/product.api";
import { act } from "react-dom/test-utils";

export type ProductPayload = {
  loading: boolean;
  succeed?: boolean;
  products: IProductCard[];
  product?: IProductDetails;
  notification?: INotification;
};
const initialState = {
  loading: false,
  products: [],
} as ProductPayload;

export const getAllProducts = createAsyncThunk(
  "product/get-all-products",
  async (_, thunkAPI) => {
    try {
      const response = await ProductApi.getAllProducts();
      const data: IProductCard[] = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Loading failed");
    }
  }
);
export const getProductById = createAsyncThunk(
  "product/get-product-by-id",
  async (id: string, thunkAPI) => {
    try {
      const response = await ProductApi.getProductById(id);
      const data: IProductDetails = response.data;
      data.quantity = 1;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Loading failed");
    }
  }
);

export const getProductsByCategoryId = createAsyncThunk(
  "product/get-products-by-category-id",
  async (categoryId: string, thunkAPI) => {
    try {
      const response = await ProductApi.getProductsByCategoryId(categoryId);
      const data: IProductCard[] = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Loading failed");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Loading failed",
        };
      })
      // get product by id
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Loading failed",
        };
      })
      // get products by category id
      .addCase(getProductsByCategoryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Loading failed",
        };
      });
  },
});
export default productSlice.reducer;
