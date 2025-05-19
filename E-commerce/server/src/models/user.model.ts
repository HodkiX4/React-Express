import argon2 from "argon2";
import mongoose, { Schema, Document, model, Types} from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  hashPassword(): Promise<void>,
  comparePassword(password: string): Promise<boolean>
}

const userSchema: Schema = new Schema<IUser>({
  email: { 
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
  },
  password: { 
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    match: [
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one number, and one special character",
    ],
  }
});

// Create a method to compare the password during login
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return argon2.verify(this.password, password);
};

// Pre-save hook to hash the password before saving the user
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

const User = model<IUser>('User', userSchema);

export default User;