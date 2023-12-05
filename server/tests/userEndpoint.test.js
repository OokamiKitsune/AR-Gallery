import supertest from "supertest";
import app from "../server"; // Replace with the correct path to your Express app

const request = supertest(app);

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const newUser = {
      email: "test@example.com",
      password: "testPassword123",
    };

    // Send a POST request to your endpoint
    const response = await request.post("/api/users").send(newUser);

    // Assertions for response
    expect(response.status).toBe(201); // Check if status code is 201 (Created)
    expect(response.body).toHaveProperty(
      "message",
      "New user created successfully"
    );
    expect(response.body).toHaveProperty("user");
    // You might want to further test the structure/content of the user object returned
  });
});
