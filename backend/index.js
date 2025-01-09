const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const favorites = [];

// Retrieve all favorites
app.get('/api/favorites', (req, res) => {
  res.json(favorites);
});

// Add a new favorite
app.post('/api/favorites', (req, res) => {
  const favorite = req.body;
  favorites.push(favorite);
  res.status(201).json(favorite);
});

// Edit an existing favorite
app.put('/api/favorites/:id', (req, res) => {
  const { id } = req.params;
  const updatedFavorite = req.body;
  const index = favorites.findIndex(fav => fav.id === parseInt(id));
  if (index !== -1) {
    favorites[index] = updatedFavorite;
    res.json(updatedFavorite);
  } else {
    res.status(404).json({ message: 'Favorite not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
