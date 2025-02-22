import request from "supertest";
import { Express } from "express";
import { AppDataSource } from "../data-source";
import { ToDoList } from "@entities/to-do-list.entity";
import app from "../index";

describe("ToDoList API", () => {
  let testApp: Express;
  let testToDoList: ToDoList;

  beforeAll(async () => {
    testApp = app;
  });

  beforeEach(async () => {
    // Clear the database before each test
    await AppDataSource.getRepository(ToDoList).clear();

    // Create a test todo
    const repository = AppDataSource.getRepository(ToDoList);
    testToDoList = await repository.save({
      name: "Test Todo",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
    });
  });

  describe("GET /api/todos", () => {
    it("should return all todos", async () => {
      const response = await request(testApp).get("/api/todos").expect(200);

      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].name).toBe("Test Todo");
    });
  });

  describe("GET /api/todos/:id", () => {
    it("should return a specific todo", async () => {
      const response = await request(testApp)
        .get(`/api/todos/${testToDoList.id}`)
        .expect(200);

      expect(response.body.data.name).toBe("Test Todo");
    });

    it("should return 404 for non-existent todo", async () => {
      await request(testApp).get("/api/todos/99999").expect(404);
    });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const newTodo = {
        name: "New Todo",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
      };

      const response = await request(testApp)
        .post("/api/todos")
        .send(newTodo)
        .expect(201);

      expect(response.body.data.name).toBe("New Todo");
    });

    it("should reject end date before start date", async () => {
      const invalidTodo = {
        name: "Invalid Todo",
        startDate: "2025-02-28",
        endDate: "2025-02-01", // End date before start date
      };

      await request(testApp).post("/api/todos").send(invalidTodo).expect(400);
    });

    it("should reject there is an end date but not start date present", async () => {
      const invalidTodo = {
        name: "Invalid Todo",
        endDate: "2025-02-01",
      };

      await request(testApp).post("/api/todos").send(invalidTodo).expect(400);
    });

    it("should reject because name exceed 80 charactors", async () => {
      const invalidTodo = {
        name: "This is a very long todo name that definitely exceeds eighty characters and should cause a validation error",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
      };

      await request(testApp).post("/api/todos").send(invalidTodo).expect(400);
    });

    it("should reject because name not present", async () => {
      const invalidTodo = {
        startDate: "2025-02-01",
        endDate: "2025-02-28",
      };

      await request(testApp).post("/api/todos").send(invalidTodo).expect(400);
    });
  });

  describe("PATCH /api/todos/:id", () => {
    it("should update an existing todo", async () => {
      const updateData = {
        name: "Updated Todo",
        startDate: "2025-03-01",
        endDate: "2025-03-31",
      };

      const response = await request(testApp)
        .patch(`/api/todos/${testToDoList.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.data.name).toBe("Updated Todo");
    });

    it("should return 404 for updating non-existent todo", async () => {
      await request(testApp)
        .put("/api/todos/99999")
        .send({ name: "Updated Todo" })
        .expect(404);
    });

    it("should reject end date before start date", async () => {
      const invalidTodo = {
        name: "Invalid Todo",
        startDate: "2025-02-28",
        endDate: "2025-02-01", // End date before start date
      };

      await request(testApp).patch(`/api/todos/${testToDoList.id}`).send(invalidTodo).expect(400);
    });

    it("should reject there is an end date but not start date present", async () => {
      const invalidTodo = {
        name: "Invalid Todo",
        endDate: "2025-02-01",
      };

      await request(testApp).patch(`/api/todos/${testToDoList.id}`).send(invalidTodo).expect(400);
    });

    it("should reject because name exceed 80 charactors", async () => {
      const invalidTodo = {
        name: "This is a very long todo name that definitely exceeds eighty characters and should cause a validation error",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
      };

      await request(testApp).patch(`/api/todos/${testToDoList.id}`).send(invalidTodo).expect(400);
    });

    it("should reject because name not present", async () => {
      const invalidTodo = {
        startDate: "2025-02-01",
        endDate: "2025-02-28",
      };

      await request(testApp).patch(`/api/todos/${testToDoList.id}`).send(invalidTodo).expect(400);
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should delete an existing todo", async () => {
      await request(testApp)
        .delete(`/api/todos/${testToDoList.id}`)
        .expect(204);

      // Verify deletion
      await request(testApp).get(`/api/todos/${testToDoList.id}`).expect(404);
    });

  });
});
