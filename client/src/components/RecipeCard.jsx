import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <a href={`https://spoonacular.com/recipes/${recipe.title.replace(/\s/g, '-')}-${recipe.id}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 block" >
      <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{recipe.title}</h3>
        {recipe.missedIngredientCount > 0 && (
          <p className="text-sm text-red-600 mt-2">
            You need {recipe.missedIngredientCount} more ingredient(s).
          </p>
        )}
        {recipe.usedIngredientCount > 0 && (
          <p className="text-sm text-green-600 mt-1">
            Uses {recipe.usedIngredientCount} of your ingredients.
          </p>
        )}
      </div>
    </a>
  );
};

export default RecipeCard;