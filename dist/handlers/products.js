"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.index = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const Product_1 = require("../models/Product");
const store = new Product_1.ProductStore();
const productRouter = express_1.default.Router();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.send(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.send(product);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const create = async (req, res) => {
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
    }
    catch (err) {
        res.status(400).json(err);
    }
};
exports.create = create;
productRouter.get("/products", exports.index);
productRouter.get("/products/:id", show);
productRouter.post("/products", auth_1.default, exports.create);
exports.default = productRouter;
