import InactiveFavouriteImage from "./favourite_icon_inactive.png";
import HoverFavouriteImage from "./favourite_icon_hover.png";
import ActiveFavouriteImage from "./favourite_icon_active.png";
import styles from "./index.module.css";

interface FavouriteButtonProps {
  hasFavourited: boolean;
  onFavourite: (isFavouriting: boolean) => void;
}

const FavouriteButton = ({ hasFavourited, onFavourite }: FavouriteButtonProps) => {
  const handleClick = () => {
    onFavourite(!hasFavourited);
  };

  return (
    <div 
      className={`flex flex-row items-center cursor-pointer ${styles.favouriteContainer}`}
      onClick={handleClick}
      data-favourited={hasFavourited}
    >
      <span
        className={`ml-auto mr-0 text-lg font-semibold ${styles.favouriteText}`}
        style={{ color: hasFavourited ? "#FFDD43" : "#555555" }}
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
          style={{ opacity: hasFavourited ? 1 : 0 }}
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
