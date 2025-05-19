import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";
import { NotFoundError, ValidationError } from "../errors/app.errors";

interface IGetAllProductsResponse {
  products: IProduct[];
}

interface IGetProductResponse {
  product: IProduct;
}

interface ICreateProductResponse {
  message: string;
  product: IProduct;
}

export const getAllProducts = async (req: Request, res: Response<IGetAllProductsResponse>): Promise<void> => {
  const products = await Product.find();
  res.status(200).json({ products });
};

export const getProductById = async (req: Request<{ id: string }>, res: Response<IGetProductResponse>): Promise<void> => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundError('Product not found');
  }
  res.status(200).json({ product });
};

export const createProduct = async (req: Request<{}, {}, IProduct>, res: Response<ICreateProductResponse>): Promise<void> => {
  const { name, price, description, imageUrl } = req.body;

  if(!name || !price) {
    throw new ValidationError("Name and price are required");
  }
  
  const newProduct = new Product({
    name,
    price,
    description,
    imageUrl,
  });

  const savedProduct = await newProduct.save();
  res.status(201).json({ message: "Product created successfully", product: savedProduct });
  
};