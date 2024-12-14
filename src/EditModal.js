import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

const EditModal = ({ favoriteId, favorites, updateFavorite }) => {
  const [open, setOpen] = useState(false);
  const [favoriteData, setFavoriteData] = useState({ name: "", reason: "" });

  useEffect(() => {
    if (open) {
      // Fetch favorite data from the `favorites` prop instead of `localStorage`
      const favoriteItem = favorites.find((fav) => fav.id === favoriteId);
      if (favoriteItem) {
        setFavoriteData({ name: favoriteItem.name, reason: favoriteItem.reason });
      }
    }
  }, [open, favoriteId, favorites]);

  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    if (!favoriteData.name || !favoriteData.reason) {
      alert("Both fields are required!");
      return;
    }

    // Pass updated data to the parent via `updateFavorite`
    updateFavorite(favoriteId, favoriteData);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-blue-500 hover:underline">
        Edit
      </button>
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
                  className="w-full p-2 border rounded"
                  value={favoriteData.name}
                  onChange={(e) =>
                    setFavoriteData({ ...favoriteData, name: e.target.value })
                  }
                  placeholder="Enter package name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Reason</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={favoriteData.reason}
                  onChange={(e) =>
                    setFavoriteData({ ...favoriteData, reason: e.target.value })
                  }
                  placeholder="Enter the reason"
                />
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
    </div>
  );
};

export default EditModal;
