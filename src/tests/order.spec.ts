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
describe("orders endpoint tests", () => {
  it("should return orders by specific user", async () => {
    const response = await request
      .get("/orders/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should return 401 if you want to send request without valid token for getting orders data by user", async () => {
    const response = await request.get("/orders/users");
    expect(response.status).toBe(401);
  });
});
