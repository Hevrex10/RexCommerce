import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ProductsCard({productName,src,price,stock,id}:{productName:string,src:string,price:number,stock:string,id:number|string}) {
  return (
    <NavLink to={`/products/${id}`}>
    <div className="max-w-64 px-2 py-4 rounded flex flex-col justify-start items-start gap-6 transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="h-80 bg-neutral-100 rounded overflow-hidden">
              <img className="max-w-60 h-80 " src={src} />
            </div>
            <div className="h-16 relative">
              <div className="flex flex-col justify-start items-start gap-3">
                <p className="text-center justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
                  {productName}
                </p>
                <div className="max-w-60 flex justify-start items-center gap-4">
                  <div className="px-4 py-0.5 rounded-[100px] outline outline-gray-200 flex justify-start items-start gap-2 overflow-hidden">
                    <p className={`justify-start text-xs font-medium font-['Inter'] capitalize leading-6 ${stock ? "text-blue-600" : "text-red-700"}`}>
                    {stock}
                    </p>
                  </div>
                  <p className="text-center justify-start text-zinc-600 text-sm font-normal font-['Inter'] leading-6">
                    ${price}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </NavLink>
  )
}
