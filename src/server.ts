import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRouter from "./handlers/products";
import userRouter from "./handlers/user";
import orderRouter from "./handlers/order";

export const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);

app.listen(3000, function () {
  console.log(`starting app on now : ${address}`);
});
