/* Top-level variables */
let recipeArray = [];
const recipesContainer = document.querySelector(".recipes");

function createRecipeArray(recipes, newRecipeArray) {
    recipes.map(recipe => {
        const recipeObject = new Recipe(recipe);
        newRecipeArray.push(recipeObject);
    });
}

function displayRecipes(recipeArray) {
    recipeArray.map(recipe => {
        const recipeCard = recipe.createCard();
        recipesContainer.appendChild(recipeCard);
    });
}

createRecipeArray(recipes, recipeArray);
displayRecipes(recipeArray);