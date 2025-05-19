import { fetchOrdersApi, fetchOrderByIdApi, placeOrderApi } from "../api/orderApi";
import { useToast } from "../context/ToastContext";
import { NavigateFunction } from "react-router-dom";
import { useOrdersStore } from "../store/orderStore";

const useOrders = () => {
  const { orders,
    order,
    loadingOrders,
    loadingOrder,
    setOrders,
    setOrder,
    setLoadingOrders,
    setLoadingOrder
  } = useOrdersStore();
  const { showError, showSuccess } = useToast();

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const ordersData = await fetchOrdersApi();
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
      showError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const getOrderById = async (id: string) => {
    setLoadingOrder(true);
    try {
      const orderData = await fetchOrderByIdApi(id);
      setOrder(orderData);
    } catch (error) {
      console.error(error);
      showError("Failed to fetch this order. Please try again later.");
    } finally {
      setLoadingOrder(false);
    }
  };

  const placeOrder = async (shippingAddress: string, navigate: NavigateFunction) => {
    setLoadingOrder(true);
    try {
      const newOrder = await placeOrderApi(shippingAddress);
      setOrder(newOrder);
      showSuccess("Order was successful");
      navigate(`/protected/order/${newOrder._id}`);
    } catch (error) {
      console.error(error);
      showError("Failed to place order. Please try again.");
    } finally {
      setLoadingOrder(false);
    }
  };

  return {
    orders,
    order,
    loadingOrders,
    loadingOrder,
    fetchOrders,
    getOrderById,
    placeOrder,
  };
};

export default useOrders;
