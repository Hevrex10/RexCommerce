import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import ProductsCard from "./ProductsCard";
import { Product } from "../Type/Type";
import { Circle } from "./ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { handleColor, setItemColor, setSelected } from "../features/uiSlice";
import { SizeOption } from "./ProductDetail";
import { setSize, setCategory, removeCategory } from "../features/uiSlice";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./slider.css";

const items = ["Perfume", "Trouser", "Shoe", "Handbag", "Hat"];
const colors = ["bg-black", "bg-orange-500", "bg-blue-200", "bg-gray-200", "bg-stone-400"];
const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductList({ allProduct }: { allProduct: any }) {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [value, setValue] = useState<[number, number]>([200, 890]);
  const [isVisible,setisVisible] = useState<boolean>(false);
  

  const { itemSize, isColor, selected, category, itemColor } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();

  function handleVisibility(){
    setisVisible(p => !p)
  }

  function handleClick(id: number, color: string) {
    dispatch(handleColor(id));
    dispatch(setItemColor(color)); 
  }

  function handleSelectedSize(id: number, size: string) {
    const isSelected: boolean = selected === id;
    dispatch(setSelected(selected === id ? null : id));
    dispatch(setSize(size));
    setIsTrue(!isSelected);
  }

  function getColorName(twClass: string) {
    if (!twClass) return "";
    const parts = twClass.replace("bg-", "").split("-");
    return parts[0];
  }

  const filteredProducts = allProduct.filter((product: Product) => {
  const matchesCategory =
    category.length === 0 || category.includes(product.category);

  const matchesColor =
    !itemColor || product.colors?.some((c: string) => c.includes(getColorName(itemColor)));

  const matchesSize =
    !itemSize || product.sizes?.includes(itemSize);

  const matchesPrice =
    product.price >= value[0] && product.price <= value[1];

  return matchesCategory && matchesColor && matchesSize && matchesPrice;
});

  return (
    <>
      <section>
        <div className="max-w-full py-4 bg-neutral-100 flex flex-col justify-center items-center gap-2.5">
          <div
            data-show-title="false"
            className="max-w-[1116px] w-full h-7 px-3 flex flex-col justify-center items-start gap-2 overflow-hidden"
          >
            <div className="rounded inline-flex justify-start items-center gap-2">
              <p className="justify-start text-gray-600 text-sm font-medium font-['Inter'] leading-6">
                Ecommerce
              </p>
              <FaChevronRight className="text-[12px] text-gray-600" />
              <p className="justify-start text-gray-900 text-sm font-medium font-['Inter'] leading-6">
                Search
              </p>
            </div>
          </div>
        </div>
      </section>
      <main className="max-w-full flex justify-center relative overflow-x-auto">
        <div className="flex-col gap-3"></div>
        <div className="max-w-[1096px] w-full flex gap-8 mt-10 px-4 sm:px-6 lg:px-8">
         
          <div className={`max-w-60 w-full rounded-md absolute lg:relative bg-white z-5 ${isVisible ? "hidden" : "block" }`}>
            
            <div className="outline outline-gray-200 max-w-full flex flex-col pl-4 pr-3 pt-6 pb-8 gap-12">
              <div className="flex flex-col gap-4">
                <RxCross2 className="hover:cursor-pointer" onClick={handleVisibility}/>
                <p className="text-gray-900 text-sm font-medium font-['Inter'] leading-6">
                  Categories
                </p>
                <div className="flex flex-col">
                  {items.map((item, index) => (
                    <Categories key={index} product={item} />
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="flex flex-col gap-3">
                <p className="text-gray-600 ">Color</p>
                <div className="flex gap-2 cursor-pointer">
                  {colors.map((color, index) => (
                    <Circle
                      key={index}
                      bg={color}
                      onClick={() => handleClick(index, color)}
                      isActive={isColor === index}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="flex flex-col gap-4">
                <p className="text-gray-600">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size, index) => (
                    <SizeOption
                      size={size}
                      key={index}
                      onClick={() => handleSelectedSize(index, size)}
                      selected={selected === index}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-10 mb-20">
                <p className="text-gray-600">Price</p>
                <div className="relative w-full">
                  <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    defaultValue={value}
                    value={value}
                    onInput={setValue}
                  />
                  <div
                    className="absolute -bottom-10 bg-gray-900 text-white text-xs px-2 py-1 rounded-md transition-all duration-150"
                    style={{ left: `calc(${(value[1] / 1000) * 100}% - 20px)` }}
                  >
                    ${value[1].toFixed(0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[813px] w-full flex flex-col gap-6 h-screen overflow-x-scroll ">
            <div className="max-w-full flex flex-col gap-3">
              
           <RxHamburgerMenu onClick={handleVisibility} className={`${isVisible ? "block": "hidden"} hover:cursor-pointer`}/> 
         
              <p className="text-black text-sm font-medium font-['Inter'] leading-6">
                Applied Filter:
              </p>
              <div className="flex gap-3">
                {category.map((c: string, index: number) => (
                  <CardButton key={index} item={c} />
                ))}
                {isTrue && <CardButton item={`Size: ${itemSize}`} />}
                {itemColor && <CardButton item={getColorName(itemColor)} />}
              </div>
            </div>

            <div className="max-w-full flex justify-between items-start">
              <p className="text-gray-600 text-xs font-medium font-['Inter'] leading-6">
                Showing 1-9 of 36 results.
              </p>
              <div className="rounded flex justify-start items-center gap-1.5">
                <p className="justify-start text-gray-600 text-xs font-medium font-['Inter'] uppercase leading-6 tracking-wide">
                  Sort by
                </p>
                <FaAngleDown className="text-gray-600" />
              </div>
            </div>

            <div className="max-w-full grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-30 ">
              {allProduct.map((product: Product) => (
                <ProductsCard
                  key={product.id}
                  productName={product.name}
                  src={product.image}
                  price={10}
                  stock={product.instock ? "INSTOCK" : "OUT OF STOCK"}
                  id={product.id}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function CardButton({ item }: { item: string }) {
  return (
    <div className="px-4 py-1 rounded-[100px] outline outline-gray-200 flex justify-start items-center gap-2 overflow-hidden">
      <p className="text-gray-900 text-xs font-medium font-['Inter'] leading-6">{item}</p>
      <RxCross2 className="text-gray-600" />
    </div>
  );
}

function Categories({ product }: { product: string }) {
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      dispatch(setCategory(product));
    } else {
      dispatch(removeCategory(product));
    }
  }

  return (
    <div className="px-1 py-3 border-b border-gray-200 flex justify-start items-center">
      <label htmlFor={product} className="flex gap-3 cursor-pointer items-center">
        <input
          id={product}
          type="checkbox"
          onChange={handleChange}
          className="accent-black cursor-pointer border-2 border-gray-200 w-4 h-4"
        />
        <p className="text-zinc-600 text-sm font-normal font-['Inter'] leading-6">{product}</p>
      </label>
    </div>
  );
}
