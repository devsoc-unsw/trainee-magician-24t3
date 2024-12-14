import { useState, useEffect } from "react";
import GridCard from "../components/GridCard/GridCard";
import { useThemeContext } from "../contexts/ThemeContext";
import { themeConfig, type ThemeConfig } from "../config/theme.config";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import axios from "axios";
import { TipData } from "../types/tip";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UserData {
  firstName: string;
  lastName: string;
  profileUrl?: string;
  email: string;
  favouritePosts: string[];
}

const InfoRow = ({
  label,
  value,
  isEditing,
  name,
  onChange,
  theme,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  name: string;
  theme: ThemeConfig[keyof ThemeConfig];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex h-8 items-center">
    <p className={`w-32 ${theme.text}`}>{label}</p>
    {isEditing ? (
      <input
        type={name === "email" ? "email" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        className={`ml-2 h-8 w-[300px] rounded-lg ${theme.borderColor} ${theme.background} ${theme.text} px-3 focus:border-gray-500 focus:outline-none`}
      />
    ) : (
      <div className={`ml-2 h-8 w-[300px] rounded-lg ${theme.accent} px-3`}>
        <p className={`flex h-full items-center ${theme.text}`}>{value}</p>
      </div>
    )}
  </div>
);

export const ProfilePage = () => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [tipData, setTipData] = useState<TipData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userResponse = await axios.get(`${API_URL}/users/${userId}`);
        const userData = userResponse.data;

        setUserInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileUrl: userData.profileUrl,
          email: userData.email,
          favouritePosts: userData.favouritePosts || [],
        });

        setEditFirstName(userData.firstName);
        setEditLastName(userData.lastName);
        setEditEmail(userData.email);

        const favList = userData?.favouritePosts || [];
        if (favList.length > 0) {
          const fetchedTips = await Promise.all(
            favList.map(async (tipId: string) => {
              try {
                const tipResponse = await axios.get(`${API_URL}/tips/${tipId}`);
                return tipResponse.data;
              } catch (err) {
                console.error(`Error fetching tip ${tipId}:`, err);
                return null;
              }
            }),
          );
          setTipData(fetchedTips.filter((tip) => tip !== null));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const profilePic =
    "https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg";

  const [showingDeathTips, setShowingDeathTips] = useState(isDeath);

  useEffect(() => {
    setShowingDeathTips(isDeath);
  }, [isDeath]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    if (!editFirstName || !editLastName || !editEmail) {
      toast.error("All fields are required");
      return;
    }
    
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first");
      navigate("/");
      return;
    }

    try {
      // Update backend
      await axios.put(`${API_URL}/users/${userId}`, {
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
      });

      // Update local state
      setUserInfo({
        firstName: editFirstName,
        lastName: editLastName,
        profileUrl: userInfo?.profileUrl || '',
        email: editEmail,
        favouritePosts: userInfo?.favouritePosts || [],
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update profile. Please try again.");
      // Reset to previous values on error
      if (userInfo) {
        setEditFirstName(userInfo.firstName);
        setEditLastName(userInfo.lastName);
        setEditEmail(userInfo.email);
      }
    }
  };
  const handleCancel = () => {
    if (userInfo) {
      setEditFirstName(userInfo.firstName);
      setEditLastName(userInfo.lastName);
      setEditEmail(userInfo.email);
    }
    setIsEditing(false);
  };

  const handleTipsThemeChange = (newIsDeath: boolean) => {
    setShowingDeathTips(newIsDeath);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
    toast.success("Logout successful!");
  };

  if (!isLoading) {
    return (
      <div className={`min-h-screen ${theme.background}`}>
        {/* Personal Info Section */}
        <div
          className={`flex w-full items-center border-b ${theme.border} ${theme.accent} p-8`}
        >
          {/* Profile Image */}
          <div className="flex w-1/3">
            <div className="flex-1"></div>
            <img
              src={profilePic}
              alt="Profile"
              className="h-48 w-48 rounded-full object-cover"
            />
          </div>

          {/* Profile Information */}
          <div className="ml-12 w-2/3">
            <h2 className={`mb-6 text-2xl font-bold ${theme.text}`}>Profile</h2>
            <div className="space-y-4">
              <InfoRow
                label="First Name"
                value={isEditing ? editFirstName : (userInfo?.firstName ?? '')}
                isEditing={isEditing}
                name="firstName"
                onChange={(e) => setEditFirstName(e.target.value)}
                theme={theme}
              />
              <InfoRow
                label="Last Name"
                value={isEditing ? editLastName : (userInfo?.lastName ?? '')}
                isEditing={isEditing}
                name="lastName"
                onChange={(e) => setEditLastName(e.target.value)}
                theme={theme}
              />
              <InfoRow
                label="Email"
                value={isEditing ? editEmail : (userInfo?.email ?? '')}
                isEditing={isEditing}
                name="email"
                onChange={(e) => setEditEmail(e.target.value)}
                theme={theme}
              />

              {/* Action Buttons */}
              {isEditing ? (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleSave}
                    className={`rounded-lg ${isDeath ? "bg-[#F52A2A]" : "bg-[#14161c]"} px-6 py-2 text-sm font-bold text-white transition-colors hover:opacity-80`}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`rounded-lg ${theme.background} px-6 py-2 text-sm font-bold ${theme.text} transition-colors hover:opacity-80`}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className={`mt-6 flex items-center rounded-lg ${isDeath ? "bg-[#F52A2A]" : "bg-[#14161c]"} px-6 py-2 text-sm font-bold text-white transition-transform hover:scale-105`}
                >
                  <img
                    src="https://www.citypng.com/public/uploads/preview/hd-white-angle-pencil-icon-png-701751695040455ni7fjxt6ug.png"
                    alt="Edit Icon"
                    className="mr-2 h-4 w-4"
                  />
                  EDIT PROFILE
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <ThemeToggle onChange={handleTipsThemeChange} />
          </div>

          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <p className={`mb-2 ${theme.text}`}>Tips Created</p>
              <div
                className={`h-1.5 w-36 rounded-full ${showingDeathTips ? "bg-gray-700" : "bg-gray-300"}`}
              ></div>
            </div>
            <div className="text-center">
              <p className={`mb-2 ${theme.text}`}>Tips Saved</p>
              <div
                className={`h-1.5 w-36 rounded-full ${showingDeathTips ? theme.accent : theme.accent}`}
              ></div>
            </div>
          </div>

          {/* Grid Cards */}
          <div className="mt-8 grid grid-cols-3 gap-4 px-4">
            {tipData
              .filter((tip) =>
                showingDeathTips ? tip.type === "DEATH" : tip.type == "LIFE",
              )
              .map((tip) => (
                <div
                  key={tip.tipId}
                  className="cursor-pointer transition-transform hover:-translate-y-1"
                  onClick={() => (window.location.href = `/tip/${tip.tipId}`)}
                >
                  <GridCard
                    title={tip.title}
                    tags={tip.tags}
                    rating={
                      tip.ratings?.reduce((acc, curr) => acc + curr.value, 0) /
                        (tip.ratings?.length || 1) || 0
                    }
                    description={tip.description}
                    isDeath={isDeath}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
};
