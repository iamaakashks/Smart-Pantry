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

  const { token } = useSelector((state) => state.auth);
  const { items: pantryItems, status: pantryStatus } = useSelector((state) => state.pantry);
  const { user } = useSelector((state) => state.auth);
  const { recipes, status: recipeStatus, error: recipeError } = useSelector((state) => state.recipes);

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchPantryItems(token));
    }
  }, [dispatch, token]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName) return;
    const itemData = { name: itemName, quantity: itemQuantity || '1' };
    dispatch(addPantryItem({ itemData, token }));
    setItemName('');
    setItemQuantity('');
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deletePantryItem({ itemId, token }));
  };
  
  const handleFindRecipes = () => {
    dispatch(fetchRecipes(token));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.username}'s Pantry
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Add a New Item</h2>
          <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Item name (e.g., Chicken Breast)"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Quantity (e.g., 500g)"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              className="sm:w-48 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add Item
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {pantryStatus === 'loading' && <li className="p-4 text-center">Loading items...</li>}
            {pantryStatus === 'succeeded' && pantryItems.length === 0 && (
              <li className="p-4 text-center text-gray-500">Your pantry is empty. Add an item to get started!</li>
            )}
            {pantryStatus === 'succeeded' &&
              pantryItems.map((item) => (
                <li key={item._id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-500">{item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
        
        <div className="mt-12 text-center">
          <button
            onClick={handleFindRecipes}
            disabled={pantryItems.length === 0 || recipeStatus === 'loading'}
            className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {recipeStatus === 'loading' ? 'Finding...' : 'Find Recipes with my Ingredients!'}
          </button>
        </div>

        <div className="mt-8">
          {recipeStatus === 'failed' && <p className="text-center text-red-500">{recipeError}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PantryPage;
