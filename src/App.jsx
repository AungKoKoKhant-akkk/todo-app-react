
import React, { use, useEffect, useState } from 'react'

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Counter from './Counter';
import FilterTodo from './FilterTodo';

function App() {
  const [inputText, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodoText = () => {
    if (inputText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    }

    setTodoList([...todoList, newTodo]);
    setText("");
  }

  const deleteTodoItem = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  }

  const toggleComplete = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    setTodoList(updatedTodoList);
  }

  const getFilteredTodos = () => {
    if (filter === "active") {
      return todoList.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todoList.filter((todo) => todo.completed);
    }
    return todoList;
  }

  // Editing State
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  }

  const saveEdit = (id) => {
    if (editText.trim() === "") {
      alert("Todo text cannot be empty.");
      return;
    }
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, text: editText }
        : todo
    );
    setTodoList(updatedTodoList);
    setEditingId(null);
    setEditText("");
  }

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  }

  useEffect(() => {

    const saveTodoList = localStorage.getItem("todoList");
    if (saveTodoList) {
      setTodoList(JSON.parse(saveTodoList));
    }
    setIsFirstRender(false);
  }, [])

  useEffect(() => {

    if (!isFirstRender) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList])



  return (
    <div className='min-h-screen bg-gray-300 py-8 px-4  '>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6" >
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-500'>To-Do App</h1>
      </div>

      {/* Input Section */}
      <TodoInput inputText={inputText} setText={setText} addTodoText={addTodoText} />

      {/* To-Do List Section */}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">


        {/* Filter TodoList */}
        <FilterTodo filter={filter} setFilter={setFilter} />

        {/* Counter */}
        <Counter todoList={todoList} />

        {todoList.length === 0 ? (
          <p className='text-gray-400 text-center'>No tasks added yet.</p>
        ) : (
          <ul className='space-y-2'>
            {getFilteredTodos().map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodoItem={deleteTodoItem}
                isEditing={editingId === todo.id}
                editText={editText}
                onStartEdit={startEditing}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onEditTextChange={setEditText}
              />
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default App
