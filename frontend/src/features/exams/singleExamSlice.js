import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import examService from './examService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  exam: null,
}


// Get user's exam by id
export const getExamById = createAsyncThunk(
    'exams/getOne',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await examService.getExamById(id, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
)

export const singleExamSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.exam = null
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getExamById.pending, (state) => {
          if(!state.isLoading)
            state.isLoading = true
        })
        .addCase(getExamById.fulfilled, (state, action) => {
          if(state.isLoading)
            state.isLoading = false
          state.isSuccess = true
          state.exam = action.payload
        })
        .addCase(getExamById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
})

export const { reset } = singleExamSlice.actions;
export default singleExamSlice.reducer;