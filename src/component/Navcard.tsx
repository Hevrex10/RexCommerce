import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export default function Navcard({text,main,bg="bg-neutral-100"}: {text: string,main:string,bg?:string}) {
  return (
    <section className={`max-w-full flex justify-center items-center ${bg}`}>
           <div className=" max-w-[1116px] w-full px-3 flex flex-col justify-center items-start gap-2 my-12">
             <p className=" text-gray-900 text-2xl font-bold font-['Inter']">{main}</p>
             <div className="rounded flex justify-start items-center gap-1">
               <NavLink to="/" className="text-gray-600 text-sm font-medium font-['Inter'] leading-6">
                 Ecommerce
               </NavLink>
               <FaAngleRight className="text-gray-600 " />
               <p className=" text-gray-900 text-sm font-medium font-['Inter'] leading-6">{text}</p>
             </div>
           </div>
         </section>
  )
}
