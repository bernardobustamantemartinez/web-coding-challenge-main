const router = require("express").Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  addSubTodo,
  updateSubTodo,
} = require("../../../services/todo");

router.get("/", (req, res) => {
  console.log("GET /api/todos route hit");
  const todos = getTodos();
  console.log("TODOs retrieved: ", todos);
  res.json(todos);
});

router.post("/", (req, res) => {
  const newTodo = addTodo(req.body);
  res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
  const updatedTodo = updateTodo(parseInt(req.params.id), req.body);
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE request received for todo id: ${req.params.id}`);
  const success = deleteTodo(parseInt(req.params.id));
  if (success) {
    console.log(`Successfully deleted todo with id: ${req.params.id}`);
    res.status(204).send();
  } else {
    console.log(`Failed to delete todo with id: ${req.params.id}`);
    res.status(404).json({ error: "Todo not found" });
  }
});

router.post("/:id/subtodos", (req, res) => {
  const parentId = parseInt(req.params.id);
  const { text } = req.body;
  const updatedTodo = addSubTodo(parentId, text);
  if (updatedTodo) {
    res.status(201).json(updatedTodo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

router.put("/:id/subtodos/:subTodoId", (req, res) => {
  const parentId = parseInt(req.params.id);
  const subTodoId = parseInt(req.params.subTodoId);
  const updatedTodo = updateSubTodo(parentId, subTodoId, req.body);
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ error: "Todo or sub-todo not found" });
  }
});

module.exports = router;
