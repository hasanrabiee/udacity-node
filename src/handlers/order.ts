import express, { Request, Response } from "express";
import authMiddleware from "../middleware/auth";
import { Order, OrderProduct, OrderStore } from "../models/Order";
import { ProductStore } from "../models/Product";

const store = new OrderStore();
const orderRouter = express.Router();
const productStore = new ProductStore();

const create = async (req: Request, res: Response) => {
  const { product_id, quantity } = req.body;

  const product = await productStore.show(product_id);
  if (!product) {
    return res.status(400).send({
      msg: "product is not found",
    });
  }
  try {
    const newOrder: Order = {
      //@ts-ignore
      user_id: req.user.user.id,
      status: "active",
    };

    const order = await store.create(newOrder);

    const newOrderProduct: OrderProduct = {
      order_id: Number(order.id),
      product_id,
      quantity,
    };
    const orderProduct = await store.createOrderProduct(newOrderProduct);
    res.json({ order, orderProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const ordersByUser = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user.user.id;
  try {
    const orders = await store.ordersByUser(userId);
    return res.send(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
orderRouter.get("/orders/users", authMiddleware, ordersByUser); // Orders by user
orderRouter.post("/orders", authMiddleware, create);

export default orderRouter;
