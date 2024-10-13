"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE id=$1";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot find order ${id}: ${err}`);
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`);
        }
    }
    async createOrderProduct(newOrderProduct) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO product_order (product_id, order_id, quantity) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [
                newOrderProduct.product_id,
                newOrderProduct.order_id,
                newOrderProduct.quantity,
            ]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        }
        catch (err) {
            throw new Error(`Cannot create order product: ${err}`);
        }
    }
    async ordersByUser(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=$1";
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders for user ${userId}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
