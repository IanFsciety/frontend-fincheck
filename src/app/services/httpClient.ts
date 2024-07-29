import axios from 'axios';
import { localStorageKeys } from '../config/localStorageKeys';

const url = import.meta.env.VITE_API_URL
export const httpClient = axios.create({
  baseURL: url,
});

httpClient.interceptors.request.use(async config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})
