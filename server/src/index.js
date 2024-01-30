import Koa from "koa";
import cors from "@koa/cors";
import { koaBody } from "koa-body";
import { PORT } from "../utils/constants.js";
import { connectToDB } from "../DB/db.js";
import routes from "../routers/index.js";

connectToDB();
const app = new Koa();
app.use(koaBody({}));
app.use(cors());
routes(app);

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
