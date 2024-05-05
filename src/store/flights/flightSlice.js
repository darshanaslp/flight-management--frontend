// flightSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlights, getFightPhoto , createFlight , createFlightWithPhoto , updateFlight , updateFlightWithPhoto , deleteFlight } from '../../services/flight/flightService';


// get flight details in pagination
export const fetchFlightsAsync = createAsyncThunk(
  'flights/fetchFlights',
  async ({ page, size }) => {
    const response = await fetchFlights(page, size);
    return response;
  }
);

//get single flight with photo
export const fetchFlightPhotoAsync = createAsyncThunk(
  'flights/fetchFlightPhoto',
  async (id, thunkAPI) => {
    try {
      const photoData = await getFightPhoto(id);
      return photoData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // Handle error
    }
  }
);

//create flight
export const createFlightAsync = createAsyncThunk(
  'flights/createFlight',
  async (flightData) => {
    const response = await createFlight(flightData);
    return response;
  }
);

//create flight with photo
export const createFlightWithPhotoAsync = createAsyncThunk(
  'flights/createFlightWithPhoto',
  async (flightData) => {
    const response = await createFlightWithPhoto(flightData);
    return response;
  }
);

//update flight details
export const updateFlightAsync = createAsyncThunk(
  'flights/updateFlight',
  async ({ id, flightData }) => {
    const response = await updateFlight(id, flightData);
    return response; 
  }
);

//update flight with photo
export const updateFlightWithPhotoAsync = createAsyncThunk(
  'flights/updateFlightWithPhoto',
  async ({ id, flightData }) => {
    const response = await updateFlightWithPhoto(id, flightData);
    return response; 
  }
);

//delete flight
export const deleteFlightAsync = createAsyncThunk(
  'flights/deleteFlight',
  async (flightId) => {
    await deleteFlight(flightId);
    return flightId; 
  }
);



const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload.resources;
        state.totalPages = Math.ceil(action.payload.total / 10); // Assuming size=10
      })
      .addCase(fetchFlightsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFlightPhotoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightPhotoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.flightPhoto = action.payload;
      })
      .addCase(fetchFlightPhotoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFlightAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFlightAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update flights array with the new flight data
        state.flights.push(action.payload); 
      })
      .addCase(createFlightAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createFlightWithPhotoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFlightWithPhotoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.flights.push(action.payload); 
      })
      .addCase(createFlightWithPhotoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFlightAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFlightAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the flight in the flights array with the new data
        state.flights = state.flights.map(flight => {
          if (flight.id === action.payload.id) {
            return action.payload; 
          }
          return flight;
        });
      })
      .addCase(updateFlightAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFlightWithPhotoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFlightWithPhotoAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the flight in the flights array with the new data
        state.flights = state.flights.map(flight => {
          if (flight.id === action.payload.id) {
            return action.payload; 
          }
          return flight;
        });
      })
      .addCase(updateFlightWithPhotoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFlightAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFlightAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted flight from the flights array
        state.flights = state.flights.filter(flight => flight.id !== action.payload);
      })
      .addCase(deleteFlightAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default flightSlice.reducer;
