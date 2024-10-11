import db from "../database";

export type Order = {
  id?: number;
  user_id: string;
  status: string;
  quantity: number;
  product_id: number;
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
        "INSERT INTO orders (user_id, status, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [
        o.user_id,
        o.status,
        o.product_id,
        o.quantity,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`);
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
