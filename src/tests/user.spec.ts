import supertest from "supertest";
import { app } from "../server";
import jwt from "jsonwebtoken";
const request = supertest(app);
const user = {
  id: 1,
  firstname: "hasan",
  lastname: "rabiei",
};

const token = jwt.sign({ user }, process.env.TOKEN_SECRET || "mysecretkey");
describe("users endpoint tests", () => {
  it("should create new user and return a token", async () => {
    const response = await request.post("/users").send({
      firstname: "hasan",
      lastname: "rabiei",
      password: "1234@qwe",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return 401 if you want to send request without valid token for getting user data by id", async () => {
    const response = await request.get("/users/1");
    expect(response.status).toBe(401);
  });

  it("should authenticate the user after login ", async () => {
    const response = await request.post("/users/authenticate").send({
      firstname: "hasan",
      password: "1234@qwe",
    });
    expect(response.status).toBe(200);
  });

  it("should give the user information by user id ", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe(user.firstname);
  });
});
