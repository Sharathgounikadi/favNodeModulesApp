import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourites from "./Favourites";
import Home from "./Home";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from localStorage on app load
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage whenever favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a favorite package
  const addFavorite = (pkg) => {
    if (favorites.some((fav) => fav.name === pkg.name)) {
      toast("Package already exists in favorites!");
      return;
    }
    setFavorites([...favorites, { id: Date.now(), ...pkg }]);
  };

  // Delete a specific favorite
  const deleteFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  // Edit a specific favorite
  const updateFavorite = (id, updatedData) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, ...updatedData } : fav
    );
    setFavorites(updatedFavorites);
  };

  return (
    <Router>
      <div className="text-black">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home addFavorite={addFavorite} />}
          />
          <Route
            path="/favorites"
            element={
              <Favourites
                favorites={favorites}
                deleteFavorite={deleteFavorite}
                updateFavorite={updateFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
