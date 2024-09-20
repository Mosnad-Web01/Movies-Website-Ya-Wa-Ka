"use client";
import React, { useState, useEffect } from 'react';
import CustomPagination from './components/Pagination';
import MoviesCard from './components/MoviesCard';

const API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN;

const fetchMovies = async (filter, page) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${page}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; 
  }
};

const Page = () => {
  const [movies, setMovies] = useState([]); 
  const [filter, setFilter] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = await fetchMovies(filter, currentPage);
      setMovies(fetchedMovies);
      setTotalPages(10);
    };
    getMovies();
  }, [filter, currentPage]);

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-4 justify-center">
        {['popular', 'now_playing', 'upcoming', 'top_rated'].map((category) => (
          <button
            key={category}
            onClick={() => {
              setFilter(category);
              setCurrentPage(1); 
            }}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              filter === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-400`}
          >
            {category.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Full image URL
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      {/* Pagination Component */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Page;
