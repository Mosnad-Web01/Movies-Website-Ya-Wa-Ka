"use client"
import CardComponent from "@/components/Card"
import React, { useState, useEffect } from "react"
import { Pagination } from "@nextui-org/react"
import FilterSidebar from "./components/FilterSidebar"

const API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN

const fetchMovies = async (filter, page, filters) => {
  try {
    let url = `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${page}`

    
    if (filters.genre) {
      url += `&with_genres=${filters.genre}`
    }
    if (filters.releaseYear) {
      url += `&primary_release_year=${filters.releaseYear}`
    }
    if (filters.voteAverage) {
      url += `&vote_average.gte=${filters.voteAverage}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch movies")
    }
    const data = await response.json()
    return { results: data.results, total_pages: data.total_pages }
  } catch (error) {
    console.error("Error fetching movies:", error)
    return { results: [], total_pages: 0 }
  }
}


const Page = () => {
  const [movies, setMovies] = useState([])
  const [filter, setFilter] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [appliedFilters, setAppliedFilters] = useState({}) 

  useEffect(() => {
    const getMovies = async () => {
      const { results, total_pages } = await fetchMovies(
        filter,
        currentPage,
        appliedFilters 
      )
      setMovies(results)
      setTotalPages(total_pages)
    }
    getMovies()
  }, [filter, currentPage, appliedFilters])

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters) 
    setCurrentPage(1) 
  }
  

  return (
    <div className="flex flex-col lg:flex-row p-6">
      <div className="lg:w-64 mb-6 lg:mb-0 lg:mr-6">
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>


      <div className="flex-1">
        <div className="flex gap-4 mb-4 justify-center flex-wrap">
          {["popular", "now_playing", "upcoming", "top_rated"].map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category)
                setCurrentPage(1) 
              }}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                filter === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              {category.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-2  mb-6">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <CardComponent
                key={movie.id}
                title={movie.title || movie.name}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                date={movie.release_date}
                progress={movie.vote_average * 10}
                loading={false}
                customClass="w-full"
              />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
