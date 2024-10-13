"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const user_1 = __importDefault(require("./handlers/user"));
const order_1 = __importDefault(require("./handlers/order"));
exports.app = (0, express_1.default)();
const address = "0.0.0.0:3000";
exports.app.use(body_parser_1.default.json());
exports.app.get("/", function (req, res) {
    res.send("Hello World!");
});
exports.app.use(products_1.default);
exports.app.use(user_1.default);
exports.app.use(order_1.default);
exports.app.listen(3000, function () {
    console.log(`starting app on now : ${address}`);
});
