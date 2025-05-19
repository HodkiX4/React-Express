import mongoose, { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}

const productSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
})

const Product = model<IProduct>('Product', productSchema);

export default Product;