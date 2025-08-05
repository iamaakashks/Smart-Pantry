import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    }
})

export const fetchPantryItems = createAsyncThunk(
    'pantry/fetchItems',
    async (_, {getState, rejectWithValue}) =>{
        try{
            const {token} = getState().auth;
            const response = await axios.get('https://smart-pantry-op6d.onrender.com/api/pantry', getAuthHeaders(token));
            return response.data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)

export const addPantryItem = createAsyncThunk(
    'pantry/addItem',
    async (itemData, {getState, rejectWithValue})=>{
        try{
            const {token} = getState().auth;
            const response = await axios.post('http://localhost:5001/api/pantry', itemData, getAuthHeaders(token));
            return response.data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)

export const deletePantryItem = createAsyncThunk(
    'pantry/deleteItem',
    async (itemId, {getState, rejectWithValue}) => {
        try{
            const {token} = getState().auth;
            await axios.delete(`http://localhost:5001/api/pantry/${itemId}`, getAuthHeaders(token));
            return itemId;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)

const pantrySlice = createSlice({
    name: 'pantry',
    initialState:{
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPantryItems.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchPantryItems.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchPantryItems.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.payload.message;
        })
        .addCase(addPantryItem.fulfilled, (state, action)=>{
            state.items.push(action.payload);
        })
        .addCase(deletePantryItem.fulfilled, (state, action)=>{
            state.items = state.items.filter((item)=> item._id !== action.payload);
        })
    }
})

export default pantrySlice.reducer;