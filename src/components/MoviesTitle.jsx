"use client";

import { useState } from "react";

const MoviesTitle = ({ setTimeWindow }) => {
  const [activeButton, setActiveButton] = useState("day"); // State to track the active button

  const handleTimeWindowChange = (window) => {
    setActiveButton(window);
    setTimeWindow(window); // Notify parent to change the time window
  };

  return (
    <div className="p-6 flex gap-4">
      <h1 className="text-3xl font-bold">Trending Movies</h1>
      <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
        <button
          onClick={() => handleTimeWindowChange("day")}
          className={`px-6 py-2 transition-colors duration-200 ${
            activeButton === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-400 focus:outline-none`}
        >
          Today
        </button>
        <div className="border-l border-gray-300"></div> {/* Divider between buttons */}
        <button
          onClick={() => handleTimeWindowChange("week")}
          className={`px-6 py-2 transition-colors duration-200 ${
            activeButton === "week"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-400 focus:outline-none`}
        >
          This Week
        </button>
      </div>
    </div>
  );
};

export default MoviesTitle;
