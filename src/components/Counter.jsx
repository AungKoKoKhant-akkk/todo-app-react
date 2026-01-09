import React from 'react'

function Counter({ todoList }) {
  return (
    <>  
    {todoList.length > 0 && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className='text-center text-gray-600 text-sm'>
              {todoList.filter((todo)=> !todo.completed).length} tasks remaining
            </p>
          </div>
        )}
    </>
  )
}

export default Counter
