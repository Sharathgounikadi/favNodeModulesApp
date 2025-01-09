const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json());

const favorites = [];

app.use(cors({
  origin: 'https://fav-node-modules-app.vercel.app/'  // replace with your front-end URL
}));

// Retrieve all favorites
app.get('/api/favorites', (req, res) => {
  res.json(favorites);
});

// Add a new favorite
app.post('/api/favorites', (req, res) => {
  const favorite = { ...req.body, id: favorites.length + 1 }; // Ensure id is assigned
  favorites.push(favorite);
  res.status(201).json(favorite);
});


// Edit an existing favorite
// Edit an existing favorite
app.put('/api/favorites/:id', (req, res) => {
  const { id } = req.params;
  const updatedFavorite = req.body;
  const index = favorites.findIndex(fav => fav.id === parseInt(id));
  if (index !== -1) {
      favorites[index] = { ...favorites[index], ...updatedFavorite }; // Merge updates
      res.json(favorites[index]);
  } else {
      res.status(404).json({ message: 'Favorite not found' });
  }
});


// Delete a specific favorite
app.delete('/api/favorites/:id', (req, res) => {
  const { id } = req.params;
  const index = favorites.findIndex(fav => fav.id === parseInt(id));
  if (index !== -1) {
      favorites.splice(index, 1); // Remove the item from the array
      res.status(200).json({ message: 'Favorite deleted successfully' });
  } else {
      res.status(404).json({ message: 'Favorite not found' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
