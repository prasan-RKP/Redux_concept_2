import React from 'react'

const SeeNotes = () => {
    return (
        <div className='min-h-screen bg-black text-white '>
            <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs ml-5 mt-20 rounded-xl">
                <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Noteworthy technology acquisitions 2021</h5>
                <p class="text-body mb-6">Here are the biggest technology acquisitions of 2025 so far, in reverse chronological order.</p>
                <div className='flex items-center gap-4'>
                    <button className='px-3 py-1 bg-violet-600 rounded-md'>Edit</button>
                    <button className='px-3 py-1 bg-red-600 rounded-md'>Delete</button>
                    <button className='px-3 py-1 bg-yellow-600 rounded-md'>Mark</button>
                </div>
            </div>
        </div>
    )
}

export default SeeNotes
