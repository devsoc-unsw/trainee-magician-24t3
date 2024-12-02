import { useState } from "react";
import { range } from "../../utils/range";

interface CommunityRatingProps {
  initialRating?: number;
  onRatingSubmit?: (rating: number) => void;
  readonly?: boolean;
}

const CommunityRating = ({
  initialRating = 0,
  onRatingSubmit,
  readonly = false,
}: CommunityRatingProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingClick = (selectedRating: number) => {
    if (readonly) return;
    setRating(selectedRating);
    onRatingSubmit?.(selectedRating);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-lg font-semibold text-[#555555]">Community Rating</h3>
      <div className="flex items-center gap-2">
        {range(1, 5).map((circle) => (
          <button
            key={circle}
            className={`h-5 w-5 rounded-full border border-black transition-all duration-200 hover:scale-110 active:scale-95 ${
              (
                hoveredRating !== null
                  ? hoveredRating >= circle
                  : rating >= circle
              )
                ? "bg-[#63C779]"
                : "bg-white"
            } ${readonly ? "cursor-default" : "cursor-pointer"}`}
            onMouseEnter={() => !readonly && setHoveredRating(circle)}
            onMouseLeave={() => !readonly && setHoveredRating(null)}
            onClick={() => handleRatingClick(circle)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityRating;
