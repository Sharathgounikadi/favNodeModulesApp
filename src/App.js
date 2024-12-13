import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import Favourites from "./Favourites";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (pkg) => {
    if (favorites.some((fav) => fav.name === pkg.name)) {
      alert("Package already exists in favorites!");
      return;
    }
    setFavorites([...favorites, { id: Date.now(), ...pkg }]);
  };

  const deleteFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>
        <Link to="/favorites" className="text-lg font-bold">
          Favorites
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Search addFavorite={addFavorite} />}
        />
        <Route
          path="/favorites"
          element={<Favourites favorites={favorites} deleteFavorite={deleteFavorite} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
