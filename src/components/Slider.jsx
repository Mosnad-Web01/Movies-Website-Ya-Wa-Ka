import React from "react";
import MoviesTitle from "./MoviesTitle";
import CardComponent from "@/components/Card";

const Slider = ({ movies = [], loading }) => {
  return (
    <>
      <div className="mx-auto container overflow-x-auto whitespace-nowrap p-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-blue-900 scrollbar-track-blue-100">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CardComponent key={index} loading={true} />
          )) // Show 8 skeleton cards while loading
        ) : movies.length > 0 ? ( // Ensure movies array is not empty
          movies.map((movie) => (
            <CardComponent
              key={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use the TMDB image URL with the correct path
              progress={movie.vote_average * 10} // Display vote average as percentage
              loading={false} // Show the actual card when data is available
            />
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </>
  );
};

export default Slider;
