import { IProduct } from './product.model';  // Assuming you have a product model

export interface IOrder {
  _id: string;  // Unique identifier for the order
  user: string; // The user ID (could be a string or an object, depending on your backend design)
  products: {
    product: IProduct;  // The product object, assuming it's populated
    quantity: number;   // Quantity of the product in the order
    price: number;      // Price of the product at the time of order
  }[];
  totalPrice: number;       // The total price for the order
  shippingAddress: string;  // The shipping address provided during checkout
  paymentStatus: string;   // Payment status, e.g., 'pending', 'paid'
  orderStatus: string;     // Order status, e.g., 'pending', 'shipped', 'delivered'
  createdAt: string;       // The date when the order was created (can be a string or Date type)
}