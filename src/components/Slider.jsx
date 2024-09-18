// components/Slider.js

import React from "react";
import CardComponent from "@/components/Card";

const Slider = ({ movies, loading }) => {
  return (
    <div  className="mx-auto container overflow-x-auto whitespace-nowrap p-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar scrollbar-thumb-blue-900 scrollbar-track-blue-100">
      {movies.length === 0 && loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <CardComponent key={index} loading={true} />
          )) // Show 8 skeleton cards while loading
        : movies.map((movie) => (
            <CardComponent
              key={movie.id}
              title={movie.title}
              image={movie.poster_path}
              progress={movie.vote_average * 10}
              loading={false} // Show the actual card when data is available
            />
          ))}
    </div>
  );
};

export default Slider;
