import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (text) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todoToToggle.completed }),
    });
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id) => {
    console.log(`Attempting to delete todo with id: ${id}`);
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Successfully deleted todo with id: ${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      console.error(`Failed to delete todo with id: ${id}`);
    }
  };

  const togglePriority = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priority: !todoToToggle.priority }),
    });
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const addSubTodo = async (parentId, text) => {
    const response = await fetch(`/api/todos/${parentId}/subtodos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const updatedParentTodo = await response.json();
    setTodos(
      todos.map((todo) => (todo.id === parentId ? updatedParentTodo : todo))
    );
  };

  const toggleSubTodo = async (parentId, subTodoId) => {
    const parentTodo = todos.find((todo) => todo.id === parentId);
    if (!parentTodo || !parentTodo.subTodos) {
      console.error("Parent todo or sub-todos not found");
      return;
    }

    const subTodo = parentTodo.subTodos.find((st) => st.id === subTodoId);
    if (!subTodo) {
      console.error("Sub-todo not found");
      return;
    }

    try {
      const response = await fetch(
        `/api/todos/${parentId}/subtodos/${subTodoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !subTodo.completed }),
        }
      );

      if (response.ok) {
        const updatedParentTodo = await response.json();
        setTodos(
          todos.map((todo) => (todo.id === parentId ? updatedParentTodo : todo))
        );
      } else {
        console.error("Failed to update sub-todo:", await response.text());
      }
    } catch (error) {
      console.error("Error updating sub-todo:", error);
    }
  };

  const deleteSubTodo = async (parentId, subTodoId) => {
    try {
      const response = await fetch(
        `/api/todos/${parentId}/subtodos/${subTodoId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedParentTodo = await response.json();
        setTodos(
          todos.map((todo) => (todo.id === parentId ? updatedParentTodo : todo))
        );
      } else {
        console.error("Failed to delete sub-todo:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting sub-todo:", error);
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.priority === b.priority) return 0;
    return a.priority ? -1 : 1;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={sortedTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        togglePriority={togglePriority}
        addSubTodo={addSubTodo}
        toggleSubTodo={toggleSubTodo}
        deleteSubTodo={deleteSubTodo}
      />
    </div>
  );
}

export default App;
