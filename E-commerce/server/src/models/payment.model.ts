import { model, Schema, Types } from "mongoose";
import { IOrder } from "./order.model";


export interface IPayment extends Document {
  order: Types.ObjectId | IOrder;
  paymentMethod: string;
  paymentStatus: string;
  transactionId?: string;
}

const paymentSchema = new Schema<IPayment>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, required: true, default: 'pending' },
  transactionId: { type: String, required: false },
});

export default model<IPayment>('Payment', paymentSchema);