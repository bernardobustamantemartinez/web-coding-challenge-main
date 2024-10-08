import PropTypes from "prop-types";
import { useState } from "react";
import "./TodoItem.css";

function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  togglePriority,
  addSubTodo,
  toggleSubTodo,
  deleteSubTodo,
}) {
  const [isAddingSubTodo, setIsAddingSubTodo] = useState(false);
  const [subTodoText, setSubTodoText] = useState("");

  const handleAddSubTodo = (e) => {
    e.preventDefault();
    if (subTodoText.trim()) {
      addSubTodo(todo.id, subTodoText);
      setSubTodoText("");
      setIsAddingSubTodo(false);
    }
  };

  return (
    <li className={`mb-4 ${todo.priority ? "bg-yellow-100 p-3 rounded" : ""}`}>
      <div className="flex items-center">
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
          className="priority-button mr-2"
        >
          {todo.priority ? "Unprioritize" : "Prioritize"}
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="delete-button mr-2"
        >
          Delete
        </button>
        <button
          onClick={() => setIsAddingSubTodo(!isAddingSubTodo)}
          className="add-subtodo-button bg-green-500 text-white px-2 py-1 rounded"
        >
          +
        </button>
      </div>
      {isAddingSubTodo && (
        <form
          onSubmit={handleAddSubTodo}
          className="ml-8 mt-2 flex items-center"
        >
          <input
            type="text"
            value={subTodoText}
            onChange={(e) => setSubTodoText(e.target.value)}
            placeholder="Enter sub-todo"
            className="sub-todo-input"
          />
          <button
            type="submit"
            className="add-sub-button bg-blue-500 text-white px-2 py-1 rounded"
          >
            Add Sub-Todo
          </button>
        </form>
      )}
      {todo.subTodos && todo.subTodos.length > 0 && (
        <ul className="ml-8 mt-2 space-y-2 mr-2">
          {todo.subTodos.map((subTodo) => (
            <li
              key={subTodo.id}
              className="flex items-center  mr-2 mb-1 space-y-2"
            >
              <input
                type="checkbox"
                checked={subTodo.completed}
                onChange={() => toggleSubTodo(todo.id, subTodo.id)}
                className="mr-2"
              />
              <span
                className={
                  subTodo.completed
                    ? "line-through text-gray-500 mr-2"
                    : "flex items-center  mr-2 mb-1 space-y-2"
                }
              >
                {subTodo.text}
              </span>
              <button
                onClick={() => deleteSubTodo(todo.id, subTodo.id)}
                className="delete-button ml-2 py-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.bool.isRequired,
    subTodos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ),
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  togglePriority: PropTypes.func.isRequired,
  addSubTodo: PropTypes.func.isRequired,
  toggleSubTodo: PropTypes.func.isRequired,
  deleteSubTodo: PropTypes.func.isRequired,
};

export default TodoItem;
