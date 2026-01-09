import React from 'react'

function FilterTodo({ filter, setFilter }) {
    return (
        <>
            <div className="flex gap-2 justify-center mb-4">
                <button onClick={() => setFilter('all')}
                    className={`btn btn-outline ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>All</button>
                <button onClick={() => setFilter('active')}
                    className={`btn btn-outline ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Active</button>
                <button onClick={() => setFilter('completed')}
                    className={`btn btn-outline ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Completed</button>
            </div>
        </>
    )
}

export default FilterTodo
