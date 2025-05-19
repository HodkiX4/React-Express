import { IOrder } from '../models/order.model';
import { API } from './axiosInstance';

export const placeOrderApi = async (shippingAddress: string): Promise<IOrder> => {
  const response = await API.post('/protected/order', { shippingAddress });
  return response.data.order;
};

export const fetchOrdersApi = async (): Promise<IOrder[]> => {
  const response = await API.get('/protected/orders');
  return response.data.orders;
};

export const fetchOrderByIdApi = async (orderId: string): Promise<IOrder> => {
  const response = await API.get(`/protected/order/${orderId}`);
  return response.data.order;
};
