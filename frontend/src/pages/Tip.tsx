import { useState, useEffect } from "react";
import axios from "axios";
import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";
import CommentBox from "../components/CommentBox";
import WelcomeIcon from "../components/WelcomeIcon";
import PosterDetails from "../components/PosterDetails";
import UpvoteDownvote from "../components/UpvoteDownvote";
import TipTags from "../components/TipTags";
import FavouriteButton from "../components/FavouriteButton";
import { useThemeContext } from "../contexts/ThemeContext";
import { themeConfig } from "../config/theme.config";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Rating, Comment, TipData as TipProps } from "../types/tip";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const TipContent = ({
  tipId,
  currentUser,
  title,
  content,
  author,
  createdAt,
  upvotes = [],
  downvotes = [],
  tags = [],
  ratings = [],
  comments = [],
}: TipProps) => {
  const navigate = useNavigate();
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);
  const [localRatings, setLocalRatings] = useState<Rating[]>(ratings);
  const [isFavourited, setIsFavourited] = useState(
    currentUser?.favouritePosts?.includes(tipId) ?? false,
  );
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [newCommentText, setNewCommentText] = useState("");

  // Calculate average rating
  const averageRating =
    localRatings.length > 0
      ? localRatings.reduce((acc, curr) => acc + curr.value, 0) /
        localRatings.length
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

  const handleRatingSubmit = async (newRating: number) => {
    const userId = currentUser?.userId;
    if (!userId) return;

    setLocalRatings((prev) => {
      // Remove existing rating if any
      const filtered = prev.filter((rating) => rating.raterId !== userId);
      // Add new rating
      return [
        ...filtered,
        { value: newRating as 1 | 2 | 3 | 4 | 5, raterId: userId },
      ];
    });

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      await axios.post(`${API_URL}/tips/${userId}/rate`, {
        tipId: tipId,
        value: newRating,
      });

      toast.success("Rating submitted successfully!");
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating");
    }
  };

  const handleAddComment = async () => {
    const userId = currentUser?.userId;
    if (!userId || !newCommentText.trim()) return;

    try {
      // Make API call to add the comment
      await axios.post(`${API_URL}/tips/${tipId}/comment`, {
        userId,
        content: newCommentText.trim()
      });

      // Create new comment object for local state with full author info
      const newComment: Comment = {
        authorId: userId,
        content: newCommentText.trim(),
        createdAt: new Date().toISOString(),
        author: {
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          profilePic: currentUser.profileUrl,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName
        },
      };

      setLocalComments((prev) => [...prev, newComment]);
      setNewCommentText(""); // Clear input
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Failed to post comment:", error);
      
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to post comment: ${error.response.data.error}`);
      } else {
        toast.error("Failed to post comment. Please try again.");
      }
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${theme.background} ${theme.text}`}
    >
      <div
        id="tip-header-container"
        className="flex w-full max-w-[80ch] justify-between px-8 py-4"
      >
        <a
          href="/"
          className="inline-block text-lg underline underline-offset-4"
        >
          &lt; Back to Home
        </a>

        <WelcomeIcon />
      </div>
      <div
        id="tip-post-container"
        className="flex w-full max-w-[70ch] flex-col"
      >
        <div className="flex">
          <div className="ml-0 mr-auto inline-block w-4/5">
            <TipHeading isDeath={isDeath}>{title}</TipHeading>
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

      <div className="flex w-full max-w-[70ch] flex-col justify-center">
        <div className="mb-8 ml-0 mr-auto inline-block w-4/5">
          <TipHeading isDeath={isDeath}>COMMENTS</TipHeading>
        </div>

        <div className="mb-6 rounded-[26px]">
          <textarea
            placeholder="Add a comment"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className={`mb-4 flex h-20 w-full rounded-[26px] border p-5 ${theme.borderColor} ${theme.background} ${theme.text} ${theme.placeholder}`}
            disabled={!currentUser}
          />
          <button
            onClick={handleAddComment}
            disabled={!currentUser || !newCommentText.trim()}
            className={`ml-auto flex rounded-[26px] border pb-2 pl-5 pr-5 pt-2 text-white ${
              !currentUser || !newCommentText.trim()
                ? "cursor-not-allowed bg-gray-400"
                : `${theme.accent} hover:opacity-80`
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
  const { tipId } = useParams<{ tipId: string }>();
  const [tipData, setTipData] = useState<TipProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get the logged in user's data if available
        const userId = localStorage.getItem("userId");
        let userData = null;

        if (userId) {
          const userResponse = await axios.get(`${API_URL}/users/${userId}`);
          userData = {
            userId,
            firstName: userResponse.data.firstName,
            lastName: userResponse.data.lastName,
            profileUrl: userResponse.data.profileUrl,
            favouritePosts: userResponse.data.favouritePosts,
            email: userResponse.data.email,
          };
        }

        // Fetch the tip data (now includes author information)
        const tipResponse = await axios.get(`${API_URL}/tips/${tipId}`);
        
        const tipData = {
          ...tipResponse.data,
          tipId,
          currentUser: userData || undefined,
        };

        setTipData(tipData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load tip data");
      } finally {
        setIsLoading(false);
      }
    };

    if (tipId) {
      fetchData();
    } else {
      setError("No tip ID provided");
    }
  }, [tipId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tipData) {
    return <div>No tip data found</div>;
  }

  return <TipContent {...tipData} />;
};
