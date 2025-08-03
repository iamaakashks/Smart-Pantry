const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');
const PantryItem = require('../models/pantryItemModel');

router.get('/', protect, async (req, res) => {
  try {
    const userPantryItems = await PantryItem.find({ user: req.user.id });

    if (userPantryItems.length === 0) {
      return res.status(400).json({ message: 'Pantry is empty. Add items to find recipes.' });
    }

    const ingredients = userPantryItems.map(item => item.name).join(',');
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: ingredients,
        number: 10,
        ranking: 2,
        ignorePantry: true,
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipes from Spoonacular' });
  }
});

module.exports = router;