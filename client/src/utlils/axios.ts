import axios from "axios";
import { SERVER_URL } from "./constants";
import getUserToken from "./getUserToken";

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  config.headers.Authorization = "Bearer " + (await getUserToken());
  return config;
});

export const get = async (url: string, params: Object = {}): Promise<any> => {
  return await instance.get(url, { params });
};

export const post = async (url: string, data: Object = {}): Promise<any> => {
  return await instance.post(url, data);
};
