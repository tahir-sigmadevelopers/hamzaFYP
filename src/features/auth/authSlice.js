import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../components/Listings/PropertyGrid';



// Create async thunk for signin
export const signin = createAsyncThunk(
  'auth/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}api/auth/login/`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'An error occurred during sign in'
      );
    }
  }
);

// Create async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}api/auth/signup/`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'An error occurred during sign up'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,  // Initialize from localStorage
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.errorMessage = '';
    },
    resetError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in cases
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isError = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Sign up cases
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isError = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer; 