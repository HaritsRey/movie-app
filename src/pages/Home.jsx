import { useState, useEffect } from "react";
import { searchMovies } from "../api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(fav);
  }, []);

  const toggleFavorite = (movie) => {
    let updated = [...favorites];

    const exists = updated.find((m) => m.imdbID === movie.imdbID);

    if (exists) {
      updated = updated.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      updated.push(movie);
    }

    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    const data = await searchMovies(query);

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      alert(data.Error);
      setMovies([]);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition">
      <Navbar />

      {/* HEADER */}
      <div className="text-center py-10 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <h1 className="text-4xl font-bold">🎬 Movie App</h1>
        <p>Cari film favorit kamu</p>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2 my-6 max-w-xl mx-auto px-3">
        <input
          type="text"
          placeholder="Cari film..."
          className="border p-2 w-full rounded dark:bg-gray-800 dark:text-white"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Cari
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {/* MOVIE LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-5 pb-10">
        {movies.map((m) => {
          const isFav = favorites.find((f) => f.imdbID === m.imdbID);

          return (
            <div
              key={m.imdbID}
              className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={
                  m.Poster !== "N/A"
                    ? m.Poster
                    : "https://via.placeholder.com/150"
                }
                className="w-full h-64 object-cover"
              />

              {/* TITLE + FAVORITE */}
              <div className="p-3 flex justify-between items-center">
                <h3 className="text-sm font-bold">{m.Title}</h3>

                <button
                  onClick={() => toggleFavorite(m)}
                  className={`text-2xl transition transform ${
                    isFav
                      ? "scale-125 text-red-500"
                      : "text-gray-400"
                  } hover:scale-150`}
                >
                  {isFav ? "❤️" : "🤍"}
                </button>
              </div>

              {/* DETAIL */}
              <div className="px-3 pb-3">
                <Link
                  to={`/detail/${m.imdbID}`}
                  className="text-blue-400 text-sm"
                >
                  Detail
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;