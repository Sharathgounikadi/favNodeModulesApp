import React,{useState} from 'react'

const AddFavorites = () => {
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
      );
      const [selectedFavorite, setSelectedFavorite] = useState(null);
    
      const deleteFavorite = (name) => {
        const updatedFavorites = favorites.filter((fav) => fav.name !== name);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setSelectedFavorite(null);
      };
    
      return (
        <div className="min-h-screen p-6 bg-gray-100">
          <h1 className="text-2xl font-bold text-center">Your Favorite Packages</h1>
          {favorites.length === 0 ? (
            <p className="text-center text-gray-600 mt-4">
              No favorites yet. Go back to add some!
            </p>
          ) : (
            <ul className="mt-4">
              {favorites.map((fav) => (
                <li
                  key={fav.name}
                  className="p-4 border rounded-md flex justify-between items-center"
                >
                  <span>{fav.name}</span>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => setSelectedFavorite(fav)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
    
          {selectedFavorite && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md text-center">
                <p>Are you sure you want to delete {selectedFavorite.name}?</p>
                <div className="mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setSelectedFavorite(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteFavorite(selectedFavorite.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default AddFavorites