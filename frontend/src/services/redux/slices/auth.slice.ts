import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  INotification,
  NotificationConstant,
} from "../../../interface/models/notification";
import {
  ILoginRequest,
  IRegisterRequest,
} from "../../../interface/requests/auth.request";
import { AuthApi } from "../../apis/auth.api";
import { ILoginResponse } from "../../../interface/response/auth.response";

export type AuthPayload = {
  loading: boolean;
  auth?: ILoginResponse;
  succeed?: boolean;
  notification?: INotification;
};

const initialState = {
  loading: false,
} as AuthPayload;

export const login = createAsyncThunk(
  "auth/login",
  async (body: ILoginRequest, thunkAPI) => {
    try {
      const response = await AuthApi.login(body);
      const data: ILoginResponse = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (body: IRegisterRequest, thunkAPI) => {
    try {
      const response = await AuthApi.register(body);
      const data: ILoginResponse = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Register failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthSucceedStatus(state) {
      state.succeed = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.succeed = true;
        state.auth = action.payload;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Login successfully",
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Login failed",
        };
      })
      // register account
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.succeed = true;
        state.auth = action.payload;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Register successfully",
        };
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Login failed",
        };
      });
  },
});

export const { clearAuthSucceedStatus } = authSlice.actions;
export default authSlice.reducer;
