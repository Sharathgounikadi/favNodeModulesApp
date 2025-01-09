import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourites from "./Favourites";
import Home from "./Home";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import axios from "axios";

const App = () => {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    // Fetch favorites from the API
    axios
      .get("https://favnodemodulesapp.onrender.com/api/favorites")
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        toast.error(error.messsage);
        console.error("Error fetching favorites:", error.messsage);
      });
  }, []);

  // Add a favorite package
  const addFavorite = (pkg) => {
    if (favorites.some((fav) => fav.name === pkg.name)) {
      toast("Package already exists in favorites!");
      return;
    }

    axios
      .post("https://favnodemodulesapp.onrender.com/api/favorites", pkg)
      .then((response) => {
        setFavorites([...favorites, response.data]);
        toast.success("Package added to favorites!");
      })
      .catch((error) => {
        toast.error(error.messsage);
        console.error( error.message);
      });
  };

  return (
    <Router>
      <div className="text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home addFavorite={addFavorite} />} />
          <Route
            path="/favorites"
            element={<Favourites favorites={favorites}  setFavorites={setFavorites}/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
