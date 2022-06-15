const ingredientContainer = document.getElementById('ingredient_list');
const utensilContainer = document.getElementById('utensil_list');
const applianceContainer = document.getElementById('appliance_list');
const ingredientButton = document.getElementById('ingredient_button');
const utensilButton = document.getElementById('utensil_button');
const applianceButton = document.getElementById('appliance_button');
const ingredientClose = document.getElementById('ingredient_close');
const utensilClose = document.getElementById('utensil_close');
const applianceClose = document.getElementById('appliance_close');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

createRecipeArray(recipes, recipeArray);
displayRecipes(recipeArray);

const ingredientList = sortTags(recipeArray, 'ingredients', 'ingredient');
const utensilList = sortTags(recipeArray, 'utensils', 'utensil');
const applianceList = sortTags(recipeArray, 'appliance', 'appliance');

ingredientButton.onclick = function() { 
    toggleTags('ingredient') 
};
utensilButton.onclick = function() { 
    toggleTags('utensil') 
};
applianceButton.onclick = function() { 
    toggleTags('appliance') 
};

ingredientClose.onclick = function() {
    toggleTags('ingredient');
}
utensilClose.onclick = function() {
    toggleTags('utensil');
}
applianceClose.onclick = function() {
    toggleTags('appliance');
}

document.onclick = function(event) {
    if(event.target.id !== 'ingredient_list_container' && event.target.id !== 'ingredient_button' && event.target.id !== 'ingredient_close') {
        closeTags('ingredient');
    }
    if(event.target.id !== 'utensil_list_container' && event.target.id !== 'utensil_button' && event.target.id !== 'utensil_close') {
        closeTags('utensil');
    }
    if(event.target.id !== 'appliance_list' && event.target.id !== 'appliance_button' && event.target.id !== 'appliance_close') {
        closeTags('appliance');
    }
};

document.onkeydown = function(event) {
    if(event.code == "Escape") {
        closeTags('ingredient');
        closeTags('utensil');
        closeTags('appliance');
    }
}

init();