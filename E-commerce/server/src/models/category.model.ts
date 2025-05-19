import { model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  image: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
});

export default model<ICategory>('Category', categorySchema);