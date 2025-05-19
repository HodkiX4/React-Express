import { Response } from 'express';
import { NotFoundError, UnauthorizedError, BadRequestError } from '../errors/app.errors';
import Cart from '../models/cart.model';
import { IProduct } from '../models/product.model';
import Order from '../models/order.model';
import { CustomRequest } from '../types/costum';

export const placeOrder = async (req: CustomRequest<{}, {}, { shippingAddress: string }>, res: Response): Promise<void> => {
  const userId = req.userId;
  const { shippingAddress } = req.body;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  const cart = await Cart.findOne({ user: userId }).populate("products.product");
  if (!cart || cart.products.length === 0) {
    throw new BadRequestError("Cart is empty, cannot place order");
  }

  const orderProducts = cart.products.map(({ product, quantity }) => ({
    product: product._id,
    quantity,
    price: (product as IProduct).price, 
  }));

  const totalPrice = orderProducts.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const order = new Order({
    user: userId,
    products: orderProducts,
    totalPrice,
    shippingAddress,
    paymentStatus: "pending",
    orderStatus: "pending",
  });

  await order.save();
  await Cart.deleteOne({ user: userId });

  res.status(201).json({ message: "Order placed successfully", order });
};

export const getOrders = async (req: CustomRequest, res: Response): Promise<void> => {
  console.log("Macska");
  
  const userId = req.userId;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  const orders = await Order.find({ user: userId }).populate("products.product");

  if (!orders || orders.length === 0) {
    throw new NotFoundError("No orders found");
  }

  res.status(200).json({ orders });
};

export const getOrderById = async (req: CustomRequest<{ orderId: string }>, res: Response): Promise<void> => {
  const userId = req.userId;
  const { orderId } = req.params;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  const order = await Order.findOne({ _id: orderId, user: userId }).populate("products.product");

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  res.status(200).json({ order });
};
