import { Schema, Types, model } from 'mongoose';
import { IUser } from './user.model';
import { IProduct } from './product.model';

enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
}

enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

export interface IOrder extends Document {
  user: Types.ObjectId | IUser;
  products: {
    product: Types.ObjectId | IProduct;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.Pending },
  orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.Pending },
  createdAt: { type: Date, default: Date.now },
});

export default model<IOrder>('Order', orderSchema);