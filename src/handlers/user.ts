import express, { Request, Response } from "express";
import { User, UserStore } from "../models/User";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth";

const store = new UserStore();
const userRouter = express.Router();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const { firstname, lastname, password } = req.body;

  try {
    const newUser: User = {
      firstname,
      lastname,
      password,
    };

    const user = await store.create(newUser);

    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { firstname, password } = req.body;

  try {
    const user = await store.authenticate(firstname, password);

    if (user) {
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
      res.json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

userRouter.get("/users", authMiddleware, index);
userRouter.get("/users/:id", authMiddleware, show);
userRouter.post("/users", authMiddleware, create);
userRouter.post("/users/authenticate", authenticate);

export default userRouter;
