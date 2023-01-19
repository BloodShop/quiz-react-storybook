import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import examReducer from '../features/exams/examSlice';
import singleExamReducer from '../features/exams/singleExamSlice';
import userReducer from '../features/users/userSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examReducer,
    exam: singleExamReducer,
    users: userReducer,
    counter: counterReducer
  },
})