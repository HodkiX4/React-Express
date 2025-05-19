import { ICartItem } from '../models/cart.model';
import {
  fetchCartData,
  addToCartApi,
  removeFromCartApi,
  updateCartApi,
  clearCartApi,
} from '../api/cartApi';
import { useToast } from '../context/ToastContext';
import { useCartStore } from '../store/cartStore';

const useCart = () => {
  const {
    cart,
    setCart,
    loading,
    setLoading
  } = useCartStore();
  
  const { showError, showSuccess } = useToast();

  const calculateTotalPrice = (items: ICartItem[]): number => {
    return Number(items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2));
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await fetchCartData();
      setCart({
        ...cartData,
        totalPrice: calculateTotalPrice(cartData.products),
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      showError('Failed to fetch cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      await addToCartApi(productId, quantity);
      if (!cart) return;

      const existingItem = cart.products.find(item => item.product._id === productId);
      let updatedProducts;

      if (existingItem) {
        updatedProducts = cart.products.map(item =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        await fetchCart();
        return;
      }

      const updatedTotal = calculateTotalPrice(updatedProducts);
      setCart({ ...cart, products: updatedProducts, totalPrice: updatedTotal });
      showSuccess("Successfully added to cart.");
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError('Failed to add product to cart.');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await removeFromCartApi(productId);
      if (!cart) return;

      const updatedProducts = cart.products.filter(
        item => item.product._id !== productId
      );

      const updatedTotal = calculateTotalPrice(updatedProducts);
      setCart({ ...cart, products: updatedProducts, totalPrice: updatedTotal });
      showSuccess("Successfully removed from cart.");
    } catch (error) {
      console.error('Error removing from cart:', error);
      showError('Failed to remove product from cart.');
    }
  };

  const updateCart = async (productId: string, quantity: number) => {
    try {
      await updateCartApi(productId, quantity);
      if (!cart) return;

      const updatedProducts = cart.products.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      );

      const updatedTotal = calculateTotalPrice(updatedProducts);
      setCart({ ...cart, products: updatedProducts, totalPrice: updatedTotal });
      showSuccess("Successfully updated the cart.");
    } catch (error) {
      console.error('Error updating cart:', error);
      showError('Failed to update cart.');
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi();
      setCart({ products: [], totalPrice: 0 });
      showSuccess("Cart has been cleared.");
    } catch (error) {
      console.error('Error clearing cart:', error);
      showError('Failed to clear the cart.');
    }
  };

  return {
    cart,
    setCart,
    loading,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart
  };
};

export default useCart;
