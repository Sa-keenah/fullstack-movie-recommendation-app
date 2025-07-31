import { useEffect, useState } from 'react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import FilterPanel from '../components/FilterPanel';
import { discoverMovies, searchMovies } from '../services/tmdb';

export default function Discover() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filters, setFilters] = useState({
    genres: [],
    sort_by: 'popularity.desc',
    min_rating: 0,
  });

  const fetchMovies = async () => {
    if (query.trim()) {
      const results = await searchMovies(query);
      setMovies(results);
    } else {
      const discovered = await discoverMovies(filters);
      setMovies(discovered);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const results = await searchMovies(value);
      setMovies(results);
    } else {
      fetchMovies();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Discover Movies
      </Typography>

      <TextField
        fullWidth
        label="Search movies"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Box sx={{ mb: 4 }}>
        <FilterPanel filters={filters} onChange={setFilters} />
      </Box>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} onClick={setSelectedMovie} />
          </Grid>
        ))}
      </Grid>

      <MovieDetailModal
        open={!!selectedMovie}
        handleClose={() => setSelectedMovie(null)}
        movie={selectedMovie}
      />
    </Container>
  );
}