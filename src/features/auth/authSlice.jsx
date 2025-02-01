import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://127.0.0.1:8000/api/auth';

// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  try {
    console.log("Hello bro", userData);

    const response = await axios.post(`${API_URL}/signup/`, userData);
    console.log('backend response', response.data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// Async thunk for signin
export const signin = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {

    const response = await axios.post(`${API_URL}/login/`, userData);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    resetError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.detail || 'Something went wrong';
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.detail || 'Something went wrong';
      });
  },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
