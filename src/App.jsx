import React, { useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import Counter from './components/Counter'
import FilterTodo from './components/FilterTodo'
import { useTodos } from './hooks/useTodos'

function App() {
  // Use custom hook for all todo logic
  const {
    todoList,
    inputText,
    filter,
    editingId,
    editText,
    setText,
    setFilter,
    setTodoList,
    setEditText,
    addTodoText,
    deleteTodoItem,
    toggleComplete,
    getFilteredTodos,
    startEditing,
    saveEdit,
    cancelEdit,
  } = useTodos();

  // localStorage sync
  useEffect(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      setTodoList(JSON.parse(savedTodoList));
    }
  }, []);

  useEffect(() => {
    if (todoList.length > 0) {
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
