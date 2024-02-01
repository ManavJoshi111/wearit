import axios from "axios";
import { SERVER_URL } from "./constants";
import getUserToken from "./getUserToken";

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + getUserToken();
  return config;
});

export const get = async (url: string, params: object = {}): Promise<any> => {
  return await instance.get(url, { params });
};

export const post = async (url: string, data: object = {}): Promise<any> => {
  return await instance.post(url, data);
};

export const put = async (url: string, data: object = {}): Promise<any> => {
  return await instance.put(url, data);
};

export const del = async (url: string): Promise<any> => {
  return await instance.delete(url);
};
