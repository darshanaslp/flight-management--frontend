// userService.js

import axios from 'axios';
import getApiHeaders from '../header/apiHeader';

const BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

const userService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken } , getApiHeaders());
      return response.data;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  },
};

export default userService;

// const userService = {
//   login: async (email, password) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   register: async (name, email, password) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// export default userService;