import React from "react";

export default function NewsLetter() {
  return (
    <div className="bg-neutral-100 flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 md:gap-20 py-16 px-6 md:px-10 rounded-lg ">
      <div className="flex flex-col justify-center items-center md:items-start sm:items-center lg:items-start gap-6 text-center md:text-left">
        <p className="text-gray-900 text-2xl font-bold font-['Inter']">Join Our Newsletter</p>
        <p className="text-gray-600 text-sm font-normal font-['Inter'] leading-6">
          We love to surprise our subscribers with occasional gifts.
        </p>
      </div>
      <form
        action="/submit"
        className="flex flex-col sm:flex-row justify-center items-start gap-4 w-full md:w-auto"
      >
        <div className="w-full sm:w-80 flex flex-col justify-center items-start">
          <input
            placeholder="Your email address"
            className="w-full px-3.5 py-2.5 rounded-md outline-1 outline-gray-200"
          />
        </div>
        <button className="px-6 py-3 bg-gray-900 rounded text-white text-sm font-medium font-['Inter'] hover:cursor-pointer w-full sm:w-auto">
          Subscribe
        </button>
      </form>
    </div>
  );
}
