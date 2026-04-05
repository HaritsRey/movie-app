import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(fav);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />

      <h1 className="text-3xl font-bold text-center my-5">
        ❤️ Favorite Movies
      </h1>

      {favorites.length === 0 && (
        <p className="text-center text-gray-400">
          Belum ada favorite 😢
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-5 pb-10">
        {favorites.map((m) => (
          <div
            key={m.imdbID}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={m.Poster}
              className="w-full h-64 object-cover"
            />

            <div className="p-3">
              <h3 className="text-sm font-bold">{m.Title}</h3>

              <Link
                to={`/detail/${m.imdbID}`}
                className="text-blue-400 text-sm"
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
