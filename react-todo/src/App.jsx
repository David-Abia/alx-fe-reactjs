import React from "react";
import TodoList from "./components/TodoList.jsx";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}
