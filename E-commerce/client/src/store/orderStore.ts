import { create } from "zustand";
import { IOrder } from "../models/order.model";

interface OrdersState {
  orders: IOrder[];
  order: IOrder | null;
  loadingOrders: boolean;
  loadingOrder: boolean;
  setOrders: (orders: IOrder[]) => void;
  setOrder: (order: IOrder | null) => void;
  setLoadingOrders: (loading: boolean) => void;
  setLoadingOrder: (loading: boolean) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  order: null,
  loadingOrders: false,
  loadingOrder: false,
  setOrders: (orders) => set({ orders }),
  setOrder: (order) => set({ order }),
  setLoadingOrders: (loading) => set({ loadingOrders: loading }),
  setLoadingOrder: (loading) => set({ loadingOrder: loading }),
}));
