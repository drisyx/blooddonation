import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API requests

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    setLoading(true); // Start loading

    try {
      // Make an API call to the backend for login
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        // Redirect user on successful login
        navigate('/');
      } else {
        // Handle incorrect credentials
        setError('Invalid credentials, please try again.');
      }
    } catch (error) {
      // Handle API errors
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/donor-registration')}>
              Register
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
