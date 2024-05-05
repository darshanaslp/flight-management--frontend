// flightThunk.js
import { fetchFlightsAsync , fetchFlightPhotoAsync ,createFlightAsync , createFlightWithPhotoAsync , updateFlightAsync , updateFlightWithPhotoAsync , deleteFlightAsync } from './flightSlice';

export const fetchFlight = (page, size) => (dispatch) => {
  dispatch(fetchFlightsAsync({ page, size }));
};

// Add a new thunk to fetch flight photo
export const fetchFlightPhoto = (id) => async (dispatch) => {
  try {
    dispatch(fetchFlightPhotoAsync(id));
  } catch (error) {
    console.error('Error fetching flight photo:', error);
    throw error;
  }
};


// Add a new thunk to create flight 
export const createFlight = (flightData) => async (dispatch) => {
  try {
     dispatch(createFlightAsync(flightData));
  } catch (error) {
    throw error; 
  }
};

// Add a new thunk to create flight photo
export const createFlightWithPhoto = (flightData) => async (dispatch) => {
  try {
     dispatch(createFlightWithPhotoAsync(flightData));
  } catch (error) {
    throw error; 
  }
};

// update thunk to fetch flight 
export const updateFlight = ({ id, flightData }) => async (dispatch) => {
  try {
    dispatch(updateFlightAsync({ id, flightData }));
  } catch (error) {
    throw error;
  }
};

// update thunk to fetch flight photo
export const updateFlightWithPhoto = ({ id, flightData }) => async (dispatch) => {
  try {
     dispatch(updateFlightWithPhotoAsync({ id, flightData }));
  } catch (error) {
    throw error; 
  }
};

// delete thunk to delete flight 
export const deleteFlight = (flightId) => async (dispatch) => {
  try {
    dispatch(deleteFlightAsync(flightId));
  } catch (error) {
    throw error;
  }
};

