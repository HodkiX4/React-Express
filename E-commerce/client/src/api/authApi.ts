import { IMessageResponse } from "../models/resp.model";
import { API } from "./axiosInstance";

interface ILoginResponse extends IMessageResponse {
  token: string;
  user: { 
    email: string;
    password: string;
  };
}

export const signupApi = async (email: string, password: string): Promise<IMessageResponse> => {
  const response = await API.post<IMessageResponse>("/auth/register", {
    email,
    password
  });
  return response.data;
};

export const loginApi = async (email: string, password: string): Promise<ILoginResponse> => {
  const response = await API.post<ILoginResponse>("/auth/login", {
    email,
    password
  });
  return response.data;
};

