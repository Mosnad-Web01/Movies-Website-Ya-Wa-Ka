"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import CardComponent from "@/components/Card";
import { Spinner } from "@nextui-org/react"; 

// Social Media Base URLs
const socialMediaBaseUrls = {
  twitter: "https://x.com/",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/@",
  youtube: "https://www.youtube.com/user/",
};

// Modal Component for Movie Details
const MovieDetailsModal = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-  text-gray-900 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6 max-w-lg w-full relative transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          &times;
        </button>
        <div className="flex">
          <div className="w-1/3">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={150}
              height={225}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-2/3 pl-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Rating: {movie.vote_average} / 10
            </p>
            <p className="mt-4 text-gray-800 dark:text-gray-200">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fetch details of an actor by ID from TMDB API
const fetchActorDetails = async (id) => {
  try {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=movie_credits`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch actor details");
    }
    const data = await response.json();
    return data; // Return the actor details
  } catch (error) {
    console.error("Error fetching actor details:", error);
    return null; // Return null if there's an error
  }
};

const ActorDetails = ({ params }) => {
  const { id } = params;
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadActor = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchActorDetails(id);
        setActor(data);
      } catch (error) {
        setError("Failed to load actor details.");
        console.error("Error fetching actor details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadActor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!actor) return null;

  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,
    known_for_department,
    movie_credits,
    social_media = {},
    also_known_as = [],
  } = actor;

  const socialMediaLinks = {
    twitter:
      social_media.twitter && social_media.twitter.trim()
        ? socialMediaBaseUrls.twitter + social_media.twitter.split("/").pop()
        : " ",
    instagram:
      social_media.instagram && social_media.instagram.trim()
        ? socialMediaBaseUrls.instagram +
          social_media.instagram.split("/").pop()
        : " ",
    facebook:
      social_media.facebook && social_media.facebook.trim()
        ? socialMediaBaseUrls.facebook + social_media.facebook.split("/").pop()
        : " ",
    youtube:
      social_media.youtube && social_media.youtube.trim()
        ? socialMediaBaseUrls.youtube + social_media.youtube.split("/").pop()
        : " ",
  };

  const handleMovieDetailClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const movies = movie_credits.cast;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-100 dark:text-gray-900 min-h-screen">
      <section className="relative bg-gray-800 dark:bg-gray-200 rounded-lg shadow-lg overflow-hidden mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${profile_path}')`,
          }}
        >
          <div className="absolute inset-0 bg-black dark:bg-white opacity-70"></div>
        </div>
        <div className="relative flex flex-col md:flex-row gap-6 p-6">
          {/* Left Side */}
          <div className="md:w-1/3 flex flex-col items-center">
            <Image
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
              width={300}
              height={450}
              className="w-full max-w-sm h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            {/* Social Media Links */}
            <div className="mt-4 flex space-x-3">
              {Object.entries(socialMediaLinks).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-${
                    key === "twitter"
                      ? "blue-400"
                      : key === "instagram"
                      ? "pink-400"
                      : key === "facebook"
                      ? "blue-600"
                      : key === "tiktok"
                      ? "black"
                      : "red-600"
                  } hover:text-${
                    key === "twitter"
                      ? "blue-600"
                      : key === "instagram"
                      ? "pink-600"
                      : key === "facebook"
                      ? "blue-800"
                      : key === "tiktok"
                      ? "gray-700"
                      : "red-800"
                  } transition-colors`}
                >
                  {key === "twitter" && <FaTwitter size={24} />}
                  {key === "instagram" && <FaInstagram size={24} />}
                  {key === "facebook" && <FaFacebook size={24} />}
                  {key === "youtube" && <FaYoutube size={24} />}
                </a>
              ))}
            </div>
            <div className="mt-6 text-gray-300 dark:text-gray-700">
              <h3 className="text-lg font-semibold">Personal Info</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <strong>Birthday:</strong> {birthday || "Not available"}
                </li>
                <li>
                  <strong>Known For:</strong>{" "}
                  {known_for_department || "Not available"}
                </li>
                <li>
                  <strong>Gender:</strong>{" "}
                  {actor.gender === 1 ? "Female" : "Male"}
                </li>
                <li>
                  <strong>Popularity:</strong> {actor.popularity}
                </li>
                <li>
                  <strong>Place of Birth:</strong>{" "}
                  {place_of_birth || "Not available"}
                </li>
                <li>
                  <strong>Also Known As:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    {also_known_as.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4 text-gray-100 dark:text-gray-900">
              {name}
            </h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-100 dark:text-gray-900">
                Biography
              </h2>
              <p className="text-gray-300 dark:text-gray-700">
                {biography && biography.length > 300 ? (
                  <>
                    {showFullBiography
                      ? biography
                      : biography.substring(0, 300) + "..."}
                    <button
                      className="text-blue-500 dark:text-blue-700 ml-1"
                      onClick={() => setShowFullBiography(!showFullBiography)}
                    >
                      {showFullBiography ? "Read Less" : "Read More"}
                    </button>
                  </>
                ) : (
                  biography || "Biography not available."
                )}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-100 dark:text-gray-900">
                Known For
              </h2>
              <div className="flex overflow-x-auto space-x-4 py-2 dark:text-gray-100 text-black">
                {movies.slice(0, 10).map((movie) => (
                  <CardComponent
                    key={movie.id}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    title={movie.title}
                    date={new Date(movie.release_date).getFullYear()}
                    id={movie.id}
                    CardType={"movies"} 
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-100 dark:text-gray-100">
                Acting
              </h2>
              <div className="space-y-4">
                {movies
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.release_date) - new Date(a.release_date)
                  )
                  .slice(0, 15)
                  .map((movie) => (
                    <div
                      key={movie.id}
                      className="relative bg-gray-300 dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-600 dark:border-gray-400 transition-transform transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500 dark:text-gray-200">
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                        <button
                          onClick={() => handleMovieDetailClick(movie)}
                          className="text-blue-500 dark:text-blue-700 hover:text-blue-700 dark:hover:text-blue-900 transition-colors"
                        >
                          <FaInfoCircle size={20} />
                        </button>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-200">
                            as {movie.character}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ActorDetails;
