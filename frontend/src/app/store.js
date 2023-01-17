import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import examReducer from '../features/exams/examSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examReducer,
  },
})