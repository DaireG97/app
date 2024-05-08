'use client';
import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, Link, Grid, Box, Typography, Container, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// Define the custom theme
const theme = createTheme({
  palette: {
    secondary: {
      main: green[500],
    },
  },
});

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [weather, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('api/getProducts')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);

    fetch('api/getWeather')
      .then((res) => res.json())
      .then(setWeatherData)
      .catch(console.error);
  }, []);

  // Function to handle adding items to the cart
  const putInCart = (pname) => {
    console.log("Putting in cart: " + pname);
    fetch(`/api/putInCart?pname=${pname}`);
  };

  if (!data.length) return <p>No products data</p>;
  if (!weather) return <p>No weather data</p>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" href="cart">Cart</Button>
          <Button color="inherit" href="../page.js">logOut</Button>
          <Button color="inherit" href="#about">About</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xl">
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" color="secondary">
                Today's Temperature:
              </Typography>
              <Typography variant="body1">
                {JSON.stringify(weather.temp)}°C
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            {data.map((item, index) => (
              <Box key={item._id} sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 2, mb: 2 }}>
                <Typography variant="h6">{item.pname} - {item.price}</Typography>
                <Button onClick={() => putInCart(item.pname)} variant="outlined" color="secondary">
                  Add to Cart
                </Button>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
