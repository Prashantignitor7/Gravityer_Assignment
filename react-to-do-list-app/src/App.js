
import React, { useState, useEffect } from "react";

// AddTodo Component - input and add button
function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed);
      setText("");
    }
  };

  // Also add on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Add new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: "8px", width: "250px" }}
      />
      <button onClick={handleAdd} style={{ marginLeft: 8, padding: "8px 12px" }}>
        Add
      </button>
    </div>
  );
}

// TodoItem Component - single task item
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        listStyle: "none",
        margin: "8px 0",
        cursor: "pointer",
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "gray" : "black",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 400,
      }}
    >
      <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          backgroundColor: "red",
          border: "none",
          color: "white",
          padding: "4px 8px",
          cursor: "pointer",
          borderRadius: 4,
        }}
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  );
}

// TodoList Component - renders the list of tasks
function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p>No tasks here!</p>;
  }
  return (
    <ul style={{ paddingLeft: 0 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

// Filter Component - All / Completed / Pending buttons
function Filter({ currentFilter, onChange }) {
  const filters = ["all", "completed", "pending"];

  return (
    <div style={{ marginBottom: 16 }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            marginRight: 8,
            padding: "6px 12px",
            backgroundColor: currentFilter === f ? "#007BFF" : "#e0e0e0",
            color: currentFilter === f ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

// Main TodoApp Component
export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // simple unique id
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // Toggle complete/incomplete
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Filter todos based on current filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>React To-Do List</h1>
      <AddTodo onAdd={addTodo} />
      <Filter currentFilter={filter} onChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
