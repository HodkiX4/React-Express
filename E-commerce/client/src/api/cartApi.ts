import { ICart } from '../models/cart.model';
import { API } from './axiosInstance';

export const fetchCartData = async (): Promise<ICart> => {
  const response = await API.get('/protected/cart');
  return response.data;
};

export const addToCartApi = async (productId: string, quantity: number): Promise<ICart> => {
  const response = await API.post('/protected/cart/add', { productId, quantity });
  return response.data.cart;
};

export const removeFromCartApi = async (productId: string): Promise<ICart> => {
  const response = await API.delete(`/protected/cart/${productId}`);
  return response.data.cart;
};

export const updateCartApi = async (productId: string, quantity: number): Promise<ICart> => {
  const response = await API.put('/protected/cart/update', { productId, quantity });
  return response.data.cart;
};

export const clearCartApi = async (): Promise<ICart> => {
  const response = await API.delete('/protected/cart');
  return response.data.cart;
};
