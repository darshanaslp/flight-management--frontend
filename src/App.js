import React , { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { useSelector , useDispatch } from 'react-redux';
import './App.css';

// Import components

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FlightList from './pages/flights/FlightList';
import FlightCardList from './pages/flights/FlightCardList';
import { ThemeProvider } from './Context/ThemeContext';
import { setAuth } from './store/users/userSlice';


const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // Check for token in local storage on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, dispatch action to set authentication
      dispatch(setAuth({ token, refreshToken: localStorage.getItem('refreshToken') }));
    }
  }, [dispatch]);



  return (
    <Router>
       <ThemeProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/flights" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flights" element={isAuthenticated ? <FlightList /> : <Navigate to="/login" />} />
          <Route path="/flights-cards" element={isAuthenticated ? <FlightCardList /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
