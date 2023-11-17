import { axiosPublic } from "./axios";

export const ProductApi = {
  getAllProducts: async () => {
    const { data } = await axiosPublic.get("/product");
    return data;
  },

  getProductById: async (id: string) => {
    const { data } = await axiosPublic.get(`/product/${id}`);
    return data;
  },
  getProductsByCategoryId: async (categoryId: string) => {
    const { data } = await axiosPublic.get(`/product/category/${categoryId}`);
    return data;
  },
};
