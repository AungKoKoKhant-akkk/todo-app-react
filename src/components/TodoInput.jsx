import React from 'react'

function TodoInput({ inputText, setText, addTodoText }) {
  return (
    
      <div className="flex gap-2 mb-6 max-w-md mx-auto my-5 rounded-lg shadow-lg ">
        <input type="text" placeholder='Enter Tasks' value={inputText} onKeyDown={(e) => e.key === 'Enter' && addTodoText()} onChange={(e) => setText(e.target.value)} className='flex-1 border border-yellow-300 bg-white rounded px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        <button onClick={addTodoText} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>Add</button>
      </div>
  )
}

export default TodoInput
