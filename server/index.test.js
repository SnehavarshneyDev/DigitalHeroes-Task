import request from "supertest";
import app from "./index.js";

describe("Page Pulse API", () => {

  test("Should return error when URL is missing", async () => {

    const res = await request(app)
      .post("/analyze")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("URL is required");

  });

  test("Should handle invalid URL", async () => {

    const res = await request(app)
      .post("/analyze")
      .send({
        url: "invalid-url"
      });

    expect(res.statusCode).toBe(500);

  });

  test("Should analyze a valid website", async () => {

    const res = await request(app)
      .post("/analyze")
      .send({
        url: "https://developer.mozilla.org"
      });

    expect([200,400]).toContain(res.statusCode);

  });

});