import { model, Schema, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IShippingAddress extends Document {
  user: Types.ObjectId | IUser;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const shippingAddressSchema = new Schema<IShippingAddress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

export default model<IShippingAddress>('ShippingAddress', shippingAddressSchema);