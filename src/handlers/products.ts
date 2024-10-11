import express, { Request, Response, Router } from "express";
import authMiddleware from "../middleware/auth";
import { ProductStore } from "../models/Product";

const store = new ProductStore();
const productRouter = express.Router();
export const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.send(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const create = async (req: Request, res: Response) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  if (!product.name || !product.price || !product.category) {
    return res.status(400).send({
      msg: "data is invalid ",
    });
  }

  try {
    const newProduct = await store.create(product);
    res.send(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

productRouter.get("/products", index);
productRouter.get("/products/:id", show);
productRouter.post("/products", authMiddleware, create);
export default productRouter;
