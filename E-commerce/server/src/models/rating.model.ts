import { model, Schema, Types } from "mongoose";
import { IProduct } from "./product.model";
import { IUser } from "./user.model";

export interface IReview extends Document {
  user: Types.ObjectId | IUser;
  product: Types.ObjectId | IProduct;
  rating: number;
  reviewText: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default model('Review', reviewSchema);