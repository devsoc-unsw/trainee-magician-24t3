import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useThemeContext } from "../../contexts/ThemeContext";
import { themeConfig } from "../../config/theme.config";

interface UpvoteDownvoteProps {
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  onUpvote?: (isUpvoting: boolean) => void;
  onDownvote?: (isDownvoting: boolean) => void;
}

const UpvoteDownvote = ({
  upvotes,
  downvotes,
  hasUpvoted,
  hasDownvoted,
  onUpvote,
  onDownvote,
}: UpvoteDownvoteProps) => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];

  const handleUpvote = () => {
    if (hasDownvoted && onDownvote) {
      onDownvote(false);
    }
    if (onUpvote) {
      onUpvote(!hasUpvoted);
    }
  };

  const handleDownvote = () => {
    if (hasUpvoted && onUpvote) {
      onUpvote(false);
    }
    if (onDownvote) {
      onDownvote(!hasDownvoted);
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleUpvote}
        className="transition-transform hover:scale-110"
      >
        <BiSolidUpArrow 
          className={`mr-2 h-7 w-7 ${hasUpvoted ? theme.accentText : theme.secondaryText}`}
        />
      </button>
      <h3 className={`mr-4 ${hasUpvoted ? theme.accentText : theme.secondaryText}`}>
        {upvotes}
      </h3>
      <button
        onClick={handleDownvote}
        className="transition-transform hover:scale-110"
      >
        <BiSolidDownArrow 
          className={`mr-2 h-7 w-7 ${hasDownvoted ? theme.accentText : theme.secondaryText}`}
        />
      </button>
      <h3 className={`mr-4 ${hasDownvoted ? theme.accentText : theme.secondaryText}`}>
        {downvotes}
      </h3>
    </div>
  );
};

export default UpvoteDownvote;
