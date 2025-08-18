import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, UserRegistrationForm } from "@/types";

export async function createAccount(fromData: UserRegistrationForm ) {
  try {
    const url = "/auth/create-account";
    const { data } = await api.post<string>(url, fromData)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function confirmAccount(fromData: ConfirmToken ) {
  try {
    const url = "/auth/confirm-account";
    const { data } = await api.post<string>(url, fromData)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}