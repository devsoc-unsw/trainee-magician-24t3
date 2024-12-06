import InactiveFavouriteImage from "./favourite_icon_inactive.png";
import HoverFavouriteImage from "./favourite_icon_hover.png";
import ActiveFavouriteImage from "./favourite_icon_active.png";
import styles from "./index.module.css";
import { useState } from "react";

interface FavouriteButtonProps {
  hasFavourited?: boolean;
  onFavourite?: () => void;
}

const FavouriteButton = ({ hasFavourited = false, onFavourite }: FavouriteButtonProps) => {
  const [isFavourited, setFavouriteState] = useState(hasFavourited);

  const toggleFavourited = () => {
    setFavouriteState(!isFavourited);
    if (onFavourite) {
      onFavourite();
    }
  };

  return (
    <div 
      className={`flex flex-row items-center cursor-pointer ${styles.favouriteContainer}`}
      onClick={toggleFavourited}
      data-favourited={isFavourited}
    >
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
        />
        <img
          src={ActiveFavouriteImage}
          alt="favourite icon"
          className={`mr-0 ${styles.favouriteButton} ${styles.overlayFavouriteButton}`}
          style={{ opacity: isFavourited ? 1 : 0 }}
        />
        <img
          src={HoverFavouriteImage}
          alt="favourite icon"
          className={`mr-0 ${styles.favouriteButton} ${styles.overlayFavouriteButton} ${styles.hoverFavouriteButton}`}
        />
      </div>
    </div>
  );
};

export default FavouriteButton;
