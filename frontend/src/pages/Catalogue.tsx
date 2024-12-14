import GridCard from "../components/GridCard";
import WelcomeIcon from "../components/WelcomeIcon";
import logo from "../assets/logo.svg";
import { useThemeContext } from "../contexts/ThemeContext";
import { themeConfig } from "../config/theme.config";
import { useState, useEffect } from "react";
import axios from "axios";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { useNavigate } from "react-router-dom";

// Mock data for tips
// const lifeTips = Array(9).fill({
//   title: "Drink water everyday",
//   tags: ["#tags", "#tags", "#tags"],
//   rating: 3,
//   description: "study shows that everyone who drinks water die in the end.",
// });

// const deathTips = Array(9).fill({
//   title: "Drink water everyday",
//   tags: ["#tags", "#tags", "#tags"],
//   rating: 3,
//   description: "study shows that everyone who drinks water die in the end.",
// });

interface TipData {
  tipId: string;
  title: string;
  type: "LIFE" | "DEATH";
  description: string;
  tags: string[];
  ratings: Array<{ value: number; raterId: string }>;
  content: string;
  authorId: string;
  createdAt: number;
  upvotes: string[];
  downvotes: string[];
  comments: Array<{ authorId: string; content: string; createdAt: number }>;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const Catalogue = () => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];
  const [isLoading, setIsLoading] = useState(true);
  const [tips, setTips] = useState<TipData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      setIsLoading(true);
      try {
        const tipsResponse = await axios.get(`${API_URL}/tips/`);
        const filteredTips = tipsResponse.data.tips.filter((tip: TipData) =>
          isDeath ? tip.type === "DEATH" : tip.type === "LIFE"
        );
        setTips(filteredTips);
      } catch (error) {
        console.error("Failed to fetch tips:", error);
        setError("Failed to load tips");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, [isDeath]);

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${theme.background} flex items-center justify-center`}
      >
        <div className={theme.text}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${theme.background} flex items-center justify-center`}
      >
        <div className={`${theme.text} text-red-500`}>{error}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Header */}
      <div className="flex items-center px-8 py-4">
        {/* Left section */}
        <div className="w-1/4">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        {/* Center section */}
        <div className="flex w-1/2 justify-center">
          <ThemeToggle />
        </div>

        {/* Right section */}
        <div className="flex w-1/4 items-center justify-end gap-4">
          <WelcomeIcon />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-auto my-8 flex w-3/4 max-w-3xl flex-col">
        <div className="flex gap-2">
          <div className="relative w-full flex-1">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full rounded-lg border px-6 py-3 outline-none ${theme.background} ${theme.text} ${theme.placeholder} ${theme.borderColor}`}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              🔍
            </button>
          </div>
          <button
            onClick={() => navigate("/create-tip")}
            className={`rounded-lg px-4 py-2 ${theme.text} border ${theme.borderColor} transition-all duration-200 ${theme.hoverAccent}`}
          >
            New Tip
          </button>
        </div>
        <button
          className={`ml-4 mt-2 text-left text-sm hover:underline ${theme.secondaryText}`}
        >
          Add Filter
        </button>
      </div>

      {/* Grid Layout */}
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
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
};
