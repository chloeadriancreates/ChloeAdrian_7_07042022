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

    if(recipeArray.length % 3 !== 0) {
        document.documentElement.style.setProperty('--flex', "auto")
    } else {
        document.documentElement.style.setProperty('--flex', "none")
    }

    if(recipeArray.length % 2 == 0) {
        recipesContainer.lastChild.style.marginLeft = '5%';
        if(recipeArray.length % 3 == 0) {
            document.querySelector('.recipe:nth-last-of-type(2)').style.marginLeft = '5%';
        }
    } else {
        recipesContainer.lastChild.style.marginLeft = '0';
    }
}

createRecipeArray(recipes, recipeArray);
displayRecipes(recipeArray);