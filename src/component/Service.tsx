import React from 'react'
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function Service() {
  return (
    <section className='max-w-full px-4 sm:px-6 lg:px-8 '>
      <div className="max-w-[1092px] pb-12 flex flex-col sm:flex-row gap-6 justify-between items-center mx-auto mt-20  px-4 sm:px-6">
          <ServiceCard main="Upgrade your style today and get FREE shipping on all orders! Don't miss out." text='Free Shipping' icon={<MdOutlineLocalShipping className='text-3xl text-gray-600 '/>} />
          <ServiceCard main="Shop confidently with our Satisfaction Guarantee: Love it or get a refund." text='Satisfaction Guarantee' icon={<FaAward className='text-3xl text-gray-600 '/>} />
          <ServiceCard main="Your security is our priority. Your payments are secure with us.." text='Secure Payment' icon={<RiSecurePaymentLine className='text-3xl text-gray-600 '/>} />
       </div>
    </section>
  )
}


function ServiceCard({main,text,icon}: {main:string, text:string, icon:any}){
  return(
    
    <div className="w-80 flex flex-col gap-4 px-3 ">
      <div className="w-12 h-12 px-[5px] bg-neutral-100 rounded-[100px] flex justify-center items-center gap-2.5 overflow-hidden">
      {icon}
      </div>
      <div className=" text-gray-800 text-base font-semibold font-['Inter']">{text}</div>
      <div className=" text-gray-600 text-sm font-normal font-['Inter'] leading-6">{main}</div>
  
</div>
  )
}