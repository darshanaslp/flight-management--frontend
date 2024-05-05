// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import axios from 'axios';
import { login } from './services/userService'; // Assuming your services are in a file named services.js
import { fetchFlights, createFlight , updateFlight , deleteFlight } from './services/flightService';
// Mock axios
jest.mock('axios');

// Mock login function
describe('userService', () => {
  it('should login successfully', async () => {
    const userData = { email: 'user@gmail.com', password: '12345678' };
    const tokenData = { token: 'mocked_token', refreshToken: 'mocked_refresh_token' };
    const mockResponse = { data: tokenData };
    axios.post.mockResolvedValue(mockResponse);

    const response = await login(userData.email, userData.password);

    expect(response).toEqual(tokenData);
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), userData);
  });

  it('should handle login failure', async () => {
    const userData = { email: 'user@gmail.com', password: '12345678' };
    axios.post.mockRejectedValue(new Error('Login failed'));

    await expect(login(userData.email, userData.password)).rejects.toThrowError('Login failed');
  });
});

// Mock flight service functions
describe('flightService', () => {
  const mockToken = 'mocked_token';
  const mockHeaders = { headers: { Authorization: `Bearer ${mockToken}` } };

  it('should create flight successfully', async () => {
    const flightData = {
      code: 'AbcDef',
      capacity: 50,
      departureDate: '2020-10-23',
    };
    const mockResponse = {
      id: '61eb3961-8a49-4e7a-90e2-f7eeaf1f7204',
      code: 'AbcDef',
      capacity: 200,
      departureDate: '2020-10-23',
      status: 'processing',
      img: 'string',
    };
    axios.post.mockResolvedValue({ data: mockResponse });

    const response = await createFlight(flightData);

    expect(response).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/flights'), flightData, mockHeaders);
  });

  describe('flightService - fetchFlights', () => {
    const mockToken = 'mocked_token';
    const mockHeaders = { headers: { Authorization: `Bearer ${mockToken}` } };
  
    it('should fetch flights successfully', async () => {
      const page = 1;
      const size = 10;
      const mockResponse = {
        total: 2,
        count: 2,
        resources: [
          {
            id: '61eb3961-8a49-4e7a-90e2-f7eeaf1f7204',
            code: 'AbcDef',
            capacity: 200,
            departureDate: '2020-10-23',
            status: 'processing',
            img: 'string',
          },
          {
            id: '0a18799f-ec60-4e43-a412-889864d06fb0',
            img: '5c41b59e884135b36bb0b7bd536f5ebd',
            status: 'ready',
            code: 'ffggrtt',
            capacity: 52,
            departureDate: '2024-01-01',
          },
        ],
      };
      axios.get.mockResolvedValue({ data: mockResponse });
  
      const response = await fetchFlights(page, size);
  
      expect(response).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/flights?page=${page}&size=${size}`), mockHeaders);
    });
  
    it('should handle fetch failure', async () => {
      const page = 1;
      const size = 10;
      axios.get.mockRejectedValue(new Error('Fetch failed'));
  
      await expect(fetchFlights(page, size)).rejects.toThrowError('Fetch failed');
    });
  });

  describe('flightService - updateFlight', () => {
    const mockToken = 'mocked_token';
    const mockHeaders = { headers: { Authorization: `Bearer ${mockToken}` } };
  
    it('should update flight successfully', async () => {
      const flightId = '61eb3961-8a49-4e7a-90e2-f7eeaf1f7204';
      const updatedFlightData = {
        code: 'UpdatedCode',
        capacity: 100,
        departureDate: '2021-01-01',
      };
      const mockResponse = {
        id: flightId,
        code: 'UpdatedCode',
        capacity: 100,
        departureDate: '2021-01-01',
        status: 'processing',
        img: 'string',
      };
      axios.put.mockResolvedValue({ data: mockResponse });
  
      const response = await updateFlight(flightId, updatedFlightData);
  
      expect(response).toEqual(mockResponse);
      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(`/flights/${flightId}`), updatedFlightData, mockHeaders);
    });
  
    it('should handle update failure', async () => {
      const flightId = '61eb3961-8a49-4e7a-90e2-f7eeaf1f7204';
      const updatedFlightData = {
        code: 'UpdatedCode',
        capacity: 100,
        departureDate: '2021-01-01',
      };
      axios.put.mockRejectedValue(new Error('Update failed'));
  
      await expect(updateFlight(flightId, updatedFlightData)).rejects.toThrowError('Update failed');
    });
  });
  
  // Mock deleteFlight function
  describe('flightService - deleteFlight', () => {
    const mockToken = 'mocked_token';
    const mockHeaders = { headers: { Authorization: `Bearer ${mockToken}` } };
  
    it('should delete flight successfully', async () => {
      const flightId = '61eb3961-8a49-4e7a-90e2-f7eeaf1f7204';
      const mockResponse = { message: 'Flight deleted successfully' };
      axios.delete.mockResolvedValue({ data: mockResponse });
  
      const response = await deleteFlight(flightId);
  
      expect(response).toEqual(mockResponse);
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining(`/flights/${flightId}`), mockHeaders);
    });
  
    it('should handle delete failure', async () => {
      const flightId = '61eb3961-8a49-4e7a-90e2-f7eeaf1f7204';
      axios.delete.mockRejectedValue(new Error('Delete failed'));
  
      await expect(deleteFlight(flightId)).rejects.toThrowError('Delete failed');
    });
  });

});
