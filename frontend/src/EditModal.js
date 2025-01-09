import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify"; // Add toast for notifications

const EditModal = ({ favorite, updateFavorite }) => {
  const [open, setOpen] = useState(false);
  const [favoriteData, setFavoriteData] = useState({
    name: favorite.name,
    reason: favorite.reason || "",
  });
  const [errors, setErrors] = useState({ name: "", reason: "" });

  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    let hasError = false;
    const newErrors = { name: "", reason: "" };
    const trimmedName = favoriteData.name.trim();
    const trimmedReason = favoriteData.reason.trim();
  
    if (!trimmedName) {
      newErrors.name = "Package name is required.";
      hasError = true;
    }
    if (!trimmedReason) {
      newErrors.reason = "Reason is required.";
      hasError = true;
    }
  
    if (hasError) {
      setErrors(newErrors);
      return;
    }
  
    console.log(`PUT Request URL: https://favnodemodulesapp.onrender.com/api/favorites/${favorite.id}`);
    
    if (!favorite.id) {
      console.error("Invalid favorite ID:", favorite.id);
      toast.error("Unable to identify the package to update.");
      return;
    }
  
    axios
      .put(`https://favnodemodulesapp.onrender.com/api/favorites/${favorite.id}`, {
        name: trimmedName,
        reason: trimmedReason,
      })
      .then((response) => {
        updateFavorite(favorite.id, response.data);
        toast.success("Package updated successfully!");
        setOpen(false);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Failed to update package!";
        toast.error(errorMessage);
        console.error("Error updating favorite:", error);
      });
  };
  

  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-green-500 hover:text-green-700"
        title="Edit the favorite"
      >
        <FaEdit />
      </button>
      {open && (
        <Dialog open={open} onClose={handleOpen} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <DialogPanel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <DialogTitle className="text-lg font-bold text-gray-800">
                  Edit Favorite
                </DialogTitle>
                <div className="mt-4">
                  <label className="block text-gray-600">Package Name</label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    value={favoriteData.name}
                    onChange={(e) =>
                      setFavoriteData({ ...favoriteData, name: e.target.value })
                    }
                    placeholder="Enter package name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mt-4">
                  <label className="block text-gray-600">Reason</label>
                  <textarea
                    className={`w-full p-2 border rounded ${errors.reason ? 'border-red-500' : 'border-gray-300'}`}
                    value={favoriteData.reason}
                    onChange={(e) =>
                      setFavoriteData({ ...favoriteData, reason: e.target.value })
                    }
                    placeholder="Enter the reason"
                  />
                  {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={handleOpen}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default EditModal;
