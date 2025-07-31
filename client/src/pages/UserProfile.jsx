import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Grid, Card, CardContent, List, ListItem } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // your context

const UserProfile = () => {
  const { user, token } = useAuth();
  const [data, setData] = useState({ favorites: [], watchlists: [] });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/user/${user._id}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchProfile();
      fetchReviews();
    }
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome, {user.username}</Typography>

      <Typography variant="h5">Favorites</Typography>
      <Grid container spacing={2}>
        {data.favorites.map(id => (
          <Grid item key={id} xs={6} sm={4} md={3}>
            <Card><CardContent>TMDB ID: {id}</CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4 }}>Watchlists</Typography>
      {data.watchlists.map((list, idx) => (
        <Card key={idx} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{list.title}</Typography>
            <List>
              {list.movies.map(id => (
                <ListItem key={id}>Movie ID: {id}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" sx={{ mt: 4 }}>Your Reviews</Typography>
      {reviews.map((rev, i) => (
        <Card key={i} sx={{ mt: 2 }}>
          <CardContent>
            <Typography>Movie ID: {rev.movieId}</Typography>
            <Typography>Rating: {rev.rating}</Typography>
            <Typography>{rev.comment}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default UserProfile;