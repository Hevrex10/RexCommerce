import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'

export default function EmptyCart () {
  return(
    <div className="flex flex-col justify-start items-center gap-6">
    <img src="/images/Empty State.png" alt="" />
  <p className="text-gray-600 text-sm font-normal font-['Inter'] leading-6">Your order history is waiting to be filled.</p>
  <div data-right-icon="true" data-size="Default" data-type="Default" className="h-11 px-6 py-3 bg-gray-900 rounded inline-flex justify-start items-center gap-1.5 overflow-hidden">
  <Button text="Start Shopping" to="/products" width='max-w-40' /> 
    <div className="w-6 h-6 px-[5px] py-px flex justify-center items-center gap-2.5 overflow-hidden">
    </div>
  </div>
</div>
  )
}