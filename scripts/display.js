function displayRecipes(recipes) {
    const recipesContainer = document.querySelector(".recipes");

    recipes.map(recipe => {
        const recipeObject = new Recipe(recipe);
        console.log(recipe);
        const recipeCard = recipeObject.createCard();
        recipesContainer.appendChild(recipeCard);
    });
}

displayRecipes(recipes);
