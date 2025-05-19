import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { InvalidCredentialsError, UserAlreadyExistsError, ValidationError } from '../errors/app.errors';


const JWT_SECRET = process.env.JWT_SECRET as string;

interface IRegisterResponse {
  message: string;
}


interface ILoginResponse {
  message: string;
  token: string;
  user: { email: string, password: string };
}

export const register = async (req: Request<{}, {}, IUser>, res: Response<IRegisterResponse>): Promise<void> => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new UserAlreadyExistsError();  
  }

  const newUser = new User({ email, password });
  await newUser.save(); // The password will be hashed automatically via the pre-save hook

  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request<{}, {}, IUser>, res: Response<ILoginResponse>): Promise<void> => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new ValidationError('Email and password are required')
  }
  
  const user = await User.findOne({ email });

  if (!user) {
    throw new InvalidCredentialsError();
  }
  
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ message: 'Login successful', token, user: { email: user.email, password: user.password } });
  
};


