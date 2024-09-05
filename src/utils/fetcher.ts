import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types"; 

interface FetcherOptions {
  method?: Method;
  data?: any;
  config?: AxiosRequestConfig;
  token?: string;
}

export const fetcher = async <T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> => {
  const { method = "GET", data, config, token } = options;

    const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    ...config?.headers,
  };

  try {
    const response = await axios({
      url,
      method,
      data,
      ...config,
      headers,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error(axiosError);

    const errorMessage = axiosError.response?.data.details || axiosError.response?.data.error || "An error occurred";
    toast.error(errorMessage);

    throw axiosError;
  }
};
