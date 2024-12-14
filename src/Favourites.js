import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import EditModal from "./EditModal";

const Favourites = ({ favorites, deleteFavorite, setFavorites }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteFavorite(itemToDelete);
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const updateFavorite = (id, updatedData) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, ...updatedData } : fav
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen ">
      <div className="p-10 rounded-md bg-white shadow-lg w-2/3">
        {favorites.length === 0 ? (
          <>
            <div className="font-bold text-left mb-6 text-2xl text-gray-700">
              Your Favorite NPM Packages
            </div>
            <div className="">
              <p className="text-gray-500 text-2xl font-semibold">
                You don't have any favourites yet, Please add
              </p>
              <button
                className="bg-blue-500 text-white px-4 text-md py-2 rounded mt-2"
                onClick={() => navigate("/")}
              >
                Add Favourite
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="font-bold text-left mb-6 text-2xl text-gray-700 flex justify-around">
              Your Favorite NPM Packages
              <button
                className="bg-blue-500 hover:bg-blue-300 text-white px-2 py-2 rounded text-sm"
                onClick={() => navigate("/")}
              >
                Add Favourite
              </button>
            </div>
            <table className="w-full border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2">Package Name</th>
                  <th className="text-left px-4 py-2">Reason</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((fav) => (
                  <tr key={fav.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-gray-700">{fav.name}</td>
                    <td className="px-4 py-2 text-gray-500">{fav.reason}</td>
                    <td className="px-4 py-2 flex gap-4">
                      <div className="text-blue-500 hover:underline mr-4">
                        <Modal />
                      </div>
                      <EditModal
                        favoriteId={fav.id}
                        favorites={favorites} // Pass favorites here
                        updateFavorite={updateFavorite}
                      />
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteClick(fav.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="mb-4 text-gray-700">
                Are you sure you want to delete?
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
    </div>
  );
};

export default Favourites;
