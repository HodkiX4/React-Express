import { Request, Response } from "express";
import Product from "../models/product.model";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/app.errors";
import Cart from "../models/cart.model";
import { Types } from "mongoose";
import { CustomRequest } from "../types/costum";

export const addToCart = async (req: CustomRequest<{}, {}, { productId: string; quantity: number }>, res: Response): Promise<void> => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  if (quantity <= 0) {
    throw new BadRequestError("Quantity must be a positive number");
  }
  
  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      products: [{ product: new Types.ObjectId(productId), quantity }],
    });
  } else {
    const existingProductIndex = cart.products.findIndex((item) => item.product.toString() === productId);

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: new Types.ObjectId(productId), quantity });
    }
  }

  await cart.save();
  res.status(200).json({ message: "Product added to cart", cart });
};

export const getCart = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  let cart = await Cart.findOne({ user: userId }).populate("products.product");
  if (!cart) {
      cart = new Cart({
      user: userId,
      products: [],
    });
  }

  res.status(200).json(cart);
};

export const removeFromCart = async (req: CustomRequest<{ productId: string }>, res: Response): Promise<void> => {
  const { productId } = req.params;
  const userId = req.userId;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new NotFoundError("Cart not found");
  }

  const productIndex = cart.products.findIndex((item) => item.product.toString() === productId);

  if (productIndex === -1) {
    throw new NotFoundError("Product not found in cart");
  }

  cart.products.splice(productIndex, 1);

  await cart.save();
  
  if (cart.products.length === 0) {
    await cart.save();
    res.status(200).json({ message: "Cart is empty now" });
  } else {
    res.status(200).json({ message: "Product removed from cart", cart });
  }

};

export const updateCart = async (req: CustomRequest<{}, {}, { productId: string; quantity: number }>, res: Response): Promise<void> => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  if (quantity <= 0) {
    throw new BadRequestError("Quantity must be a positive number");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new NotFoundError("Cart not found");
  }

  const productIndex = cart.products.findIndex((item) => item.product.toString() === productId);

  if (productIndex === -1) {
    throw new NotFoundError("Product not found in cart");
  }

  // Update the quantity
  cart.products[productIndex].quantity = quantity;
  await cart.save();

  res.status(200).json({ message: "Cart updated", cart });
};

export const clearCart = async (req: CustomRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    throw new UnauthorizedError("User not authenticated");
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new NotFoundError("Cart not found");
  }

  // Clear all products from the cart
  cart.products = [];

  await cart.save();

  res.status(200).json({ message: "Cart has been cleared", cart });
};