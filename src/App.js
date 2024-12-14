import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Favourites from "./Favourites";
import Home from "./Home";
import { toast } from 'react-toastify';

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
      <div className="p-4 bg-gray-500 text-black flex justify-between">
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>
        <Link to="/favorites" className="text-lg font-bold">
          Favorites
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home addFavorite={addFavorite} />}
        />
        <Route
          path="/favorites"
          element={<Favourites favorites={favorites} deleteFavorite={deleteFavorite} setFavorites={setFavorites}/>}
        />
      </Routes>
    </Router>
  );
};

export default App;
