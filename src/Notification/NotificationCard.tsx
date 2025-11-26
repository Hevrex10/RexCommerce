import { useEffect } from "react";

export default function NotificationCard({ text}:{text:any}) {
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-300 text-white 
                    px-4 py-3 rounded-full shadow-lg flex items-center gap-3 z-50
                    transition-all duration-300 outline outline-blue-700    outline-offset-2"
    >
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
