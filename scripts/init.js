/* Creates an array of formatted recipe objects from Recipe class */
function createRecipeArray(recipes, newRecipeArray) {
    recipes.map(recipe => {
        const recipeObject = new Recipe(recipe);
        newRecipeArray.push(recipeObject);
    });
}

/* Initializes recipes and tags */
function init() {
    createRecipeArray(recipes, recipeArray);
    filteredRecipes = recipeArray;
    displayRecipes(filteredRecipes);
    filteredIngredients = sortTags(recipeArray, 'ingredients', 'ingredient');
    displayTags(filteredIngredients, ingredientContainer, filterRecipes);
    filteredUtensils = sortTags(recipeArray, 'utensils', 'utensil');
    displayTags(filteredUtensils, utensilContainer, filterRecipes);
    filteredAppliances = sortTags(recipeArray, 'appliance', 'appliance');
    displayTags(filteredAppliances, applianceContainer, filterRecipes);
}

init();