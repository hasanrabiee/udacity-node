import db from "../database";

export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export type OrderProduct = {
  product_id: number;
  order_id: number;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find order ${id}: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`);
    }
  }

  async createOrderProduct(newOrderProduct: OrderProduct): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO product_order (product_id, order_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        newOrderProduct.product_id,
        newOrderProduct.order_id,
        newOrderProduct.quantity,
      ]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(`Cannot create order product: ${err}`);
    }
  }

  async ordersByUser(userId: string): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM orders WHERE user_id=$1";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders for user ${userId}: ${err}`);
    }
  }
}
