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
        className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        {todo.priority ? "Unprioritize" : "Prioritize"}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
