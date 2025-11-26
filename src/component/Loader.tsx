import React, { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
        {/* Optional text */}
        <p className="mt-4 text-blue-200 text-lg font-semibold font-['Inter']">Loading...</p>
      </div>
    </div>
  );
}
