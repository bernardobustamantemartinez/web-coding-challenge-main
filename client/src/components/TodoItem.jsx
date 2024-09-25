import "./TodoItem.css";

function TodoItem({ todo, toggleTodo, deleteTodo, togglePriority }) {
  return (
    <li className={`todo-item ${todo.priority ? "priority" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      <span
        className="todo-text"
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => togglePriority(todo.id)}
        className="priority-button"
      >
        {todo.priority ? "⭐" : "☆"}
      </button>
      <button onClick={() => deleteTodo(todo.id)} className="delete-button">
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
