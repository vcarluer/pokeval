import axios, { AxiosInstance, AxiosError } from 'axios';
import { logError } from './logger';

export const createApiClient = (
  baseURL: string,
  headers: Record<string, string>,
  errorHandler?: (error: AxiosError) => never
): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers,
    timeout: 30000
  });

  client.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      logError(`API Error (${baseURL}):`, {
        status: error.response?.status,
        message: error.response?.data,
        config: error.config
      });

      if (errorHandler) {
        return errorHandler(error);
      }

      throw error;
    }
  );

  return client;
};