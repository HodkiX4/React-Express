import { IMessageResponse } from "../models/resp.model";
import { API } from "./axiosInstance";

interface IChangeEmailResponse extends IMessageResponse {
  newEmail: string;
}
export const changePasswordApi = async(currentPassword: string, newPassword: string): Promise<IMessageResponse> => {
  const response = await API.patch<IMessageResponse>('/protected/user/change-password', {
    currentPassword,
    newPassword,
  });
  return response.data;
}

export const changeEmailApi = async(currentEmail: string, newEmail: string): Promise<IChangeEmailResponse> => {
  const response = await API.patch<IChangeEmailResponse>('/protected/user/change-email', {
    currentEmail,
    newEmail,
  });
  return response.data;
}