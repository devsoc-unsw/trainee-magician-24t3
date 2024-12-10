import { useState } from "react";
import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";
import CommentBox from "../components/CommentBox";
import WelcomeIcon from "../components/WelcomeIcon";
import PosterDetails from "../components/PosterDetails";
import UpvoteDownvote from "../components/UpvoteDownvote";
import TipTags from "../components/TipTags";
import FavouriteButton from "../components/FavouriteButton";

interface Rating {
  value: 1 | 2 | 3 | 4 | 5;
  raterId: string;
}

interface Comment {
  authorId: string;
  content: string;
  createdAt: string;
  // Additional frontend-only properties after fetching
  author?: {
    name: string;
    profilePic?: string;
  };
}

interface TipProps {
  tipId: string;
  title: string;
  type: "DEATH OR LIFE"; // Can be expanded to include other types if needed
  authorId: string;
  tags: string[];
  ratings: Rating[];
  description: string;
  upvotes: string[]; // Array of userIds
  downvotes: string[]; // Array of userIds
  createdAt: string;
  content: string;
  comments: Comment[];
  // Additional frontend-only properties after fetching
  author?: {
    name: string;
    profilePic: string;
  };
  currentUser?: {
    userId: string;
    firstName: string;
    lastName: string;
    profileUrl: string;
    favouritePosts: string[];
    email: string;
  };
}

// Update mock data to include emails in upvotes/downvotes
const mockTip: TipProps = {
  tipId: "tip123",
  title: "This is my tip hello hello hello hello",
  type: "DEATH OR LIFE",
  authorId: "user123",
  description: "A sample tip description",
  upvotes: ["user123", "user1", "user2", "user3", "user4", "user5"],
  downvotes: ["user6", "user7", "user8", "user9", "user10"],
  createdAt: "2024-10-22T00:00:00.000Z",
  content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
    inventore ipsum officiis id provident blanditiis numquam
    exercitationem, atque molestiae porro, amet tempora saepe
    consequuntur eius adipisci perspiciatis fugiat sunt at minus? Sunt,
    porro nobis. Error dolorem at veritatis quam, sequi eligendi, vitae
    consequuntur distinctio voluptatum quod voluptate ut? Excepturi
    nesciunt inventore iste culpa ratione reiciendis ducimus porro, ut
    exercitationem commodi nobis vel minus minima enim cumque nostrum
    laborum! Cumque dicta nemo animi suscipit tenetur dolore architecto
    in adipisci aut quam! Aliquid, ut sed quidem possimus exercitationem
    voluptatem repudiandae, vel necessitatibus corporis rem modi iste!
    Libero natus eius dolor quam similique.\n\n
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
    debitis expedita numquam consequuntur id magni molestias quae
    repellendus aut laudantium vero quaerat in repellat impedit
    suscipit, reprehenderit sit dolore! Nostrum nam sequi, velit dolor
    dolorem unde minima consequatur quisquam facilis perspiciatis sint
    suscipit ea debitis aliquam omnis, eaque possimus nobis!`,
  tags: [
    "#lorem",
    "#ipsum",
    "#dolor",
    "#sit_amet_consectetur",
    "#elit",
    "#magnam",
    "#libero",
    "#adipisci",
    "#corporis",
    "#quae",
    "#suscipit",
    "#natus",
    "#rem",
  ],
  ratings: [
    { value: 3, raterId: "user1" },
    { value: 4, raterId: "user2" },
    { value: 3, raterId: "user3" },
  ],
  comments: [
    {
      authorId: "user456",
      content: "To be continued..",
      createdAt: "2024-10-26T00:00:00.000Z",
      author: {
        name: "Some name1",
        profilePic:
          "https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg",
      },
    },
    {
      authorId: "user789",
      content: "This is a comment!2",
      createdAt: "2024-10-26T00:00:00.000Z",
      author: {
        name: "Some name2",
        profilePic:
          "https://i.pinimg.com/474x/ca/f7/67/caf7677c71e8a7bf115c77ff8761fec5.jpg",
      },
    },
    {
      authorId: "user101",
      content:
        "This is a very long comment. This is a very long comment. This is a very long comment. This is a very long comment. This is a very long comment.",
      createdAt: "2024-10-26T00:00:00.000Z",
      author: {
        name: "Some name3",
      },
    },
  ],
  // Frontend-only data (would be populated after fetching)
  author: {
    name: "John Doe",
    profilePic:
      "https://i.pinimg.com/236x/93/27/52/932752831eb277a92480d9830b4c072d.jpg",
  },
  currentUser: {
    userId: "user123",
    firstName: "Jane",
    lastName: "Doe",
    profileUrl:
      "https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg",
    favouritePosts: ["tip123"],
    email: "jane@example.com",
  },
};

const TipContent = ({
  tipId,
  currentUser,
  title,
  content,
  author,
  createdAt,
  upvotes,
  downvotes,
  tags,
  ratings,
  comments,
}: TipProps) => {
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);
  const [localRatings, setLocalRatings] = useState<Rating[]>(ratings);
  const [isFavourited, setIsFavourited] = useState(
    currentUser?.favouritePosts.includes(tipId) ?? false,
  );
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [newCommentText, setNewCommentText] = useState('');

  // Calculate average rating
  const averageRating = localRatings.length > 0
    ? localRatings.reduce((acc, curr) => acc + curr.value, 0) / localRatings.length
    : 0;

  // Derive hasUpvoted and hasDownvoted from the data
  const hasUpvoted = Boolean(
    currentUser && localUpvotes.includes(currentUser.userId),
  );
  const hasDownvoted = Boolean(
    currentUser && localDownvotes.includes(currentUser.userId),
  );

  const handleUpvote = (isUpvoting: boolean) => {
    const userId = currentUser?.userId;
    if (!userId) return;

    setLocalUpvotes((prev) => {
      if (isUpvoting) {
        return [...prev, userId];
      } else {
        return prev.filter((id) => id !== userId);
      }
    });
    // Here you would make an API call to update the upvotes
  };

  const handleDownvote = (isDownvoting: boolean) => {
    const userId = currentUser?.userId;
    if (!userId) return;

    setLocalDownvotes((prev) => {
      if (isDownvoting) {
        return [...prev, userId];
      } else {
        return prev.filter((id) => id !== userId);
      }
    });
    // Here you would make an API call to update the downvotes
  };

  const handleFavourite = (isFavouriting: boolean) => {
    setIsFavourited(isFavouriting);
    // Here you would make an API call to update the user's favouritePosts array
  };

  const handleRatingSubmit = (newRating: number) => {
    const userId = currentUser?.userId;
    if (!userId) return;

    setLocalRatings(prev => {
      // Remove existing rating if any
      const filtered = prev.filter(rating => rating.raterId !== userId);
      // Add new rating
      return [...filtered, { value: newRating as 1 | 2 | 3 | 4 | 5, raterId: userId }];
    });
    // Here you would make an API call to update the ratings
  };

  const handleAddComment = () => {
    const userId = currentUser?.userId;
    if (!userId || !newCommentText.trim()) return;

    const newComment: Comment = {
      authorId: userId,
      content: newCommentText.trim(),
      createdAt: new Date().toISOString(),
      author: {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        profilePic: currentUser.profileUrl,
      },
    };

    setLocalComments(prev => [...prev, newComment]);
    setNewCommentText(''); // Clear input
    // Here you would make an API call to add the comment
  };

  return (
    <div id="tip-page-container" className="flex h-full flex-col items-center">
      <div id="tip-header-container" className="my-5 flex w-3/5">
        <a
          href="/"
          className="inline-block text-lg underline underline-offset-4"
        >
          &lt; Back to Home
        </a>

        <WelcomeIcon
          firstName="Jane"
          profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
        />
      </div>
      <div id="tip-post-container" className="flex w-1/2 flex-col">
        <div className="flex">
          <div className="ml-0 mr-auto inline-block w-4/5">
            <TipHeading>{title}</TipHeading>
          </div>
          <div className="my-auto ml-auto mr-0 inline-block w-1/5">
            <CommunityRating
              initialRating={averageRating}
              onRatingSubmit={handleRatingSubmit}
              readonly={!currentUser}
            />
          </div>
        </div>

        <PosterDetails
          name={author?.name || "Unknown"}
          profilePic={author?.profilePic}
          date={new Date(createdAt)}
        />

        <TipTags tags={tags} />

        <hr className="my-2" />
        <div>
          <p>{content}</p>
        </div>

        <div className="my-4 flex flex-row items-center">
          <div className="ml-0 mr-auto inline-block w-4/5">
            <UpvoteDownvote
              upvotes={localUpvotes.length}
              downvotes={localDownvotes.length}
              hasUpvoted={hasUpvoted}
              hasDownvoted={hasDownvoted}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          </div>
          <div className="ml-auto mr-0 inline-block w-1/5">
            <FavouriteButton
              hasFavourited={isFavourited}
              onFavourite={handleFavourite}
            />
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col justify-center">
        <div className="mb-8 ml-0 mr-auto inline-block w-4/5">
          <TipHeading>COMMENTS</TipHeading>
        </div>

        <div className="mb-6 rounded-[26px]">
          <textarea
            placeholder="Add a comment"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="mb-4 flex h-20 w-full rounded-[26px] border border-black p-5"
            disabled={!currentUser}
          />
          <button 
            onClick={handleAddComment}
            disabled={!currentUser || !newCommentText.trim()}
            className={`ml-auto flex rounded-[26px] border border-black pb-2 pl-5 pr-5 pt-2 text-white
              ${!currentUser || !newCommentText.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#63C779] hover:bg-[#518004]'
              }`}
          >
            Comment
          </button>
        </div>

        <div>
          {localComments.map((comment, index) => (
            <CommentBox
              key={`${comment.authorId}-${index}`}
              name={comment.author?.name || "Unknown"}
              text={comment.content}
              profilePic={comment.author?.profilePic}
              date={new Date(comment.createdAt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Tip = () => {
  // Spread the mock data as props
  return <TipContent {...mockTip} />;
};
