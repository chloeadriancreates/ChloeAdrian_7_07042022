/* Top-level variables */
const input = document.getElementById('search_bar');
const inputIngredient = document.getElementById('ingredient_search');
const inputAppliance = document.getElementById('appliance_search');
const inputUtensil = document.getElementById('utensil_search');

function init() {
    deleteCards(recipesContainer);
    filteredRecipes = recipeArray;
    displayRecipes(filteredRecipes);
    filteredIngredients = sortTags(recipeArray, 'ingredients', 'ingredient');
    displayTags(filteredIngredients, ingredientContainer, textSearch);
    filteredUtensils = sortTags(recipeArray, 'utensils', 'utensil');
    displayTags(filteredUtensils, utensilContainer, textSearch);
    filteredAppliances = sortTags(recipeArray, 'appliance', 'appliance');
    displayTags(filteredAppliances, applianceContainer, textSearch);
}

function textSearch(value, recipes) {
    let filteredRecipes = [];

    recipes.map(recipe => {
        if(value) {
            if(recipe.name.toLowerCase().includes(value.toLowerCase()) || 
            recipe.description.toLowerCase().includes(value.toLowerCase())) {
                filteredRecipes.push(recipe);
            } else {
                if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value.toLowerCase()))) {
                    filteredRecipes.push(recipe);
                }
            }
        }

        const selectedTags = [];
        selectedIngredients.map((selectedIngredient) => {
            selectedTags.push({
                'item': selectedIngredient,
                'type': 'ingredient'
            })
        });
        selectedAppliances.map((selectedAppliance) => {
            selectedTags.push({
                'item': selectedAppliance,
                'type': 'appliance'
            })
        });
        selectedUtensils.map((selectedUtensil) => {
            selectedTags.push({
                'item': selectedUtensil,
                'type': 'utensil'
            })
        });

        if(selectedTags.length > 0) {
            const length = selectedTags.length;
            let counter = 0;

            selectedTags.map((selectedTag) => {
                if(selectedTag.type == 'ingredient') {
                    if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedTag.item.toLowerCase()))) {
                        counter++;
                    }
                } else if(selectedTag.type == 'appliance') {
                    if(recipe.appliance.toLowerCase().includes(selectedTag.item.toLowerCase())) {
                        counter++;
                    }
                } else if(selectedTag.type == 'utensil') {
                    if(recipe.utensils.some(utensil => utensil.toLowerCase().includes(selectedTag.item.toLowerCase()))) {
                        counter++;
                    }
                }
            })

            if(counter == length) {
                filteredRecipes.push(recipe);
            }
        }

        if(!value && selectedIngredients.length == 0 && selectedAppliances.length == 0 && selectedUtensils.length == 0) {
            filteredRecipes = recipeArray;
        }
    });
    console.log(filteredRecipes);
    return filteredRecipes;
}

input.onkeyup = function() {
    if(input.value.length > 2) {
        filteredRecipes = textSearch(input.value, recipeArray);
        deleteCards(recipesContainer);
        displayRecipes(filteredRecipes);
        const filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient', input.value);
        displayTags(filteredIngredients, ingredientContainer, textSearch, input.value);
        const filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
        displayTags(filteredUtensils, utensilContainer, textSearch, input.value);
        const filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
        displayTags(filteredAppliances, applianceContainer, textSearch, input.value);
    } else {
        init();
    }
}

inputIngredient.onkeyup = function() {
    filteredIngredients = sortTags(filteredRecipes, 'ingredients', 'ingredient');
    filteredIngredients = filteredIngredients.filter((currentIngredient) => {
        return currentIngredient.toLowerCase().includes(inputIngredient.value.toLowerCase());
    })
    displayTags(filteredIngredients, ingredientContainer, textSearch, null);
    console.log(filteredIngredients);
}

inputUtensil.onkeyup = function() {
    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
    filteredUtensils = filteredUtensils.filter((currentUtensil) => {
        return currentUtensil.toLowerCase().includes(inputUtensil.value.toLowerCase());
    })
    displayTags(filteredUtensils, utensilContainer, textSearch, null);
    console.log(filteredUtensils);
}

inputAppliance.onkeyup = function() {
    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
    filteredAppliances = filteredAppliances.filter((currentAppliance) => {
        return currentAppliance.toLowerCase().includes(inputAppliance.value.toLowerCase());
    })
    displayTags(filteredAppliances, applianceContainer, textSearch, null);
    console.log(filteredAppliances);
}

