import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// i would like to create a chat room with the other users on this technologies: react, socket.io and express , and also challenge them with an exam that will be added to their exams list

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getUsers = createAsyncThunk('user/users', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await userService.getUsers(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message);
  }
})

export const deleteUser = createAsyncThunk('user/delete', async (user, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await userService.deleteUser(user, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message);
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        )
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload.data
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions;
export default userSlice.reducer;