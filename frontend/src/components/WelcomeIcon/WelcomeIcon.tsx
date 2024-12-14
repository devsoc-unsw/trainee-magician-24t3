import { useThemeContext } from "../../contexts/ThemeContext";
import { themeConfig } from "../../config/theme.config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../../types/user";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const WelcomeIcon = () => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`${API_URL}/users/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // If no user data is available, show login link
  if (!userData) {
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
        <span className={`text-lg ${theme.text}`}>Welcome, {userData.firstName}</span>
        <br />
        <span className={`text-sm ${theme.secondaryText} underline`}>
          See profile
        </span>
      </div>
      <img
        src={
          userData.profileUrl ||
          "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
        }
        className="mb-2 h-16 w-16 rounded-full"
        alt={`${userData.firstName}'s profile`}
      />
    </Link>
  );
};

export default WelcomeIcon;
