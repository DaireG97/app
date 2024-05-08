'use client';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  function fetchCartItems() {
    fetch('api/getCart')
      .then(res => res.json())
      .then(setCartItems)
      .catch(err => console.error('Failed to fetch cart items:', err));
  }

  function removeFromCart(pname) {
    console.log("Removing from cart: " + pname);
    fetch(`api/removeFromCart?pname=${pname}`)
      .then(response => response.json())
      .then(result => {
        console.log('Item removed', result);
        fetchCartItems();  // Re-fetch cart items to update the UI
      })
      .catch(err => console.error('Failed to remove item:', err));
  }

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            My Cart
          </Typography>
          <Button color="inherit" href="#home">Home</Button>
          <Button color="inherit" href="dashboard">Dashboard</Button>
          <Button color="inherit" href="#about">About</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md">
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              My Cart
            </Typography>
          </Grid>
          {cartItems.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 2, mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Product ID: {item._id}<br />
                  Product: {item.pname} - ${item.price}
                </Typography>
                <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.pname)}>
                  Remove from cart
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

