const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../database.json");

const readDatabase = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const getTodos = () => {
  const db = readDatabase();
  return db.todos;
};

const addTodo = (todo) => {
  const db = readDatabase();
  const newTodo = {
    ...todo,
    id: Date.now(),
    completed: false,
    priority: false,
    subTodos: [],
  };
  db.todos.push(newTodo);
  writeDatabase(db);
  return newTodo;
};

const updateTodo = (id, updatedTodo) => {
  const db = readDatabase();
  const index = db.todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    db.todos[index] = { ...db.todos[index], ...updatedTodo };
    writeDatabase(db);
    return db.todos[index];
  }
  return null;
};

const deleteTodo = (id) => {
  const db = readDatabase();
  const initialLength = db.todos.length;
  db.todos = db.todos.filter((todo) => todo.id !== id);
  if (db.todos.length < initialLength) {
    writeDatabase(db);
    return true;
  }
  return false;
};

const addSubTodo = (parentId, text) => {
  const db = readDatabase();
  const parentIndex = db.todos.findIndex((todo) => todo.id === parentId);
  if (parentIndex === -1) return null;

  const newSubTodo = { id: Date.now(), text, completed: false };
  db.todos[parentIndex].subTodos.push(newSubTodo);

  writeDatabase(db);
  return db.todos[parentIndex];
};

const updateSubTodo = (parentId, subTodoId, updates) => {
  const db = readDatabase();
  const parentIndex = db.todos.findIndex((todo) => todo.id === parentId);
  if (parentIndex === -1) return null;

  const subTodoIndex = db.todos[parentIndex].subTodos.findIndex(
    (subTodo) => subTodo.id === subTodoId
  );
  if (subTodoIndex === -1) return null;

  db.todos[parentIndex].subTodos[subTodoIndex] = {
    ...db.todos[parentIndex].subTodos[subTodoIndex],
    ...updates,
  };

  // Check if all sub-TODOs are completed
  const allSubTodosCompleted = db.todos[parentIndex].subTodos.every(
    (subTodo) => subTodo.completed
  );
  db.todos[parentIndex].completed = allSubTodosCompleted;

  writeDatabase(db);
  return db.todos[parentIndex];
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  addSubTodo,
  updateSubTodo,
};
