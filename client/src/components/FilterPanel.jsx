import { useEffect, useState } from 'react';
import {
  Box, FormControl, InputLabel, MenuItem, Select, Slider, Typography,
} from '@mui/material';
import { getGenres } from '../services/tmdb';

export default function FilterPanel({ filters, onChange }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const handleGenreChange = (event) => {
    onChange({ ...filters, genres: [event.target.value] });
  };

  const handleSortChange = (event) => {
    onChange({ ...filters, sort_by: event.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    onChange({ ...filters, min_rating: newValue });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Filter Movies</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.genres[0] || ''}
          label="Genre"
          onChange={handleGenreChange}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sort_by}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="popularity.desc">Popularity (Desc)</MenuItem>
          <MenuItem value="popularity.asc">Popularity (Asc)</MenuItem>
          <MenuItem value="release_date.desc">Release Date (New → Old)</MenuItem>
          <MenuItem value="vote_average.desc">Rating (High → Low)</MenuItem>
        </Select>
      </FormControl>

      <Typography gutterBottom>Minimum Rating</Typography>
      <Slider
        value={filters.min_rating}
        onChange={handleRatingChange}
        step={0.5}
        min={0}
        max={10}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}