import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper',
  boxShadow: 24, p: 4, borderRadius: 2,
};

export default function MovieDetailModal({ open, handleClose, movie }) {
  if (!movie) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" mb={2}>{movie.title}</Typography>
        <Typography variant="body2" mb={1}>{movie.overview}</Typography>
        <Typography variant="caption" color="text.secondary">
          Release Date: {movie.release_date}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }} variant="outlined">Close</Button>
      </Box>
    </Modal>
  );
}