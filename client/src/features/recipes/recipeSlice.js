import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get('https://smart-pantry-op6d.onrender.com/api/recipes', getAuthHeaders(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default recipeSlice.reducer;