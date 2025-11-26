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
      className={`
        ${width} w-full flex items-center justify-center gap-2
        bg-gray-900 text-white rounded hover:cursor-pointer group
        px-2 py-2 text-xs     /* smaller for mobile */
        sm:px-3 sm:py-3 sm:text-sm /* normal from small screens upward */
        font-medium font-['Inter']
      `}
    >
      <p>{text}</p>

      <span className="transition-transform duration-300 transform group-hover:translate-x-2">
        &rarr;
      </span>
    </NavLink>
  );
}
