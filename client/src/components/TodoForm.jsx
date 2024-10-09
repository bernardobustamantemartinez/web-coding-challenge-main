import { useState } from "react";
import PropTypes from "prop-types";
import "./TodoForm.css";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form which would cause a page refresh
    e.preventDefault();
    // Prevent the form from submitting if the text is empty
    if (!text.trim()) return;
    addTodo(text);
    // Clear input field after submission
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="todo-input"
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
