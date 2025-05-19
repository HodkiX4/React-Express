import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import { register, login } from '../controllers/auth.controller';
// Create a router instance
const router = Router();

// Define routes
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

// Export router as the default export
export default router;