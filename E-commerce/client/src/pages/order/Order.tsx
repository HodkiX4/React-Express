import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './order.module.css'; // Add your styling
import useOrders from "../../hooks/useOrders";

const Order = () => {
  const { getOrderById, order, loadingOrder } = useOrders();
  const { orderId } = useParams<{ orderId: string }>(); // Get orderId from URL
  
  console.log(orderId);
  
  useEffect(() => {
    if(orderId) {
      getOrderById(orderId);
    }
  }, []);

  if (loadingOrder) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className={styles.orderPage}>
      <h1>Order Details</h1>
      <div className={styles.orderSummary}>
        <h2>Order Summary</h2>
        {order.products.map((item) => (
          <div key={item.product._id} className={styles.item}>
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className={styles.itemImage}
            />
            <span>{item.product.name}</span>
            <span>x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <p className={styles.total}>Total: ${order.totalPrice.toFixed(2)}</p>
        <p>Shipping Address: {order.shippingAddress}</p>
        <p>Status: {order.orderStatus}</p>
        <p>Payment Status: {order.paymentStatus}</p>
      </div>
    </div>
  );
};

export default Order;
