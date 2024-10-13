import supertest from "supertest";
import { app } from "../server";
import jwt from "jsonwebtoken";
const request = supertest(app);
const user = {
  id: 1,
  firstname: "hassan",
  lastname: "rabiei",
};

const token = jwt.sign({ user }, process.env.TOKEN_SECRET || "mysecretkey");
describe("products endpoint tests", () => {
  it("should add product", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "test",
        price: 10,
        category: "test",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should get product list", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
});
