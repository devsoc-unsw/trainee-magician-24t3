import { useThemeContext } from "../../contexts/ThemeContext";

interface ThemeToggleProps {
  onChange?: (isDeath: boolean) => void;
}

const ThemeToggle = ({ onChange }: ThemeToggleProps) => {
  const { isDeath, toggleTheme } = useThemeContext();

  const handleToggle = () => {
    toggleTheme();
    onChange?.(isDeath);
  };

  return (
    <div
      className={`relative h-10 w-32 cursor-pointer overflow-hidden rounded-lg border border-black p-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
        !isDeath ? "bg-[#63C779]" : "bg-[#F52A2A]"
      }`}
      onClick={handleToggle}
    >
      {/* Overlay */}
      <div
        className={`absolute left-0 top-0 z-10 h-full w-1/2 transform rounded-[6px] border border-black bg-white transition-transform duration-300 ease-in-out ${
          isDeath ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Text Container */}
      <div className="relative flex h-full">
        {/* DEATH Text */}
        <div className="flex w-1/2 items-center justify-center text-sm font-bold">
          DEATH
        </div>
        {/* LIFE Text */}
        <div className="flex w-1/2 items-center justify-center text-sm font-bold">
          LIFE
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle; 