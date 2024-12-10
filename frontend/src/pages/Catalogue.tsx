import { useState } from "react";
import GridCard from "../components/GridCard";
import WelcomeIcon from "../components/WelcomeIcon";
import logo from "../assets/logo.svg";
// Mock data for tips
const lifeTips = Array(9).fill({
  title: "Drink water everyday",
  tags: ["#tags", "#tags", "#tags"],
  rating: 3,
  description: "study shows that everyone who drinks water die in the end.",
});

const deathTips = Array(9).fill({
  title: "Drink water everyday",
  tags: ["#tags", "#tags", "#tags"],
  rating: 3,
  description: "study shows that everyone who drinks water die in the end.",
});

export const Catalogue = () => {
  const [isLifeMode, setIsLifeMode] = useState(true);

  return (
    <div
      className={`min-h-screen ${!isLifeMode ? "bg-[#222222]" : "bg-white"}`}
    >
      {/* Header */}
      <div className="flex items-center px-8 py-4">
        {/* Left section */}
        <div className="w-1/4">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        {/* Center section */}
        <div className="flex w-1/2 justify-center">
          {/* Theme Toggle */}
          <div
            className={`relative h-10 w-32 cursor-pointer overflow-hidden rounded-lg border border-black p-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
              isLifeMode ? "bg-[#63C779]" : "bg-[#F52A2A]"
            }`}
            onClick={() => setIsLifeMode(!isLifeMode)}
          >
            {/* Overlay */}
            <div
              className={`absolute left-0 top-0 z-10 h-full w-1/2 transform rounded-[6px] border border-black bg-white transition-transform duration-300 ease-in-out ${
                !isLifeMode ? "translate-x-full" : "translate-x-0"
              }`}
            />

            {/* Text Container */}
            <div className="relative flex h-full">
              {/* DEATH Text */}
              <div
                className={`flex w-1/2 items-center justify-center text-sm font-bold`}
              >
                DEATH
              </div>
              {/* LIFE Text */}
              <div
                className={`flex w-1/2 items-center justify-center text-sm font-bold`}
              >
                LIFE
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex w-1/4 justify-end">
          <WelcomeIcon
            firstName="Jane"
            profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-auto my-8 flex w-3/4 max-w-3xl flex-col">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`w-full rounded-lg border px-6 py-3 outline-none ${
              !isLifeMode
                ? "border-gray-700 bg-[#222222] text-white placeholder-gray-500"
                : "border-gray-300 bg-white text-black placeholder-gray-400"
            } `}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            🔍
          </button>
        </div>
        <button
          className={`ml-4 mt-2 text-left text-sm hover:underline ${!isLifeMode ? "text-gray-400" : "text-gray-500"} `}
        >
          Add Filter
        </button>
      </div>

      {/* Grid Layout */}
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(isLifeMode ? lifeTips : deathTips).map((tip, index) => (
            <div
              key={index}
              className="cursor-pointer transition-transform hover:-translate-y-1"
              onClick={() => (window.location.href = "/tip")}
            >
              <GridCard
                title={tip.title}
                tags={tip.tags}
                rating={tip.rating}
                description={tip.description}
                isDeath={!isLifeMode}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
