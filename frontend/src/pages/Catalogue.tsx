import WelcomeIcon from "../components/WelcomeIcon";
import logo from "../assets/logo.svg";
import { useThemeContext } from "../contexts/ThemeContext";
import { themeConfig } from "../config/theme.config";
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { useNavigate } from "react-router-dom";
import TipsGrid from "../components/TipsGrid/TipsGrid";
import { TipData } from "../types/tip";
import debounce from "lodash/debounce";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const Catalogue = () => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];
  const [isLoading, setIsLoading] = useState(true);
  const [allTips, setAllTips] = useState<TipData[]>([]);
  const [filteredTips, setFilteredTips] = useState<TipData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      setIsLoading(true);
      try {
        const type = isDeath ? "DEATH" : "LIFE";
        const response = await axios.get(`${API_URL}/tips?type=${type}`);
        const fetchedTips = response.data.tips;
        setAllTips(fetchedTips);
        setFilteredTips(fetchedTips);
      } catch (error) {
        console.error("Failed to fetch tips:", error);
        setError("Failed to load tips");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, [isDeath]);

  const filterTips = useCallback((searchTerm: string) => {
    const filtered = allTips.filter(tip => 
      tip.title.toLowerCase().includes(searchTerm) ||
      tip.description.toLowerCase().includes(searchTerm) ||
      tip.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      tip.author?.name?.toLowerCase().includes(searchTerm)
    );
    setFilteredTips(filtered);
  }, [allTips]);

  const debouncedFilterTips = useMemo(
    () => debounce(filterTips, 500),
    [filterTips]
  );

  useEffect(() => {
    return () => {
      debouncedFilterTips.cancel();
    };
  }, [debouncedFilterTips]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    debouncedFilterTips(term);
  };

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
              placeholder="Search tips..."
              value={searchTerm}
              onChange={handleSearch}
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
      </div>

      {/* Grid Layout */}
      <div className="mx-auto max-w-7xl px-8">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className={theme.text}>Loading...</div>
          </div>
        ) : (
          <TipsGrid tips={filteredTips} isDeath={isDeath} />
        )}
      </div>
    </div>
  );
};
