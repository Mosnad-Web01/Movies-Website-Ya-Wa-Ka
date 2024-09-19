"use client";
import React, { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import MoviesTitle from "@/components/MoviesTitle";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day"); // Default to "day"

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`,
          options
        );

        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [timeWindow]); // Re-fetch when timeWindow changes

  return (
    <main className="min-h-screen container mx-auto">
      <header
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/coverImage.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 lg:leading-snug leading-snug max-w-[800px] w-full">
            Explore Top-Rated Films and Hidden Gems
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Whether you are a movie buff or just looking for something to watch tonight, explore our extensive collection of films.
          </p>
          <div className="flex gap-4">
            <a
              href="#explore"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Explore
            </a>
            <a
              href="#get-started"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <div className="px-4 my-8">
        {/* Pass setTimeWindow to update the time range */}
        <MoviesTitle setTimeWindow={setTimeWindow} />
        {/* Pass movies and loading state to Slider */}
        <Slider movies={movies} loading={loading} />
      </div>
    </main>
  );
};

export default Page;
