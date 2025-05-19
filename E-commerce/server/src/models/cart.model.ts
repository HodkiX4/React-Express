import { model, Schema, Types } from "mongoose";
import { IUser } from "./user.model";
import { IProduct } from "./product.model";

export interface ICart extends Document {
  user: Types.ObjectId | IUser;
  products: {
    product: Types.ObjectId | IProduct;
    quantity: number;
  }[];
}

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export default model<ICart>('Cart', cartSchema);