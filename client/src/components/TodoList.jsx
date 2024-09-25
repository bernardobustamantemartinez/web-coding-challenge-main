import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, togglePriority }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          togglePriority={togglePriority}
        />
      ))}
    </ul>
  );
}

export default TodoList;
