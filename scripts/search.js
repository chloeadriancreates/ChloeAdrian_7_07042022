/* Top-level variables */
const input = document.getElementById('search_bar');

function textSearch(value, recipes) {
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        if(recipes[i].name.toLowerCase().includes(value.toLowerCase()) || 
        recipes[i].description.toLowerCase().includes(value.toLowerCase())) {
        // recipes[i].appliance.toLowerCase().includes(value.toLowerCase())) {
            filteredRecipes.push(recipes[i]);
        } else {
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                if(recipes[i].ingredients[j].ingredient.toLowerCase().includes(value.toLowerCase())) {
                    filteredRecipes.push(recipes[i]);
                    j = recipes[i].ingredients.length;
                }
            }
            // for (let k = 0; k < recipes[i].utensils.length; k++) {
            //     if(recipes[i].utensils[k].toLowerCase().includes(value.toLowerCase())) {
            //         filteredRecipes.push(recipes[i]);
            //     }
            // }
        }
    }
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

