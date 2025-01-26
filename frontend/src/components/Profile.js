import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Card, CardContent } from '@mui/material';

const Profile = () => {
  const [name, setName] = useState('Rahul Kumar');
  const [email, setEmail] = useState('rahulkumar@gmail.com');
  const [donationHistory, setDonationHistory] = useState([
    'January 2023 - 1st Donation',
    'May 2024 - 2nd Donation',
  ]);
  const [editing, setEditing] = useState(false);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    // Add save logic (e.g., update user info in the backend)
    setEditing(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h3" gutterBottom>
          MY PROFILE
        </Typography>

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
            color={editing ? 'error' : 'error'}
            onClick={editing ? handleSave : handleEditToggle}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
