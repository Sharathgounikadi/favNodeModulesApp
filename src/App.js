import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Favourites from "./Favourites";
import Home from "./Home";
import { toast } from "react-toastify";

// Navigation Bar Component
const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex gap-8 py-4 justify-center bg-gray-300 shadow-md">
      <Link
        to="/"
        className={`text-lg font-bold ${location.pathname === "/"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-700"
          } hover:text-blue-500 hover:border-b-2 hover:border-blue-500 transition duration-300`}
      >
        Home
      </Link>
      <Link
        to="/favorites"
        className={`text-lg font-bold ${location.pathname === "/favorites"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-700"
          } hover:text-blue-500 hover:border-b-2 hover:border-blue-500 transition duration-300`}
      >
        Favourites
      </Link>
    </div>
  );
};

// App Component
const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (pkg) => {
    if (favorites.some((fav) => fav.name === pkg.name)) {
      toast("Package already exists in favorites!");
      return;
    }
    setFavorites([...favorites, { id: Date.now(), ...pkg }]);
  };

  const deleteFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <Router>
      <div className=" text-black">
        <Navbar /> {/* Navbar component */}
        <Routes>
          <Route path="/" element={<Home addFavorite={addFavorite} />} />
          <Route
            path="/favorites"
            element={
              <Favourites
                favorites={favorites}
                deleteFavorite={deleteFavorite}
                setFavorites={setFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
