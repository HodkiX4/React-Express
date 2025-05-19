// OrderHistory.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./orderHistory.module.css";  // You can adjust styles as needed
import useOrders from "../../../hooks/useOrders";

const OrderHistory = () => {
  const { orders, loadingOrders, fetchOrders } = useOrders();

  // Fetch orders when the component mounts
  useEffect(() => {
    if(orders.length === 0) {
      fetchOrders();
    }
  }, []);

  if (loadingOrders) {
    return <div>Loading your order history...</div>;
  }

  if (orders.length === 0) {
    return <div>You have no orders yet.</div>;
  }

  return (
    <div className={styles.ordersContainer}>
      <h3 className={styles.title}>Your Order History</h3>
      <ul className={styles.ordersList}>
        {orders.map((order) => (
          <li key={order._id} className={styles.orderItem}>
            <Link to={`/protected/order/${order._id}`} className={styles.orderLink}>
              <div className={styles.orderDetails}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
