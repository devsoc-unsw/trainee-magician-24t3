import LoginCard from "../components/LoginCard";
import { useThemeContext } from "../contexts/ThemeContext";
import { themeConfig } from "../config/theme.config";

export const Login = () => {
  const { isDeath } = useThemeContext();
  const theme = themeConfig[isDeath ? "death" : "life"];

  return (
    <div
      id="login-card-container"
      className={`flex h-full items-center justify-center ${theme.background}`}
    >
      <LoginCard />
    </div>
  );
};
