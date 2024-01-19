const Koa = require("koa");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const { connectToDB } = require("../DB/db");

connectToDB();
const PORT = process.env.PORT;
const app = new Koa();
app.use(koaBody());
app.use(cors());
const { authRouter } = require("../routers");
app.use(authRouter.routes()).use(authRouter.allowedMethods());

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
