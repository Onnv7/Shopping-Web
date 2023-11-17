import {
  ILoginRequest,
  IRegisterRequest,
} from "../../interface/requests/auth.request";
import { axiosPublic } from "./axios";

export const AuthApi = {
  login: async (body: ILoginRequest) => {
    const { data } = await axiosPublic.post("/auth/login", body);
    return data;
  },
  register: async (body: IRegisterRequest) => {
    const { data } = await axiosPublic.post("/auth/register", body);
    return data;
  },
};
