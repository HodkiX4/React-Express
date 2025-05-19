import { Response } from "express";
import { CustomRequest } from "../types/costum";
import { InvalidCredentialsError, NotFoundError, ValidationError } from "../errors/app.errors";
import User from "../models/user.model";

export const changePassword = async (
  req: CustomRequest<{}, {}, { currentPassword: string; newPassword: string }>,
  res: Response<{ message: string }>
): Promise<void> => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ValidationError('Current and new password are required');
  }

  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new InvalidCredentialsError("Current password does not match");
  }

  user.password = newPassword;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({ message: 'Password updated successfully' });
};

export const changeEmail = async (
  req: CustomRequest<{}, {}, { currentEmail: string; newEmail: string }>,
  res: Response<{ message: string; newEmail: string }>
): Promise<void> => {
  console.log("Macska");
  
  const { currentEmail, newEmail } = req.body;

  if (!currentEmail || !newEmail) {
    throw new ValidationError('Both current and new email are required');
  }

  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.email !== currentEmail) {
    throw new InvalidCredentialsError('Current email does not match');
  }

  const existingUser = await User.findOne({ email: newEmail });
  if (existingUser) {
    throw new ValidationError('This email is already taken');
  }

  user.email = newEmail;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({ message: 'Email updated successfully', newEmail });
};