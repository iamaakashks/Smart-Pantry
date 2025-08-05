import React from 'react'
import { Link } from 'react-router-dom';

function HomePage(){
    return (
        <div className='w-[100%] min-h-screen bg-zinc-800 text-white flex justify-center items-center'>
            <Link className='bg-zinc-300 px-4 py-1.5 rounded text-blue-800 italic' to='/pantry'>Go to main page</Link>
        </div>
    )
}
export default HomePage;