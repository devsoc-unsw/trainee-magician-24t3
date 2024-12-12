import { useState } from "react";
import { range } from "../../utils/range";
import { useThemeContext } from "../../contexts/ThemeContext";
import { themeConfig } from "../../config/theme.config";

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
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingClick = (selectedRating: number) => {
    if (readonly) return;
    onRatingSubmit?.(selectedRating);
  };

  return (
    <>
      {showText && (
        <h3 className={`text-lg font-semibold ${theme.secondaryText}`}>
          Community Rating
        </h3>
      )}
      <div className="flex items-center gap-2">
        {range(5).map((circle) => (
          <button
            key={circle}
            className={`h-5 w-5 rounded-full border border-black transition-all duration-200 ${
              !readonly && "hover:scale-110"
            } ${
              hoveredRating !== null
                ? hoveredRating >= circle
                  ? theme.rating.hover
                  : theme.rating.inactive
                : initialRating >= circle
                ? theme.rating.active
                : theme.rating.inactive
            } ${readonly ? "cursor-default" : "cursor-pointer"}`}
            onMouseEnter={() => !readonly && setHoveredRating(circle)}
            onMouseLeave={() => !readonly && setHoveredRating(null)}
            onClick={() => handleRatingClick(circle)}
          />
        ))}
      </div>
    </>
  );
};

export default CommunityRating;
