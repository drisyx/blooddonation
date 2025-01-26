import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';

const Homepage = () => {
  return (
    <Container maxWidth="lg" className="home-page">
      {/* Main Section */}
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Blood Donation Center
        </Typography>
        <Typography variant="h6" paragraph>
          Your blood can save lives. Join the movement to donate blood today and make a real difference!
        </Typography>
        <Button variant="contained" color="error" href="/donor-registration">
          Become a Donor
        </Button>
      </Box>

      {/* Image Section */}
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <img 
          src="https://t3.ftcdn.net/jpg/03/09/20/22/360_F_309202280_CgsWoCAdLBe9INBvdwBKUkpaLEP4XNLa.jpg" // Replace with your image URL
          alt="Blood Donation"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </Box>

      {/* Next Steps Section */}
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          How to Donate
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', padding: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom>
                Step 1: Sign Up
              </Typography>
              <Typography variant="body1">
                Register as a blood donor and provide your basic details.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', padding: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom>
                Step 2: Donate Blood
              </Typography>
              <Typography variant="body1">
                Visit a nearby donation center and donate blood. It's safe and easy!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', padding: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom>
                Step 3: Save Lives
              </Typography>
              <Typography variant="body1">
                Your blood donation can save lives. Thank you for your contribution!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Homepage;
