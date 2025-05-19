// src/routes/productRoutes.ts
import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import { getAllProducts, getProductById, createProduct } from '../controllers/product.controller';

const router = Router();

// Routes for products
router.route('/').get(asyncHandler(getAllProducts)).post(() => console.log("Macska"));
router.get('/:id', asyncHandler(getProductById));

export default router;