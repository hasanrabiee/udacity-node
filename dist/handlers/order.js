"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const Order_1 = require("../models/Order");
const Product_1 = require("../models/Product");
const store = new Order_1.OrderStore();
const orderRouter = express_1.default.Router();
const productStore = new Product_1.ProductStore();
const create = async (req, res) => {
    const { product_id, quantity } = req.body;
    const product = await productStore.show(product_id);
    if (!product) {
        return res.status(400).send({
            msg: "product is not found",
        });
    }
    try {
        const newOrder = {
            //@ts-ignore
            user_id: req.user.user.id,
            status: "active",
        };
        const order = await store.create(newOrder);
        const newOrderProduct = {
            order_id: Number(order.id),
            product_id,
            quantity,
        };
        const orderProduct = await store.createOrderProduct(newOrderProduct);
        res.json({ order, orderProduct });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
const ordersByUser = async (req, res) => {
    //@ts-ignore
    const userId = req.user.user.id;
    try {
        const orders = await store.ordersByUser(userId);
        return res.send(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
orderRouter.get("/orders/users", auth_1.default, ordersByUser); // Orders by user
orderRouter.post("/orders", auth_1.default, create);
exports.default = orderRouter;
