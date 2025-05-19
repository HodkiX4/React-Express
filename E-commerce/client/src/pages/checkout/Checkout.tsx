import { FormEvent } from 'react';
import styles from './checkout.module.css';
import useCart from '../../hooks/useCart';
import OrderSummary from '../../components/checkout/order-summary/OrderSummary';
import ShippingForm from '../../components/checkout/shipping-form/ShippingForm';
import useOrders from '../../hooks/useOrders';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  // Checkout.tsx
  const { cart } = useCart();
  const { placeOrder, loadingOrder } = useOrders();
  const navigate = useNavigate();
  const { showError } = useToast();
  
  const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const shippingAddress = Object.fromEntries(formData).address as string;

    if (!shippingAddress) {
      showError('Shipping address is required');
      return;
    }

    await placeOrder(shippingAddress, navigate);
  };

  return (
    <div className={styles.checkoutPage}>
      <h1>Checkout</h1>
      <OrderSummary cart={cart} />
      <ShippingForm onSubmit={handlePlaceOrder} loading={loadingOrder} />
    </div>
  );
};

export default Checkout;
