import axios from "axios";

const BASE_URL = "http://localhost:7000";
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosPrivateForm = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" }, //multipart/form-data application/json
  withCredentials: true,
});

axiosPrivateForm.interceptors.request.use(
  (req) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosPrivateForm.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      // localStorage.clear();
    }
    return Promise.reject(error);
  }
);

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }, //multipart/form-data application/json
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (req) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      // localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPrivateForm };
