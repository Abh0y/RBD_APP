import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // Add more reducers as needed
  },
});

export default store;