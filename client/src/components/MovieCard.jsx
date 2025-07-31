import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import FavoriteButton from './FavoriteButton';

export default function MovieCard({ movie, onClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card sx={{ maxWidth: 200, cursor: 'pointer' }} onClick={() => onClick(movie)}>
      <CardMedia component="img" image={imageUrl} height="300" />
      <CardContent>
        <Typography variant="subtitle1">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date}
        </Typography>
      </CardContent>
    </Card>
  );

  const MovieCard = ({ movie }) => {
  return (
    <Card>
      {/* Movie info */}
      <CardContent>
        <Typography>{movie.title}</Typography>
        <FavoriteButton movieId={movie.id} />
      </CardContent>
    </Card>
  );
  };
  
}