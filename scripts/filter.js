/* Filters recipes based on selected tags and main input */
function filterRecipes(value, recipes) {
    let filteredRecipes = [];

    /* Creates a single array with all selected tags and their type */
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

    /* For each recipe: */
    recipes.map(recipe => {
        /* If some tags are selected: */
        if(selectedTags.length > 0) {
            const length = selectedTags.length;
            let counter = 0;

            /* Increments the counter every time the recipe contains one of the tags */
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

            /* If the counter is equal to the length of the array of selected tags, it means the recipe contains all the tags! */
            if(counter == length) {
                /* If something has been typed in the main input: */
                if(value) {
                    /* Checks if either the name, the description or ingredients contains the text query */
                    if(recipe.name.toLowerCase().includes(value.toLowerCase()) || 
                    recipe.description.toLowerCase().includes(value.toLowerCase())) {
                        filteredRecipes.push(recipe);
                    } else {
                        if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value.toLowerCase()))) {
                            filteredRecipes.push(recipe);
                        }
                    }
                } else {
                    /* If nothing has been typed into the main input, pushes the recipe */
                    filteredRecipes.push(recipe);
                }
            }
        } else {
            /* If no tags have been selected and something has been typed into the main input: */
            if(value) {
                /* Checks if either the name, the description or ingredients contains the text query */
                if(recipe.name.toLowerCase().includes(value.toLowerCase()) || 
                recipe.description.toLowerCase().includes(value.toLowerCase())) {
                    filteredRecipes.push(recipe);
                } else {
                    if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value.toLowerCase()))) {
                        filteredRecipes.push(recipe);
                    }
                }
            }
        }

        /* If nothing has been typed into the main input and no tags of any type were selected, filteredRecipes is reset to the full array of recipes */
        if(!value && selectedIngredients.length == 0 && selectedAppliances.length == 0 && selectedUtensils.length == 0) {
            filteredRecipes = recipeArray;
        }
    });

    console.log(filteredRecipes);
    return filteredRecipes;
}

