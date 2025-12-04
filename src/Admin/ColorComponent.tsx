import React, { useState } from 'react'
import { Color } from './Card';

export default function ColorComponent({selectedColors,setSelectedColors}:{selectedColors:any,setSelectedColors:any}) {

    const colors = [
      "bg-white",
      "bg-blue-500",
      "bg-black",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-red-500",
    ];
  
    function toggleColor(color: string) {
      setSelectedColors((prev:string[]) =>
        prev.includes(color) ? prev.filter((c:string) => c !== color) : [...prev, color]
      );
    }
  return (
    <>
       <p className="font-['Inter'] text-sm font-medium leading-6 text-zinc-600">Colors</p>
            <div className="flex gap-3">
              {colors.map((color, index) => (
                <Color
                  key={index}
                  bg={color}
                  onClick={() => toggleColor(color)}
                  selected={selectedColors.includes(color)}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pb-2">
              {selectedColors.map((color:string, index:any) => (
                <span key={index} className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
                  {color.replace("bg-", "")}
                </span>
              ))}
            </div>
    </>
  )
}
