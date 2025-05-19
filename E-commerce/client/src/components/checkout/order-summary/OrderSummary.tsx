import styles from './orderSummary.module.css';
import { ICart } from '../../../models/cart.model';

interface OrderSummaryProps {
  cart: ICart | null;
}

const OrderSummary = ({ cart }: OrderSummaryProps) => {
  return (
    <div className={styles.cartSummary}>
      <h2>Order Summary</h2>
      {cart?.products.map((item) => (
        <div key={item.product._id} className={styles.item}>
          <span>{item.product.name}</span>
          <span>x{item.quantity}</span>
          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <p className={styles.total}>Total: ${cart?.totalPrice}</p>
    </div>
  );
};

export default OrderSummary;
