import axios from "axios";
import { SERVER_URL } from "./constants";

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const get = async (url: string, params: Object = {}): Promise<any> => {
  return await instance.get(url, { params });
};

export const post = async (url: string, data: Object = {}): Promise<any> => {
  return await instance.post(url, data);
};
