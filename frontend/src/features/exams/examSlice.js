import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import examService from './examService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  /* exam: null, */
  exams: [],
}

// Create new exam
export const createExam = createAsyncThunk(
  'exams/create',
  async (examData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await examService.createExam(examData, token);
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

// Get user's exams
export const getExams = createAsyncThunk(
  'exams/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await examService.getExams(token);
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

/* // Get user's exam by id
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
) */

// Delete user's exam
export const deleteExam = createAsyncThunk(
  'exams/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await examService.deleteExam(id, token);
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

// Update user's exam
export const updateExam = createAsyncThunk(
  'exams/update',
  async (newExamData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await examService.updateExam(newExamData, token);
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

export const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.exams = []
      /* state.exam = null */
    },
  },
  extraReducers: (builder) => {
    builder
      /* .addCase(getExamById.pending, (state) => {
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
        //state.isLoading = false
        state.isError = true
        state.message = action.payload
      }) */
      .addCase(createExam.pending, (state) => {
       state.isLoading = true
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.exams.push(action.payload)
      })
      .addCase(createExam.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateExam.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.exams = state.exams.filter(
          (exam) => exam._id !== action.payload.id
        )
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getExams.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.exams = action.payload
      })
      .addCase(getExams.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteExam.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.exams = state.exams.filter(
          (exam) => exam._id !== action.payload.id
        )
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = examSlice.actions;
export default examSlice.reducer;