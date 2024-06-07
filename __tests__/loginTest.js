import supertest from "supertest";
import mongoose from "mongoose";
import { app } from "../app";
import "dotenv/config";

describe("loginTest", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_TEST_URI);
  });
  afterAll(async () => {
    mongoose.disconnect(process.env.DB_TEST_URI);
  });
  test("should return user data", async () => {
    // Реєстрація користувача
    await supertest(app).post("/api/users/register").send({
      email: "testUser1@gmail.com",
      password: "123456789Qq",
    });

    // Логін користувача
    const response = await supertest(app).post("/api/users/login").send({
      email: "testUser1@gmail.com",
      password: "123456789Qq",
    });

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(
      typeof response.body.token === "string" && response.body.token.length > 0
    ).toBe(true);
    expect(
      typeof response.body.user.email === "string" &&
        response.body.user.email.length > 0 &&
        response.body.user.subscription.length > 0 &&
        typeof response.body.user.subscription === "string"
    ).toBe(true);
  });
});
