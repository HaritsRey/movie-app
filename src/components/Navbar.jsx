import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <div className="flex gap-4">
        <Link to="/" className="font-bold">🎬 Movie</Link>
        <Link to="/favorite">❤️ Favorite</Link>
      </div>

      <button
        onClick={() => setDark(!dark)}
        className="bg-gray-700 px-3 py-1 rounded"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}

export default Navbar;