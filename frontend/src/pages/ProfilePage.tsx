import { useState, useEffect } from "react";
import GridCard from "../components/GridCard/GridCard";
import { Link } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContext";
import { themeConfig } from "../config/theme.config";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import toast from 'react-hot-toast';

const lifeTips = Array(9).fill({
  title: "Drink Water Everyday",
  tags: ["health", "drink"],
  rating: 3.5,
  description:
    "Study shows that everyone who drinks water everyday lives longer than those who never drinks.",
});

const deathTips = Array(9).fill({
  title: "Drink Water Everyday",
  tags: ["health", "drink"],
  rating: 3.5,
  description:
    "Study shows that everyone who drinks water everyday lives longer than those who never drinks.",
});

export const ProfilePage = () => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];

  const profilePic =
    "https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg";

  const [userInfo, setUserInfo] = useState({
    username: "SomeCoolUsername101",
    fullName: "Random Person",
    email: "random.person789@gmail.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState({ ...userInfo });

  const [showingDeathTips, setShowingDeathTips] = useState(isDeath);

  useEffect(() => {
    setShowingDeathTips(isDeath);
  }, [isDeath]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setUserInfo({ ...editInfo });
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditInfo({ ...userInfo });
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipsThemeChange = (newIsDeath: boolean) => {
    setShowingDeathTips(newIsDeath);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    toast.success('Logout successful!');
  };

  const InfoRow = ({
    label,
    value,
    isEditing,
    name,
    onChange,
  }: {
    label: string;
    value: string;
    isEditing: boolean;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        <div className="flex justify-between">
          <h2 className={`mb-6 text-2xl font-bold ${theme.text}`}>Profile</h2>
          <button 
            className="w-24 h-10 rounded-lg bg-blue-500 text-white hover:bg-blue-600 mr-20"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        

          <div className="space-y-4">
            <InfoRow
              label="Username"
              value={isEditing ? editInfo.username : userInfo.username}
              isEditing={isEditing}
              name="username"
              onChange={handleChange}
            />
            <InfoRow
              label="Full Name"
              value={isEditing ? editInfo.fullName : userInfo.fullName}
              isEditing={isEditing}
              name="fullName"
              onChange={handleChange}
            />
            <InfoRow
              label="Email"
              value={isEditing ? editInfo.email : userInfo.email}
              isEditing={isEditing}
              name="email"
              onChange={handleChange}
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
          {(showingDeathTips ? deathTips : lifeTips).map((tip, index) => (
            <Link to="/tip" key={index} className="scale-90 transform">
              <GridCard
                title={tip.title}
                tags={tip.tags}
                rating={tip.rating}
                description={tip.description}
                isDeath={showingDeathTips}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
