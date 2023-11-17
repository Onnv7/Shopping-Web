import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INotification,
  NotificationConstant,
} from "../../../interface/models/notification";
import { GetUserById } from "../../../interface/response/user.response";
import { UserApi } from "../../apis/user.api";
import {
  UpdatePassword,
  UpdateProfile,
} from "../../../interface/requests/user.request";

export type UserPayload = {
  loading: boolean;
  succeed?: boolean;
  profile?: GetUserById;
  notification?: INotification;
};
const initialState = {
  loading: false,
} as UserPayload;

export const getUserById = createAsyncThunk(
  "user/get-user-by-id",
  async (id: string, thunkAPI) => {
    try {
      const response = await UserApi.getUserById(id);
      const data: GetUserById = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Get profile failed");
    }
  }
);
export const updateUserById = createAsyncThunk(
  "user/update-user-by-id",
  async ({ id, body }: { id: string; body: UpdateProfile }, thunkAPI) => {
    try {
      const response = await UserApi.updateUserById(id, body);

      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Get profile failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/change-password-by-id",
  async ({ id, body }: { id: string; body: UpdatePassword }, thunkAPI) => {
    try {
      const response = await UserApi.changePassword(id, body);

      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Change password failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStatusUser: (state) => {
      state.succeed = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Get profile failed",
        };
      })
      // update profile by id
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Update profile success",
        };
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Get profile failed",
        };
      })
      // update password by user id

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Change password success",
        };
        state.succeed = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Change password failed",
        };
      });
  },
});
export const { clearStatusUser } = userSlice.actions;
export default userSlice.reducer;
