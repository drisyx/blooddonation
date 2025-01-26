import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DonorForm from './components/DonorForm';
import RequestForm from './components/RequestForm';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donor-registration" element={<DonorForm />} />
          <Route path="/request-blood" element={<RequestForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
     
    </Router>
  );
};

export default App;
