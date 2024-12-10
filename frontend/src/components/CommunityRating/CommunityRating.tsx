import { useState } from "react";
import { range } from "../../utils/range";

interface CommunityRatingProps {
  initialRating?: number;
  onRatingSubmit?: (rating: number) => void;
  readonly?: boolean;
  showText?: boolean;
}

const CommunityRating = ({
  initialRating = 0,
  onRatingSubmit,
  readonly = false,
  showText = true,
}: CommunityRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingClick = (selectedRating: number) => {
    if (readonly) return;
    onRatingSubmit?.(selectedRating);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {showText && (
        <h3 className="text-lg font-semibold text-[#555555]">
          Community Rating
        </h3>
      )}
      <div className="flex items-center gap-2">
        {range(1, 5).map((circle) => (
          <button
            key={circle}
            className={`h-5 w-5 rounded-full border border-black transition-all duration-200 ${!readonly && "hover:scale-110"} ${
              hoveredRating !== null
                ? hoveredRating >= circle
                  ? "bg-[#FFDD43]" // Gold for hover state
                  : "bg-white"
                : initialRating >= circle
                  ? "bg-[#63C779]" // Green for community rating
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
