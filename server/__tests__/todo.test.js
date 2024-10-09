const fs = require("fs");
const path = require("path");
const { getTodos, addTodo } = require("../services/todo");

jest.mock("fs");

describe("Todo Service", () => {
  // Test case: Verify that getTodos function correctly retrieves todos from the database file
  test("getTodos should return all todos from the database file", () => {
    // mockTodos: Sample todos to be returned by the mocked file system
    const mockTodos = [
      { id: 1, text: "Test Todo 1", completed: false, priority: false },
      { id: 2, text: "Test Todo 2", completed: true, priority: true },
    ];

    // Mock the file system: Make readFileSync return our mock data
    fs.readFileSync.mockReturnValue(JSON.stringify({ todos: mockTodos }));

    // Call the function we're testing
    const todos = getTodos();

    // Log the results for debugging (if needed)
    console.log("todos:  ", todos);
    console.log("mockTodos:  ", mockTodos);

    // Assert that the function returns the expected mock data
    expect(todos).toEqual(mockTodos);
  });

  test("addTodo should add a new todo to the database", () => {
    // Mock initial database state
    const initialTodos = [
      {
        id: 1,
        text: "Existing Todo",
        completed: false,
        priority: false,
        subTodos: [],
      },
    ];
    fs.readFileSync.mockReturnValue(JSON.stringify({ todos: initialTodos }));

    // Mock data for new todo
    const newTodoData = { text: "New Todo" };

    // Call the function
    const result = addTodo(newTodoData);

    // Log the results for debugging
    console.log("Initial todos: ", initialTodos);
    console.log("New todo data: ", newTodoData);
    console.log("Result of addTodo: ", result);

    // Assertions
    expect(result).toMatchObject({
      text: "New Todo",
      completed: false,
      priority: false,
      subTodos: [],
    });
    expect(result.id).toBeDefined();

    // Check if writeFileSync was called
    expect(fs.writeFileSync).toHaveBeenCalled();

    // Get the arguments of the last call to writeFileSync
    const [filePath, fileContent] = fs.writeFileSync.mock.calls[0];

    // Log the writeFileSync arguments
    console.log("File path: ", filePath);
    console.log("File content: ", fileContent);

    // Check the file path
    expect(filePath).toContain("database.json");

    // Parse the file content
    const writtenData = JSON.parse(fileContent);

    // Log the parsed written data
    console.log("Parsed written data: ", writtenData);

    // Check the structure of the written data
    expect(writtenData).toHaveProperty("todos");
    expect(writtenData.todos).toHaveLength(2);
    expect(writtenData.todos[1]).toEqual(result);

    // Check if the new todo is in the written data
    const newTodo = writtenData.todos.find((todo) => todo.text === "New Todo");
    expect(newTodo).toBeDefined();
    expect(newTodo).toMatchObject({
      text: "New Todo",
      completed: false,
      priority: false,
      subTodos: [],
    });

    // Log the final state of todos
    console.log("Final todos: ", writtenData.todos);
  });
});
