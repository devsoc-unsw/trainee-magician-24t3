import InactiveFavouriteImage from "./favourite_icon_inactive.png";
import HoverFavouriteImage from "./favourite_icon_hover.png";
import ActiveFavouriteImage from "./favourite_icon_active.png";
import styles from "./index.module.css";
import { useState } from "react";

interface FavouriteButtonProps {
  hasFavourited?: boolean;
}

const FavouriteButton = (props: FavouriteButtonProps) => {
  const [isFavourited, setFavouriteState] = useState(
    props.hasFavourited ?? false,
  );

  const toggleFavourited = () => {
    setFavouriteState(!isFavourited);
  };

  return (
    <div className="flex flex-row items-center border border-green-400">
      <span
        className={`ml-auto mr-0 text-lg font-semibold ${styles.favouriteText}`}
        style={{ color: isFavourited ? "#FFDD43" : "#555555" }}
      >
        Favourite
      </span>
      <div className={styles.imageBox}>
        <img
          src={InactiveFavouriteImage}
          alt="favourite icon"
          className={`mr-0 ${styles.favouriteButton}`}
          onClick={toggleFavourited}
        />
        <img
          src={ActiveFavouriteImage}
          alt="favourite icon"
          className={`mr-0 ${styles.favouriteButton} ${styles.overlayFavouriteButton}`}
          style={{ opacity: isFavourited ? 1 : 0 }}
          onClick={toggleFavourited}
        />
        <img
          src={HoverFavouriteImage}
          alt="favourite icon"
          className={`mr-0 ${styles.favouriteButton} ${styles.overlayFavouriteButton} ${styles.hoverFavouriteButton}`}
          onClick={toggleFavourited}
        />
      </div>
    </div>
  );
};

export default FavouriteButton;
