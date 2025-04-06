import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ onRatingSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleClick = (rating) => {
    setSelected(rating);
    if (onRatingSelect) {
      onRatingSelect(rating);
    }
  };

  return (
    <div className="flex gap-1 m-auto my-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="text-yellow-400"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              (hovered || selected) >= star ? "fill-yellow-400" : "fill-none"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
