import { Router } from "express";
import authenticate from "../middlewares/auth.middleware";
import { changeEmail, changePassword } from "../controllers/user.controller";
import asyncHandler from "../middlewares/asyncHandler.middleware";

const router = Router();

router.patch('/change-password', authenticate, asyncHandler(changePassword));
router.patch('/change-email', authenticate, (asyncHandler(changeEmail)));

export default router;