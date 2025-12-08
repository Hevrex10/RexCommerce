import { useState } from "react";
import { Star } from "lucide-react";

 export default function StarRating({ rating, setRating }: any) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;

        return (
          <Star
            key={index}
            size={22}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className={
              starValue <= (hover || rating)
                ? "text-yellow-400 fill-yellow-400 cursor-pointer"
                : "text-gray-300 cursor-pointer"
            }
          />
        );
      })}
    </div>
  );
}
