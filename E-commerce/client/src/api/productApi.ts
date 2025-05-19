import { IProduct } from "../models/product.model";
import { API } from "./axiosInstance";

const fetchProductsData = async (): Promise<IProduct[]> => {
  const response = await API.get<{ products: IProduct[] }>("/products");
  return response.data.products;
};

const getProductByIdApi = async (id: string): Promise<IProduct> => {
  const response = await API.get<{ product: IProduct }>(`/products/${id}`);
  return response.data.product;
};

export { fetchProductsData, getProductByIdApi };