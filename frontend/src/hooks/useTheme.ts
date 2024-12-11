import { useState, useEffect } from "react";

export type Theme = "life" | "death";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme exists in localStorage, default to "life"
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "life";
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "life" ? "death" : "life"));
  };

  const isDeath = theme === "death";

  return { theme, isDeath, toggleTheme };
}; 