import {
  UpdatePassword,
  UpdateProfile,
} from "../../interface/requests/user.request";
import { axiosPrivate } from "./axios";

export const UserApi = {
  getUserById: async (id: string) => {
    const { data } = await axiosPrivate.get(`/user/${id}`);
    return data;
  },
  updateUserById: async (id: string, body: UpdateProfile) => {
    const { data } = await axiosPrivate.put(`/user/${id}`, body);
    return data;
  },
  changePassword: async (id: string, body: UpdatePassword) => {
    const { data } = await axiosPrivate.patch(`/user/${id}/password`, body);
    return data;
  },
};
