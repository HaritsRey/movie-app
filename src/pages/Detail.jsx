import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api";
import Navbar from "../components/Navbar";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetail(id).then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <p className="p-5">Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className="p-5 flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster}
          className="w-72 rounded-xl shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold">{movie.Title}</h1>
          <p className="mt-3 text-gray-400">{movie.Plot}</p>
          <p className="mt-3 text-yellow-400 text-xl">
            ⭐ {movie.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detail;