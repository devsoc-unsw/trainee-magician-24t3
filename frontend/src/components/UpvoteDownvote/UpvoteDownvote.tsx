import DownvoteImage from "./DownvoteIcon.png";
import UpvoteImage from "./UpvoteIcon (2).png";

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
        <img src={UpvoteImage} alt="Upvote" className="mr-2 h-7 w-7" />
      </button>
      <h3 className={`mr-4 ${hasUpvoted ? "text-green-500" : ""}`}>
        {upvotes}
      </h3>
      <button
        onClick={handleDownvote}
        className="transition-transform hover:scale-110"
      >
        <img src={DownvoteImage} alt="Downvote" className="mr-2 h-7 w-7" />
      </button>
      <h3 className={`mr-4 ${hasDownvoted ? "text-red-500" : ""}`}>
        {downvotes}
      </h3>
    </div>
  );
};

export default UpvoteDownvote;
