let recipeArray = [];

function displayRecipes(recipes) {
    const recipesContainer = document.querySelector(".recipes");

    recipes.map(recipe => {
        const recipeObject = new Recipe(recipe);
        recipeArray.push(recipeObject);
        const recipeCard = recipeObject.createCard();
        recipesContainer.appendChild(recipeCard);
    });
}

displayRecipes(recipes);