import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../database";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM users WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find user ${id}: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await db.connect();
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const sql =
        "INSERT INTO users (firstname,lastname, password) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Cannot create user: ${err}`);
    }
  }

  async authenticate(
    firstname: string,
    password: string
  ): Promise<User | null> {
    const conn = await db.connect();
    const sql = "SELECT * FROM users WHERE firstname=$1";
    const result = await conn.query(sql, [firstname]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        return user;
      }
    }
    return null;
  }
}
