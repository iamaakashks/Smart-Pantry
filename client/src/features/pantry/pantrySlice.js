import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://smart-pantry-op6d.onrender.com/api/pantry';

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchPantryItems = createAsyncThunk(
  'pantry/fetchItems',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPantryItem = createAsyncThunk(
  'pantry/addItem',
  async ({ itemData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, itemData, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePantryItem = createAsyncThunk(
  'pantry/deleteItem',
  async ({ itemId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${itemId}`, getAuthHeaders(token));
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const pantrySlice = createSlice({
  name: 'pantry',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPantryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPantryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPantryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })
      .addCase(addPantryItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePantryItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default pantrySlice.reducer;