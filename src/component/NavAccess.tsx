import React from 'react'
import { Link } from 'react-router-dom'

export default function NavAccess({setShowPrompt}:any) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-9999">
             <div className="bg-white shadow-xl rounded-2xl p-6 text-center relative max-w-sm w-[90%] border border-gray-200">
               <button
                 onClick={() => setShowPrompt(false)}
                 className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
               >
                 ×
               </button>
   
               <h2 className="text-lg font-semibold text-gray-800 mb-3">Please Log In or Sign Up</h2>
               <p className="text-gray-600 text-sm mb-6">
                 You need to be logged in to access this feature.
               </p>
   
               <div className="flex justify-center gap-4">
                 <Link
                   to="/login"
                   onClick={() => setShowPrompt(false)}
                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                 >
                   Log In
                 </Link>
                 <Link
                   to="/sign-up"
                   onClick={() => setShowPrompt(false)}
                   className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition text-sm"
                 >
                   Sign Up
                 </Link>
               </div>
             </div>
           </div>
  )
}
