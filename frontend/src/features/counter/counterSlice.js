import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counter: 1
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        reset: (state) => {
            state.counter = 1;
        },
        Increment: (state) => {
            if (state.counter < 5) {
                state.counter += 1;
            }
        },
        Decrement: (state) => {
            if (state.counter > 2) {
                state.counter -= 1;
            }
        },
        SetCounter: (state, action) => {
            if (state.counter < 5 && state.counter >= 2) {
                state.counter = action.payload;
            } else {
                state.counter = 2;
            }
        }
    },
  })

  export const { reset, Increment, Decrement, SetCounter } = counterSlice.actions;
  export default counterSlice.reducer;