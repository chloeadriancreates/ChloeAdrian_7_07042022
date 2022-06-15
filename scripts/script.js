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

// document.onclick = function(event){
//     if(event.target.id !== 'ingredient_list' && event.target.id !== 'ingredient_button' && ingredientContainer.style.display == 'flex') {
//         console.log(ingredientContainer.style.display);
//         ingredientContainer.style.display = 'none';
//     }
//     if(event.target.id !== 'utensil_list' && event.target.id !== 'utensil_button' && utensilContainer.style.display == 'flex') {
//         console.log(utensilContainer.style.display);
//         utensilContainer.style.display = 'none';
//     }
//     if(event.target.id !== 'appliance_list' && event.target.id !== 'appliance_button' && applianceContainer.style.display == 'flex') {
//         console.log(applianceContainer.style.display);
//         applianceContainer.style.display = 'none';
//     }
// };

init();