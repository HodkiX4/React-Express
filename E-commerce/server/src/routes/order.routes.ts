import { Router } from 'express';
import { placeOrder, getOrders, getOrderById } from '../controllers/order.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';


const router = Router();

router.route('/').post(asyncHandler(placeOrder)).get(asyncHandler(getOrders));
router.get('/:orderId', asyncHandler(getOrderById));

export default router;