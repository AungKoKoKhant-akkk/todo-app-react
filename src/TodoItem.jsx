import React from 'react'
import { FaTrash,FaEdit } from "react-icons/fa"

function TodoItem({ 
  todo, 
  toggleComplete, 
  deleteTodoItem, 
  isEditing, 
  editText, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit,
  onEditTextChange 
}) {
  
  // If editing this todo, show input
  if (isEditing) {
    return (
      <li className="flex items-center gap-3 p-3 my-2 bg-blue-50 rounded border-2 border-blue-300">
        <input
          type="text"
          value={editText}
          onChange={(e) => onEditTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSaveEdit(todo.id);
            if (e.key === 'Escape') onCancelEdit();
          }}
          className="flex-1 border border-blue-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          onClick={() => onSaveEdit(todo.id)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
        >
          Save
        </button>
        <button
          onClick={onCancelEdit}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
        >
          Cancel
        </button>
      </li>
    );
  }
  
  // Normal view (not editing)
  return (
    <li className="flex items-center gap-3 p-3 my-2 bg-gray-50 rounded hover:bg-gray-100">
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleComplete(todo.id)} 
        className='w-5 h-5 cursor-pointer' 
      />
      
      <span 
        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
        onDoubleClick={() => onStartEdit(todo.id, todo.text)}
      >
        {todo.text}
      </span>
      
      <button 
  onClick={() => onStartEdit(todo.id, todo.text)} 
  className='text-blue-500 hover:text-blue-700 font-bold'
>
  <FaEdit />
</button>

<button 
  onClick={() => deleteTodoItem(todo.id)} 
  className='text-red-500 hover:text-red-700 font-bold'
>
  <FaTrash />
</button>
    </li>
  )
}

export default TodoItem