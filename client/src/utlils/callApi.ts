import { get, post } from "./axios";

const callApi = (route: string, method: string, data?: any) => {
  switch (method) {
    case "GET": {
      return get(route);
    }
    case "POST": {
      return post(route, data);
    }
  }
};

export default callApi;
