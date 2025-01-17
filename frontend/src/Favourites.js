import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Modal from "./Modal";
import EditModal from "./EditModal";
import { toast } from "react-toastify";
import axios from "axios";

const Favourites = ({ favorites, setFavorites }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    console.log("Deleting favorite with ID:", id);
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Confirming delete for ID:", itemToDelete);
    axios
      .delete(`https://favnodemodulesapp.onrender.com/api/favorites/${itemToDelete}`)
      .then(() => {
        const updatedFavorites = favorites.filter(fav => fav.id !== itemToDelete);
        setFavorites(updatedFavorites);
        setShowDeleteModal(false);
        setItemToDelete(null);
        toast.success("Package removed from favorites!");
      })
      .catch((error) => {
        toast.error("Error deleting package!");
        console.error("Error deleting favorite:", error);
      });
  };

  const updateFavorite = (id, updatedData) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, ...updatedData } : fav
    );
    setFavorites(updatedFavorites); // Update state with the modified favorite
    toast.success("Package updated!");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center">
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Favorite NPM Packages
        </h1>
        {favorites.length > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-medium px-6 py-2 rounded shadow"
            onClick={() => navigate("/")}
          >
            Add Favourite
          </button>
        )}
      </div>

      <div className="mt-8 w-3/4 bg-white shadow rounded-lg">
        {favorites.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">You don't have any favourites yet.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
              onClick={() => navigate("/")}
            >
              Add Favourite
            </button>
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Package Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((fav, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">{fav.name}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex items-center gap-4">
                      <Modal favorite={fav} />
                      <EditModal favorite={fav} updateFavorite={updateFavorite} />
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(fav.id)}
                        title={`Delete the package ${fav.name}`}
                        aria-label={`Delete package ${fav.name}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <div className="mb-4 text-gray-700">
              Are you sure you want to delete this package?
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;