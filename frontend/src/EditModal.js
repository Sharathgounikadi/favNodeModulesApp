import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const EditModal = ({ favorite, updateFavorite }) => {
  const [open, setOpen] = useState(false);
  const [favoriteData, setFavoriteData] = useState({
    name: favorite.name,
    reason: favorite.reason || "",
  });

  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    if (!favoriteData.name.trim() || !favoriteData.reason.trim()) {
      toast.error("Both fields are required.");
      return;
    }

    axios
      .put(`https://favnodemodulesapp.onrender.com/api/favorites/${favorite.id}`, {
        name: favoriteData.name.trim(),
        reason: favoriteData.reason.trim(),
      })
      .then((response) => {
        updateFavorite(favorite.id, response.data);
        toast("Package updated successfully!");
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Failed to update package.");
        console.error("Error updating favorite:", error);
      });
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-green-500 hover:text-green-700">
        <FaEdit />
      </button>
      {open && (
        <Dialog open={open} onClose={handleOpen} className="fixed inset-0 z-10">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-4">Edit Favorite</h3>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={favoriteData.name}
                onChange={(e) =>
                  setFavoriteData({ ...favoriteData, name: e.target.value })
                }
                placeholder="Package Name"
              />
              <textarea
                className="w-full p-2 border rounded mb-4"
                value={favoriteData.reason}
                onChange={(e) =>
                  setFavoriteData({ ...favoriteData, reason: e.target.value })
                }
                placeholder="Reason"
              />
              <div className="flex justify-end gap-4">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleOpen}>
                  Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default EditModal;
