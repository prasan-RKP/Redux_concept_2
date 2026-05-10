import React from 'react'

const NoteDashboard = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='flex justify-between ml-5 mr-5 pt-10 items-center mb-10'>
        <div className='text-orange-600'>
            <p>Note On!</p>
        </div>

        <div className='flex justify-center items-center gap-6 hover:cursor-pointer'>
             <p className='bg-blue-500 px-5 py-3 rounded-xl'>See Notes</p>
             <p className='bg-violet-600 px-5 py-3 rounded-xl'>addNote</p>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-center' >
          <p>This is on noteApp details....</p>
      </div>
    </div>
  )
}

export default NoteDashboard;
