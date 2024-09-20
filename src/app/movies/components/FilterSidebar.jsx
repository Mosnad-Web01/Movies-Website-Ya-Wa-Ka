import React, { useState } from "react"

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
]

const FilterSidebar = ({ onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = useState("")
  const [releaseYear, setReleaseYear] = useState("")
  const [voteAverage, setVoteAverage] = useState(0)

  const handleFilterSubmit = () => {
    onFilterChange({
      genre: selectedGenre,
      releaseYear,
      voteAverage,
    })
  }

  return (
    <div className="w-full lg:w-64 bg-gray-100 p-4 rounded-lg shadow-md mb-6 lg:mb-0">
      <h3 className="text-lg font-semibold mb-4">Filter Movies</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Release Year</label>
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter year"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (Minimum)</label>
        <input
          type="number"
          value={voteAverage}
          onChange={(e) => setVoteAverage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Vote Average"
        />
      </div>
      <button
  onClick={handleFilterSubmit}
  className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
>
  Apply Filters
</button>

    </div>
  )
}

export default FilterSidebar
