import { useState } from 'react';

/**
 * Custom hook to manage all todo operations
 * Returns: todoList, functions to manipulate todos
 */
export const useTodos = (initialTodos = []) => {
  const [todoList, setTodoList] = useState(initialTodos);
  const [inputText, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add a new todo
  const addTodoText = () => {
    if (inputText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTodoList([...todoList, newTodo]);
    setText("");
  };

  // Delete a todo
  const deleteTodoItem = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Get filtered todos based on current filter
  const getFilteredTodos = () => {
    if (filter === "active") {
      return todoList.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todoList.filter((todo) => todo.completed);
    }
    return todoList;
  };

  // Start editing a todo
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  // Save edited todo
  const saveEdit = (id) => {
    if (editText.trim() === "") {
      alert("Todo text cannot be empty.");
      return;
    }
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return {
    // States
    todoList,
    inputText,
    filter,
    editingId,
    editText,
    
    // Setters
    setText,
    setFilter,
    setTodoList,
    setEditText,
    
    // Functions
    addTodoText,
    deleteTodoItem,
    toggleComplete,
    getFilteredTodos,
    startEditing,
    saveEdit,
    cancelEdit,
  };
};
