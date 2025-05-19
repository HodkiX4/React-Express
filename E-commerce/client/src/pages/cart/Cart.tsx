import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import styles from './cart.module.css';
import CartItem from "../../components/cart/CartItem";

const CartPage = () => {
  const { cart, loading, removeFromCart, updateCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  if (!cart) return <h1>No Cart</h1>;

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>, id: string, current: number) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value !== current) {
      updateCart(id, value);
    }
  };
  
  const handleClear = () => {
    clearCart();
  }

  const handleCheckout = () => {
    navigate("/protected/checkout");
  };

  return (
    <div className={styles.cartContainer}>
      {cart.products.length === 0 ? (
        <h3 className={styles.cartEmpty}>
          Your cart is empty. Go to <Link to="/store">Store</Link> to add items!
        </h3>
      ) : (
        <div>
          {cart.products.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
            />
          ))}
          <div className={styles.cartTotal}>
            <p>Total: ${cart.totalPrice}</p>
            <button
              onClick={handleClear}
              className={styles.deleteButton}
            >
              Clear
            </button>
            <button
              onClick={handleCheckout}
              className={styles.checkoutButton}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
