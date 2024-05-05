// flightService.js
import axios from 'axios';
import { getApiHeaders , getApiHeaderForImage } from '../header/apiHeader';

const API_URL = 'http://localhost:5000';


//fetch flight data from server
export const fetchFlights = async (page, size) => {
  try {
    const response = await axios.get(`${API_URL}/flights?page=${page}&size=${size}`, getApiHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};

//fetch flight image data from server
export const getFightPhoto = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/flights/${id}/photo`, {
      ...getApiHeaderForImage(),
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};

//create flight data  service
export const createFlight = async (flightData) => {
  try {
    const response = await axios.post(`${API_URL}/flights`, flightData ,getApiHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};

//create flight with photo data  service
export const createFlightWithPhoto = async (flightData) => {
  try {
    const response = await axios.post(`${API_URL}/flights/withPhoto`, flightData ,getApiHeaders('multipart/form-data'));
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};

//update flight data  service
export const updateFlight = async (id, updatedFlightData) => {
  try {
    const response = await axios.put(`${API_URL}/flights/${id}`, updatedFlightData , getApiHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};

//create flight with photo data  service
export const updateFlightWithPhoto = async (id, updatedFlightData) => {
  try {
    const response = await axios.put(`${API_URL}/flights/${id}/withPhoto`, updatedFlightData , getApiHeaders('multipart/form-data'));
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};

//delete flight data  service
export const deleteFlight = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/flights/${id}` ,getApiHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};

