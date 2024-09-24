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
  const newTodo = { ...todo, id: Date.now(), completed: false };
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

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
