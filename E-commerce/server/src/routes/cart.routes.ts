import { Router } from 'express';
import { addToCart, clearCart, getCart, removeFromCart, updateCart } from '../controllers/cart.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';

const router = Router();

router.post('/add', asyncHandler(addToCart));

router.route('/').get(asyncHandler(getCart)).delete(asyncHandler(clearCart));

router.delete('/:productId', asyncHandler(removeFromCart));

router.put('/update', asyncHandler(updateCart));

export default router;