// rootReducer.js

import { combineReducers } from 'redux';
import flightReducer from './flights/flightSlice';
import userReducer from './users/userSlice';

const rootReducer = combineReducers({
  flights: flightReducer,
  auth: userReducer,
});

export default rootReducer;