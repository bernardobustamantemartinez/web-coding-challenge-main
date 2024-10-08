import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  togglePriority,
  addSubTodo,
  toggleSubTodo,
  deleteSubTodo,
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          togglePriority={togglePriority}
          addSubTodo={addSubTodo}
          toggleSubTodo={toggleSubTodo}
          deleteSubTodo={deleteSubTodo}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  togglePriority: PropTypes.func.isRequired,
  addSubTodo: PropTypes.func.isRequired,
  toggleSubTodo: PropTypes.func.isRequired,
  deleteSubTodo: PropTypes.func.isRequired,
};

export default TodoList;
