import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice.js'
import pantryReducer from '../features/pantry/pantrySlice.js'
import recipeReducer from '../features/recipes/recipeSlice.js'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        pantry: pantryReducer,
        recipes: recipeReducer,
    }
})