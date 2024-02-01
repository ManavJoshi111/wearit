import { get, post, put, del } from "./axios";

const callApi = (route: string, method: string, data?: any) => {
  switch (method) {
    case "GET": {
      return get(route);
    }
    case "POST": {
      return post(route, data);
    }
    case "PUT": {
      return put(route, data);
    }
    case "DELETE": {
      return del(route);
    }
  }
};

export default callApi;
