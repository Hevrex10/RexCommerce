import React from 'react'

export default function LoginButtonCard({text,onClick}:{text:string,onClick?:()=>void}) {


  return (
   <button type="submit" onClick={onClick} className="max-w-80 w-full px-6 py-2 bg-gray-900 rounded flex justify-center items-center hover:cursor-pointer">
     <p className=" text-white text-sm font-medium font-['Inter'] leading-6"> {text} </p>
    </button>
  )
}
