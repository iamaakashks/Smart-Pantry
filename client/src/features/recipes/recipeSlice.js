import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchPantryItems,
  addPantryItem,
  deletePantryItem,
} from '../features/pantry/pantrySlice';
import { fetchRecipes } from '../features/recipes/recipeSlice';
import { logout } from '../features/auth/authSlice';
import RecipeCard from '../components/RecipeCard';

const PantryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the token from the auth state
  const { token } = useSelector((state) => state.auth);
  
  const { items: pantryItems, status: pantryStatus } = useSelector((state) => state.pantry);
  const { user } = useSelector((state) => state.auth);
  const { recipes, status: recipeStatus, error: recipeError } = useSelector((state) => state.recipes);

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  // Pass the token when fetching items
  useEffect(() => {
    if (token) {
      dispatch(fetchPantryItems(token));
    }
  }, [dispatch, token]);

  // Pass the token when adding an item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName) return;
    const itemData = { name: itemName, quantity: itemQuantity || '1' };
    dispatch(addPantryItem({ itemData, token }));
    setItemName('');
    setItemQuantity('');
  };

  // Pass the token when deleting an item
  const handleDeleteItem = (itemId) => {
    dispatch(deletePantryItem({ itemId, token }));
  };
  
  // Pass the token when finding recipes
  const handleFindRecipes = () => {
    dispatch(fetchRecipes(token));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // ... the rest of your JSX remains the same
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header, Add Form, Pantry List, and Recipe Sections */}
    </div>
  );
};

export default PantryPage;