import { useState } from "react";
import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";
import CommentBox from "../components/CommentBox";
import WelcomeIcon from "../components/WelcomeIcon";
import PosterDetails from "../components/PosterDetails";
import UpvoteDownvote from "../components/UpvoteDownvote";
import TipTags from "../components/TipTags";
import FavouriteButton from "../components/FavouriteButton/FavouriteButton";

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
  id: string;
  title: string;
  type: "DEATH OR LIFE"; // Can be expanded to include other types if needed
  authorId: string;
  tags: string[];
  ratings: Rating[];
  description: string;
  upvotes: string[]; // Array of user IDs
  downvotes: string[]; // Array of user IDs
  createdAt: string;
  content: string;
  comments: Comment[];
  // Additional frontend-only properties after fetching
  author?: {
    name: string;
    profilePic: string;
  };
  currentUser?: {
    firstName: string;
    lastName: string;
    profileUrl: string;
    favouritePosts: string[];
    email: string;
  };
}

// Update mock data to match new structure
const mockTip: TipProps = {
  id: "tip123",
  title: "This is my tip hello hello hello hello",
  type: "DEATH OR LIFE",
  authorId: "user123",
  description: "A sample tip description",
  upvotes: ["user1", "user2", "user3", "user4", "user5"],
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
    firstName: "Jane",
    lastName: "Doe",
    profileUrl: "https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg",
    favouritePosts: ["tip123"], // Include the current tip ID to show it's favorited
    email: "jane@example.com"
  }
};

const TipContent = ({
  id,
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
  const [localUpvotes, setLocalUpvotes] = useState(upvotes.length);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes.length);
  const averageRating =
    ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;
  const [isFavourited, setIsFavourited] = useState(
    currentUser?.favouritePosts.includes(id) ?? false
  );

  const handleUpvote = (isUpvoting: boolean) => {
    setLocalUpvotes((prev) => prev + (isUpvoting ? 1 : -1));
    // Here you would make an API call to update the upvotes
  };

  const handleDownvote = (isDownvoting: boolean) => {
    setLocalDownvotes((prev) => prev + (isDownvoting ? 1 : -1));
    // Here you would make an API call to update the downvotes
  };

  const handleFavourite = () => {
    setIsFavourited(!isFavourited);
    // Here you would make an API call to update the user's favouritePosts array
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
            <CommunityRating initialRating={averageRating} />
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
              upvotes={localUpvotes}
              downvotes={localDownvotes}
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
            className="mb-4 flex h-20 w-full rounded-[26px] border border-black p-5"
          ></textarea>
          <button className="ml-auto flex rounded-[26px] border border-black bg-[#63C779] pb-2 pl-5 pr-5 pt-2 text-white hover:bg-[#518004]">
            Comment
          </button>
        </div>

        <div>
          {comments.map((comment) => (
            <CommentBox
              key={comment.authorId}
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
