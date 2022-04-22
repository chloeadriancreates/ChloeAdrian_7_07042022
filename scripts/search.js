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
        deleteCards();
        displayRecipes(filteredRecipes);
    } else {
        deleteCards();
        displayRecipes(recipeArray);
    }
}

