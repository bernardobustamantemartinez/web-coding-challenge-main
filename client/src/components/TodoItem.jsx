import "./TodoItem.css";

function TodoItem({ todo, toggleTodo, deleteTodo, togglePriority }) {
  return (
    <li
      className={`flex items-center mb-2 ${
        todo.priority ? "bg-yellow-100 p-1 rounded" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="mr-2"
      />
      <span
        className={`flex-grow ${
          todo.completed ? "line-through text-gray-500" : ""
        } ${todo.priority ? "text-black font-semibold" : ""}`}
      >
        {todo.priority && <span className="mr-1">🔥</span>}
        {todo.text}
      </span>
      <button
        onClick={() => togglePriority(todo.id)}
        className="priority-button"
      >
        {todo.priority ? "Unprioritize" : "Prioritize"}
      </button>
      <button onClick={() => deleteTodo(todo.id)} className="delete-button">
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
