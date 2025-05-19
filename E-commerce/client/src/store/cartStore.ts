import { create } from 'zustand';
import { ICart } from '../models/cart.model';

interface CartState {
  cart: ICart | null;
  loading: boolean;
  setCart: (cart: ICart) => void;
  setLoading: (loading: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,
  setCart: (cart) => set({ cart }),
  setLoading: (loading) => set({ loading }),
}));
