const fs = require("fs");
const path = require("path");
const { getTodos } = require("../services/todo");

jest.mock("fs");

describe("Todo Service", () => {
  test("getTodos should return all todos from the database file", () => {
    const mockTodos = [
      { id: 1, text: "Test Todo 1", completed: false, priority: false },
      { id: 2, text: "Test Todo 2", completed: true, priority: true },
    ];

    fs.readFileSync.mockReturnValue(JSON.stringify({ todos: mockTodos }));

    const todos = getTodos();
    expect(todos).toEqual(mockTodos);
  });
});
