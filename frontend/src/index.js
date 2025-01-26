import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new createRoot API
import './index.css';
import App from './App';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
