import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + localStorage.getItem("token"),
  },
});

export const get = async (url: string, params: Object = {}): Promise<any> => {
  return await instance.get(url, { params });
};

export const post = async (url: string, data: Object = {}): Promise<any> => {
  return await instance.post(url, data);
};
