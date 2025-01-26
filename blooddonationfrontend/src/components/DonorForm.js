import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
 import axios from 'axios';// Import Axios

const Donorform = () => {
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    age: '',
    bloodType: '',
    contact: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo({
      ...donorInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donorInfo.name || !donorInfo.age || !donorInfo.bloodType || !donorInfo.contact) {
      alert('Please fill in all fields.');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/register_donor', donorInfo);
        setResponseMessage(response.data.message); // Display success message
        alert('Thank you for registering as a donor!');
        setDonorInfo({ name: '', age: '', bloodType: '', contact: '' }); // Reset the form
      } catch (error) {
        console.error('Error registering donor:', error);
        alert('Failed to register as a donor. Please try again.');
      }
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
        {responseMessage && (
          <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
            {responseMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Donorform;
