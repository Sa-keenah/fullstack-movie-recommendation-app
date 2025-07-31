import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // adjust to your path

const FavoriteButton = ({ movieId }) => {
  const { user, token } = useAuth(); // you need a context that gives you user & token
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // fetch user favorites to check if movie is favorited
    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsFavorite(res.data.favorites.includes(movieId));
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchFavorites();
  }, [movieId, user]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`/api/users/favorites/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/users/favorites', { movieId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsFavorite(prev => !prev);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  if (!user) return null;

  return (
    <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
      <IconButton onClick={toggleFavorite} color="error">
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;