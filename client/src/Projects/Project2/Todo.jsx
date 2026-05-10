import React, { useEffect, useState } from 'react'

const Todo = () => {

    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [editInput, setEditInput] = useState('');


    useEffect(() => {
        const getItems = JSON.parse(localStorage.getItem('TODO')) || [];
        setTodos(getItems);
    }, []);


    useEffect(() => {
        localStorage.setItem("TODO", JSON.stringify(todos));
    }, [todos]);


    // 1)submit todo
    const handleSubmitTodo = (e) => {
        e.preventDefault();

        if (!input) return;
        setTodos((todo) => (
            [...todo, { uid: Date.now().toString(36).slice(-4), text: input.trim(), marked: false }]
        ));

        setInput("");
    }


    // 2)delete todo
    const deleteTodo = (id) => {
        setTodos(myTodos =>
            myTodos.filter(tod => tod?.uid !== id)
        );
    }


    // 3) mark
    const markTodo = (id) => {
        setTodos(myTodos =>
            myTodos.map((tod) => tod?.uid === id ? { ...tod, marked: !tod?.marked } : tod)
        )
    }


    //

    const editData = (val, id) => {
        setEditModal(val);
        setEditId(id);
    }


    const handleEditData = () => {
        if (!editInput.trim()) return;

        const updatedTodos = todos.map((tod) =>
            tod.uid === editId
                ? { ...tod, text: editInput.trim() }
                : tod
        );

        setTodos(updatedTodos); // ✅ correct state update
        setEditInput("");
        setEditModal(false);
    }









    return (
        <div className='min-h-screen bg-black flex items-center justify-center text-white'>
            <div className='border-amber-100 flex flex-col gap-5'>
                <form onSubmit={handleSubmitTodo}>
                    <div className='flex items-center justify-center gap-3.5 mb-7'>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='bg-gray-300 text-black h-10 pl-3 rounded-md' type="text" placeholder='add todo' />
                        <button type='submit' className='bg-green-400 px-7 py-2 rounded-xl'>Add</button>
                        <button type="button" className='bg-red-400 px-7 py-2 rounded-xl'>deleteAll</button>
                    </div>
                </form>


                <div className='border-2 h-[250px] w-full mx-auto overflow-y-auto p-3'>

                    {todos.length === 0 ? (
                        <p className='text-center text-gray-400 mt-10'>No Todos left</p>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo?.uid}
                                className='flex items-center justify-between bg-gray-600 rounded-lg px-3 py-2 mb-3'
                            >
                                <p className={`text-sm ${todo?.marked ? "line-through" : ""}`}>- {todo?.text}</p>

                                <div className='flex items-center gap-3'>
                                    <button onClick={() => markTodo(todo?.uid)} className='bg-yellow-400 px-3 py-1 rounded-lg text-sm'>
                                        {todo?.marked ? "unMark" : "Mark"}
                                    </button>
                                    <button onClick={() => editData(true, todo?.uid)} className='bg-violet-400 px-3 py-1 rounded-lg text-sm'>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteTodo(todo?.uid)} className='bg-red-400 px-3 py-1 rounded-lg text-sm'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>


                {editModal && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

                        <div className='h-[200px] w-[300px] bg-gray-700 rounded-xl flex flex-col justify-center items-center gap-4 p-4'>

                            <input
                                value={editInput}
                                onChange={(e) => setEditInput(e.target.value)}
                                type="text"
                                className='bg-gray-300 pl-3 h-8 rounded-md text-black w-full'
                                placeholder='Edit todo...'
                            />

                            <div className='flex gap-5'>
                                <button
                                    onClick={handleEditData}
                                    className='bg-yellow-400 px-3 py-1 rounded-lg text-sm'
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => setEditModal(false)}
                                    className='bg-red-600 px-3 py-1 rounded-lg text-sm text-white'
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Todo;
