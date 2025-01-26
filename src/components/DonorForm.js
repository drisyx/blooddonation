import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const Donorform = () => {
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    age: '',
    bloodType: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo({
      ...donorInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!donorInfo.name || !donorInfo.age || !donorInfo.bloodType || !donorInfo.contact) {
      alert('Please fill in all fields.');
    } else {
      alert('Thank you for registering as a donor!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          Become a Blood Donor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={donorInfo.name}
            onChange={handleChange}
          />
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            margin="normal"
            name="age"
            value={donorInfo.age}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="Blood Type"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bloodType"
            value={donorInfo.bloodType}
            onChange={handleChange}
          />
          <TextField
            label="Contact Info"
            variant="outlined"
            fullWidth
            margin="normal"
            name="contact"
            value={donorInfo.contact}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="error"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Register as Donor
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Donorform;
