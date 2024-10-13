"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const store = new User_1.UserStore();
const userRouter = express_1.default.Router();
const index = async (req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
const create = async (req, res) => {
    const { firstname, lastname, password } = req.body;
    try {
        const newUser = {
            firstname,
            lastname,
            password,
        };
        const user = await store.create(newUser);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        res.json({ user, token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
const authenticate = async (req, res) => {
    const { firstname, password } = req.body;
    try {
        const user = await store.authenticate(firstname, password);
        if (user) {
            const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
            res.json({ user, token });
        }
        else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
userRouter.get("/users", auth_1.default, index);
userRouter.get("/users/:id", auth_1.default, show);
userRouter.post("/users", create);
userRouter.post("/users/authenticate", authenticate);
exports.default = userRouter;
