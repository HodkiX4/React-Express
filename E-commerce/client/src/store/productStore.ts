import { create } from 'zustand';
import { IProduct } from '../models/product.model';

interface ProductState {
  products: IProduct[];
  categories: string[];
  product: IProduct | null;
  loading: boolean;
  setProducts: (products: IProduct[]) => void;
  setCategories: (categories: string[]) => void;
  setProduct: (product: IProduct | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  product: null,
  loading: true,
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setProduct: (product) => set({ product }),
  setLoading: (loading) => set({ loading }),
}));
