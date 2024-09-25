const router = require("express").Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  addSubTodo,
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
  const success = deleteTodo(parseInt(req.params.id));
  if (success) {
    res.status(204).send();
  } else {
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

module.exports = router;
