import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button,
  Box
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesResponse, servicesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/popular-games'),
          axios.get('http://localhost:5000/api/featured-services')
        ]);
        setPopularGames(gamesResponse.data);
        setFeaturedServices(servicesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        className="hero-section"
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Box className="hero-content">
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Welcome to Eldorado
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Your trusted marketplace for gaming accounts, items, and services
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Start Trading
          </Button>
        </Box>
      </Box>

      {/* Popular Games Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Popular Games
        </Typography>
        <Grid container spacing={4}>
          {popularGames.map((game) => (
            <Grid item key={game.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`/images/${game.image}`}
                  alt={game.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {game.name}
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    View Offers
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Services Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Featured Services
        </Typography>
        <Grid container spacing={4}>
          {featuredServices.map((service) => (
            <Grid item key={service.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {service.title}
                  </Typography>
                  <Typography>
                    {service.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 