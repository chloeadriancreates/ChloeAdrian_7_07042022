/* Top-level variables */
const input = document.getElementById('search_bar');

function textSearch(value, recipes) {
    let filteredRecipes = [];

    recipes.map(recipe => {
        if(recipe.name.toLowerCase().includes(value.toLowerCase()) || 
        recipe.description.toLowerCase().includes(value.toLowerCase())) {
            filteredRecipes.push(recipe);
        } else {
            if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value.toLowerCase()))) {
                filteredRecipes.push(recipe);
            }
        }
    });

    return filteredRecipes;
}

input.onkeyup = function() {
    if(input.value.length > 2) {
        const filteredRecipes = textSearch(input.value, recipeArray);
        deleteCards(recipesContainer);
        displayRecipes(filteredRecipes);
        const filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient', input.value);
        displayTags(filteredIngredients, ingredientContainer);
        const filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
        displayTags(filteredUtensils, utensilContainer);
        const filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
        displayTags(filteredAppliances, applianceContainer);
    } else {
        deleteCards(recipesContainer);
        displayRecipes(recipeArray);
        const filteredIngredients = sortTags(recipeArray, 'ingredients', 'ingredient');
        displayTags(filteredIngredients, ingredientContainer);
        const filteredUtensils = sortTags(recipeArray, 'utensils', 'utensil');
        displayTags(filteredUtensils, utensilContainer);
        const filteredAppliances = sortTags(recipeArray, 'appliance', 'appliance');
        displayTags(filteredAppliances, applianceContainer);
    }
}

