import { React, useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material'; 
import backimg from "../images/sideimg.png";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const CheckHandler = () => {
    const loggedIn = localStorage.getItem("loggedIn");
    if(loggedIn !== "true")
    {
        navigate('/login');
        // window.location.reload();
    }
}
useEffect(() => {
    CheckHandler();
}, [])

  return (
    <Container maxWidth="lg" style={{ marginTop: '40px' }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <img src={backimg} alt="Welcome" style={{ maxWidth: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Welcome to Our Website
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo magna nec nulla ullamcorper, ac convallis turpis pretium.
          </Typography>
          <Typography variant="body1" paragraph>
            Phasellus at vehicula arcu. In rhoncus odio id purus lobortis, eget consequat lectus condimentum. 
          </Typography>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;