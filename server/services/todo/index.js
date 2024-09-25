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
  console.log(`Attempting to delete todo with id: ${id}`);
  const db = readDatabase();
  if (!Array.isArray(db.todos)) {
    console.log("db.todos is not an array");
    return false;
  }
  const initialLength = db.todos.length;
  console.log(`Initial todos length: ${initialLength}`);
  db.todos = db.todos.filter((todo) => todo.id !== parseInt(id));
  console.log(`New todos length: ${db.todos.length}`);
  if (db.todos.length < initialLength) {
    writeDatabase(db);
    console.log("Todo deleted successfully");
    return true;
  }
  console.log("Todo not found");
  return false;
};

const addSubTodo = (parentId, text) => {
  const todos = getTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === parentId);
  if (todoIndex === -1) return null;

  const newSubTodo = { text, completed: false };
  if (!todos[todoIndex].subTodos) {
    todos[todoIndex].subTodos = [newSubTodo];
  } else {
    todos[todoIndex].subTodos.push(newSubTodo);
  }

  writeDatabase({ todos }); // Changed saveTodos to writeDatabase
  return todos[todoIndex];
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  addSubTodo, // Add this line to export the addSubTodo function
};
