import { useState } from "react";
import { Sizes } from "./Card";

export default function SizeComponent() {
  const [selectedSize, setSelectedSize] = useState<string[]>([]);

  const sizes = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
   function selectSize(size:string){
    setSelectedSize(p => p.includes(size) ? p.filter((s)=> s !== size): [...p,size])
  }

  return (
    <>
      <p className="font-['Inter'] text-sm font-medium leading-6 text-zinc-600">Sizes</p>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size: any) => (
          <Sizes
            size={size}
            onClick={() => selectSize(size)}
            selected={selectedSize.includes(size)}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3 pb-2">
        {selectedSize.map((size, index) => (
          <span key={index} className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
            {size}
          </span>
        ))}
      </div>
    </>
  );
}
