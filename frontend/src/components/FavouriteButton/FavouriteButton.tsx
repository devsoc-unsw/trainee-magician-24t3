import { AiFillStar } from "react-icons/ai";
import styles from "./index.module.css";

interface FavouriteButtonProps {
  hasFavourited: boolean;
  onFavourite: (isFavouriting: boolean) => void;
}

const FavouriteButton = ({
  hasFavourited,
  onFavourite,
}: FavouriteButtonProps) => {
  const handleClick = () => {
    onFavourite(!hasFavourited);
  };

  return (
    <div
      className={`flex cursor-pointer flex-row items-center ${styles.favouriteContainer}`}
      onClick={handleClick}
      data-favourited={hasFavourited}
    >
      <span
        className={`ml-auto mr-2 text-lg font-semibold ${styles.favouriteText} ${hasFavourited ? "text-[#FFDD43]" : "text-gray-500"}`}
      >
        Favourite
      </span>
      <AiFillStar
        className={`h-8 w-8 transition-colors duration-200`}
        style={{
          color: hasFavourited ? "#FFDD43" : "#6b7280",
        }}
      />
    </div>
  );
};

export default FavouriteButton;
