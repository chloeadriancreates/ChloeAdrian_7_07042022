/* Calls the toggleTags() function from display.js when clicking on the tag buttons */
ingredientButton.onclick = function() { 
    toggleTags('ingredient') 
};
applianceButton.onclick = function() { 
    toggleTags('appliance') 
};
utensilButton.onclick = function() { 
    toggleTags('utensil') 
};

/* Calls the closeTags() function from display.js when clicking on the close button of the tag panels */
ingredientClose.onclick = function() {
    closeTags('ingredient');
};
applianceClose.onclick = function() {
    closeTags('appliance');
};
utensilClose.onclick = function() {
    closeTags('utensil');
};


/* Closes each tag panel when clicking outside of it */
document.onclick = function(event) {
    if(event.target.id !== 'ingredient_list_container' && event.target.id !== 'ingredient_button' && event.target.id !== 'ingredient_close' && event.target.id !== 'ingredient_search' && event.target.id !== 'ingredient_label') {
        closeTags('ingredient');
    }
    if(event.target.id !== 'appliance_list' && event.target.id !== 'appliance_button' && event.target.id !== 'appliance_close' && event.target.id !== 'appliance_search' && event.target.id !== 'appliance_label') {
        closeTags('appliance');
    }
    if(event.target.id !== 'utensil_list_container' && event.target.id !== 'utensil_button' && event.target.id !== 'utensil_close' && event.target.id !== 'utensil_search' && event.target.id !== 'utensil_label') {
        closeTags('utensil');
    }
};

/* Closes all tag panels when pressing the escape key */
document.onkeydown = function(event) {
    if(event.code == "Escape") {
        closeTags('ingredient');
        closeTags('appliance');
        closeTags('utensil');
    }
}

/* Filters recipes and updates tags when typing into the main input */
input.onkeyup = function() {
    let value;
    if(input.value.length > 2) {
        value = input.value;
    } else {
        value = null;
    }
    filteredRecipes = filterRecipes(value, recipeArray);
    deleteCards(recipesContainer);
    displayRecipes(filteredRecipes);
    filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient');
    displayTags(filteredIngredients, ingredientContainer, filterRecipes, value);
    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
    displayTags(filteredAppliances, applianceContainer, filterRecipes, value);
    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
    displayTags(filteredUtensils, utensilContainer, filterRecipes, value);
}

/* Filters tags when typing into the tag input */
inputIngredient.onkeyup = function() {
    filteredIngredients = sortTags(filteredRecipes, 'ingredients', 'ingredient');
    filteredIngredients = filteredIngredients.filter((currentIngredient) => {
        return currentIngredient.toLowerCase().includes(inputIngredient.value.toLowerCase());
    })
    displayTags(filteredIngredients, ingredientContainer, filterRecipes, null);
}
inputAppliance.onkeyup = function() {
    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
    filteredAppliances = filteredAppliances.filter((currentAppliance) => {
        return currentAppliance.toLowerCase().includes(inputAppliance.value.toLowerCase());
    })
    displayTags(filteredAppliances, applianceContainer, filterRecipes, null);
}
inputUtensil.onkeyup = function() {
    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
    filteredUtensils = filteredUtensils.filter((currentUtensil) => {
        return currentUtensil.toLowerCase().includes(inputUtensil.value.toLowerCase());
    })
    displayTags(filteredUtensils, utensilContainer, filterRecipes, null);
}