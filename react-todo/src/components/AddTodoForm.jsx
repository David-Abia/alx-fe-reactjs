import React, { useState } from "react";

export default function AddTodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        value={text}
        placeholder="Add new todo"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" style={{ marginLeft: 10 }}>Add</button>
    </form>
  );
}
