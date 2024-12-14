import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Favourites = ({ favorites, deleteFavorite }) => {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 rounded-md bg-white shadow-lg w-2/3">
        <div className="font-bold text-left mb-6 text-2xl text-gray-700">
          Your Favorite NPM Packages
        </div>

        {favorites.length === 0 ? (
          <>
            <p className="text-gray-500 text-2xl font-bold">No favorites added yet!</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => navigate("/")}
            >
              Add Favorites
            </button>
          </>

        ) : (

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
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline mr-4">View</button>
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
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
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
