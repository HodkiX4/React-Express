import { Router } from "express";
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/user', userRoutes);

export default router;
