import React from "react";
import { NavLink } from "react-router-dom";

export default function Button({
  text,
  to,
  width = "max-w-[10rem]",
}: {
  text?: string;
  to: string;
  width?: string;
}) {
  return (
    <NavLink
      to={to}
      className={` ${width} group flex w-full items-center justify-center gap-2 rounded bg-gray-900 px-2 py-2 font-['Inter'] text-xs font-medium text-white hover:cursor-pointer sm:px-3 sm:py-3 sm:text-sm`}
    >
      <p>{text}</p>

      <span className="transform transition-transform duration-300 group-hover:translate-x-2">
        &rarr;
      </span>
    </NavLink>
  );
}
