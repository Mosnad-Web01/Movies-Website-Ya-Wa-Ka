// app/page.js

"use client";
import React, { useEffect, useState } from "react";
import Slider from "@/components/Slider";

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
  <>

    <div className="px-4">
      <Slider movies={movies} loading={loading} />
    </div>

    <div className="px-4">
      <Slider movies={movies} loading={loading} />
    </div>
  </>
  );
};

export default Page;
