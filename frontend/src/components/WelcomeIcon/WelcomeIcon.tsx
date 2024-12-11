import { useThemeContext } from "../../contexts/ThemeContext";
import { themeConfig } from "../../config/theme.config";
import { Link } from "react-router-dom";

interface WelcomeIconProps {
  profilePic?: string;
  firstName?: string;
}

const WelcomeIcon = (props: WelcomeIconProps) => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];

  // If no user data is provided, show login link
  if (!props.firstName) {
    return (
      <Link to="/login" className="flex">
        <div className="mr-4">
          <span className={`text-lg ${theme.text}`}>Welcome, Guest</span>
          <br />
          <span className={`text-sm ${theme.secondaryText} underline`}>
            Login / Register
          </span>
        </div>
        <img
          src="https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
          className="mb-2 h-16 w-16 rounded-full"
          alt="Default profile"
        />
      </Link>
    );
  }

  // Show user data if available
  return (
    <Link to="/profile" className="flex">
      <div className="mr-4">
        <span className={`text-lg ${theme.text}`}>Welcome, {props.firstName}</span>
        <br />
        <span className={`text-sm ${theme.secondaryText} underline`}>
          See profile
        </span>
      </div>
      <img
        src={
          props.profilePic ||
          "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
        }
        className="mb-2 h-16 w-16 rounded-full"
        alt={`${props.firstName}'s profile`}
      />
    </Link>
  );
};

export default WelcomeIcon;
