"use client";
import Card from "@/components/Card";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWRjZDAzYmYwMTg4NTRmNGY5MTZiY2ExMWRjMjNlNCIsIm5iZiI6MTcyNjYzODcxNy40MDcyMjEsInN1YiI6IjY2ZTg3ZTA0MDUwZjE0ZTRmY2QwMjVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Fg7v3z3WyG_eAtvXrZlZMpIuXWHfBxOAx3WTF6qYnk",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.length === 0 && loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} loading={true} />
          )) // Show 8 skeleton cards while loading
        : movies.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              image={movie.poster_path}
              loading={false} // Show the actual card when data is available
            />
          ))}
    </div>
  );
};

export default Page;
