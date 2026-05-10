import React from 'react'

const AddNote = () => {
    return (
        <div className='min-h-screen bg-black text-white'>

            <div className='pt-12 flex justify-center items-center flex-col '>

                <h1 className='mb-10 text-2xl text-violet-700'>Add your Note</h1>

                <div className='flex flex-col gap-6 mb-5'>
                    <input type="text" placeholder='add title' className=' bg-gray-300 rounded-md text-black h-10 pl-3' />
                    <textarea name="" placeholder='add description' className='bg-gray-300 rounded-md pl-2 pt-2 text-black' id=""></textarea>
                </div>

                <div 
                className='flex hover:cursor-pointer items-center justify-center gap-5 mt-7'>
                    <button className=' hover:cursor-pointer bg-blue-500 px-4  py-3 rounded-xl'>Add Note</button>
                    <button className='hover:cursor-pointer bg-red-500 px-5 py-3 rounded-xl'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddNote;
