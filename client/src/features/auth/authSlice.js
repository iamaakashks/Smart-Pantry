import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, {rejectWithValue})=>{
        try{
            const response = await axios.post('http://localhost:5001/api/users/register', userData);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://smart-pantry-op6d.onrender.com/api/users/login', userData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user',JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: user? user:null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
        state.user = null;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;