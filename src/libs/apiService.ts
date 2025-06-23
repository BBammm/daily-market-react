// libs/apiService.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const request = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
      ...config,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      axiosError?.response?.data
        ? JSON.stringify(axiosError.response.data)
        : axiosError.message
    );
  }
};

export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("get", url, undefined, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("post", url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>("put", url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>("delete", url, undefined, config),
};