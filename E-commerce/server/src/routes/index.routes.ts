import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import protectedRoutes from './protected.routes';
import authenticate from '../middlewares/auth.middleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/protected', authenticate, protectedRoutes);

export default router;