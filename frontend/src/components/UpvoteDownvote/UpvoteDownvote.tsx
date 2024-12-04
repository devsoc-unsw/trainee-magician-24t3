import DownvoteImage from "./DownvoteIcon.png";
import UpvoteImage from "./UpvoteIcon (2).png";

interface UpvoteDownvoteProps {
  upvotes: number;
  downvotes: number;
}

const UpvoteDownvote = (props: UpvoteDownvoteProps) => {
  return (
    <div className="flex">
      <button>
        <img src={UpvoteImage} alt="Upvote" className="mr-2 h-7 w-7" />
      </button>
      <h3 className="mr-4">{props.upvotes}</h3>
      <button>
        <img src={DownvoteImage} alt="Upvote" className="mr-2 h-7 w-7" />
      </button>
      <h3>{props.downvotes}</h3>
    </div>
  );
};

export default UpvoteDownvote;
