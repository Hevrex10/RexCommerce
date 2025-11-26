import React from 'react'
import Button from './Button'

export default function Browse() {
  return (
    <section className="max-w-full  bg-linear-to-r from-neutral-100 to-white/0 rounded border-t border-b border-neutral-100 my-30  px-4 sm:px-6 lg:px-8">
      <div className='max-w-[1092px] mx-auto flex flex-col-reverse lg:flex-row justify-between items-center '>
      <div className='flex flex-col justify-center gap-5 items-center lg:items-start'>
        <p className=" text-gray-900 text-2xl font-bold font-['Inter'] text-center ">Browse Our Fashion Paradise!</p>
        <div className="flex text-gray-600 text-sm font-normal font-['Inter'] leading-6 text-center lg:text- lg:items-start">
          <p>Step into a world of style and explore our diverse collection of <br /> clothing categories.</p></div>
        <Button text="Start Browsing" to= "/products"/>
      </div>
      <div className='w-56 h-80 flex items-center'>
        <img src="/ProductImg/Skirt.png" alt="" />
      </div>
      </div>
    </section>
  )
}
