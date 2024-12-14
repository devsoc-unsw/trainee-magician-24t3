import { Theme } from "../hooks/useTheme";

export const themeConfig: Record<
  Theme,
  {
    background: string;
    text: string;
    border: string;
    accent: string;
    hoverAccent: string;
    accentText: string;
    placeholder: string;
    borderColor: string;
    secondaryText: string;
    rating: {
      active: string;
      inactive: string;
      hover: string;
    };
  }
> = {
  life: {
    background: "bg-white",
    text: "text-black",
    border: "border-[#63C779]",
    accent: "bg-[#63C779]",
    hoverAccent: "hover:bg-[#63C779]",
    accentText: "text-[#63C779]",
    placeholder: "placeholder-gray-400",
    borderColor: "border-gray-300",
    secondaryText: "text-gray-500",
    rating: {
      active: "bg-[#63C779]",
      inactive: "bg-white",
      hover: "bg-[#FFDD43]",
    },
  },
  death: {
    background: "bg-[#222222]",
    text: "text-white",
    border: "border-[#F52A2A]",
    accent: "bg-[#F52A2A]",
    hoverAccent: "hover:bg-[#F52A2A]",
    accentText: "text-[#F52A2A]",
    placeholder: "placeholder-gray-500",
    borderColor: "border-gray-700",
    secondaryText: "text-gray-400",
    rating: {
      active: "bg-[#F52A2A]",
      inactive: "bg-[#878080]",
      hover: "bg-[#FFDD43]",
    },
  },
};

export type ThemeConfig = typeof themeConfig;
