import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/profile'); // API endpoint for profile data
        const data = response.data;
        setName(data.name);
        setEmail(data.email);
        setDonationHistory(data.donationHistory);
      } catch (err) {
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // API call to save updated profile data
      const updatedProfile = {
        name,
        email,
        donationHistory,
      };
      const response = await axios.put('http://localhost:5000/api/profile', updatedProfile); // API endpoint to save profile data

      if (response.data.success) {
        setEditing(false);
        alert('Profile updated successfully');
      } else {
        setError('Failed to update profile.');
      }
    } catch (err) {
      setError('Error saving profile data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h3" gutterBottom>
          MY PROFILE
        </Typography>

        {/* Display Loading State */}
        {loading && <Typography variant="body1">Loading...</Typography>}
        {error && <Typography variant="body1" color="error">{error}</Typography>}

        {/* Profile Information */}
        <Card sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
          <CardContent>
            <Grid container spacing={2} direction="column">
              {/* Name Field */}
              <Grid item>
                <Typography variant="h6">Name</Typography>
                {editing ? (
                  <TextField
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">{name}</Typography>
                )}
              </Grid>

              {/* Email Field */}
              <Grid item>
                <Typography variant="h6">Email</Typography>
                {editing ? (
                  <TextField
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">{email}</Typography>
                )}
              </Grid>

              {/* Donation History */}
              <Grid item>
                <Typography variant="h6">Donation History</Typography>
                {donationHistory.length > 0 ? (
                  <ul>
                    {donationHistory.map((historyItem, index) => (
                      <li key={index}>
                        <Typography variant="body1">{historyItem}</Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body1">No donation history available.</Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Edit/Save Button */}
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            color={editing ? 'error' : 'primary'}
            onClick={editing ? handleSave : handleEditToggle}
            disabled={loading} // Disable button when loading
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
