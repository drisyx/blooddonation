import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';

const Requestform = () => {
  const [requestInfo, setRequestInfo] = useState({
    name: '',
    bloodType: '',
    hospital: '',
    contact: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestInfo({
      ...requestInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestInfo.name || !requestInfo.bloodType || !requestInfo.hospital || !requestInfo.contact) {
      alert('Please fill in all fields.');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/request_blood', requestInfo);
        setResponseMessage(response.data.message); // Set success message
        alert('Blood request submitted successfully!');
        setRequestInfo({ name: '', bloodType: '', hospital: '', contact: '' }); // Clear the form
      } catch (error) {
        console.error('Error submitting blood request:', error);
        alert('Failed to submit blood request. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          Request Blood
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={requestInfo.name}
            onChange={handleChange}
          />
          <TextField
            label="Blood Type"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bloodType"
            value={requestInfo.bloodType}
            onChange={handleChange}
          />
          <TextField
            label="Hospital Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="hospital"
            value={requestInfo.hospital}
            onChange={handleChange}
          />
          <TextField
            label="Contact Info"
            variant="outlined"
            fullWidth
            margin="normal"
            name="contact"
            value={requestInfo.contact}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="error"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Submit Request
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

export default Requestform;
