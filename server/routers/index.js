import { authRouter } from "./auth.router.js";
import { productRouter } from "./product.router.js";

const routes = [authRouter, productRouter];

export default (app) => {
  routes.forEach((route) => {
    app.use(route.routes());
    app.use(route.allowedMethods());
  });
};
