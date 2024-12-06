import { useState } from "react";
import DownvoteImage from "./DownvoteIcon.png";
import UpvoteImage from "./UpvoteIcon (2).png";

interface UpvoteDownvoteProps {
  upvotes: number;
  downvotes: number;
  onUpvote?: (isUpvoting: boolean) => void;
  onDownvote?: (isDownvoting: boolean) => void;
}

const UpvoteDownvote = ({ upvotes, downvotes, onUpvote, onDownvote }: UpvoteDownvoteProps) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const handleUpvote = () => {
    const isUpvoting = !hasUpvoted;
    
    if (hasDownvoted) {
      setHasDownvoted(false);
      if (onDownvote) onDownvote(false);
    }

    setHasUpvoted(isUpvoting);
    if (onUpvote) {
      onUpvote(isUpvoting);
    }
  };

  const handleDownvote = () => {
    const isDownvoting = !hasDownvoted;
    
    if (hasUpvoted) {
      setHasUpvoted(false);
      if (onUpvote) onUpvote(false);
    }

    setHasDownvoted(isDownvoting);
    if (onDownvote) {
      onDownvote(isDownvoting);
    }
  };

  return (
    <div className="flex">
      <button 
        onClick={handleUpvote}
        className={`transition-transform ${hasUpvoted ? 'scale-110' : ''}`}
      >
        <img src={UpvoteImage} alt="Upvote" className="mr-2 h-7 w-7" />
      </button>
      <h3 className="mr-4">{upvotes}</h3>
      <button 
        onClick={handleDownvote}
        className={`transition-transform ${hasDownvoted ? 'scale-110' : ''}`}
      >
        <img src={DownvoteImage} alt="Downvote" className="mr-2 h-7 w-7" />
      </button>
      <h3>{downvotes}</h3>
    </div>
  );
};

export default UpvoteDownvote;
