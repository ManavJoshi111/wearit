const Koa = require("koa");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const { authRouter } = require("../routers");
const PORT = process.env.PORT;
const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(authRouter.routes()).use(authRouter.allowedMethods());

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
