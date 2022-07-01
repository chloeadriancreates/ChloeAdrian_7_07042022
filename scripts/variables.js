/* Recipe arrays */
let recipeArray = [];
let filteredRecipes = [];

/* Filtered tag arrays */
let filteredIngredients = [];
let filteredAppliances = [];
let filteredUtensils = [];

/* Selected tag arrays */
const selectedIngredients = [];
const selectedAppliances = [];
const selectedUtensils = [];

/* Recipe container */
const recipesContainer = document.querySelector(".recipes");

/* Selected tag containers */
const selectedIngredientsContainer = document.getElementById('ingredient_selected');
const selectedAppliancesContainer = document.getElementById('appliance_selected');
const selectedUtensilsContainer = document.getElementById('utensil_selected');

/* Tag containers */
const ingredientContainer = document.getElementById('ingredient_list');
const applianceContainer = document.getElementById('appliance_list');
const utensilContainer = document.getElementById('utensil_list');

/* Tag toggle buttons */
const ingredientButton = document.getElementById('ingredient_button');
const applianceButton = document.getElementById('appliance_button');
const utensilButton = document.getElementById('utensil_button');

/* Tag close buttons */
const ingredientClose = document.getElementById('ingredient_close');
const applianceClose = document.getElementById('appliance_close');
const utensilClose = document.getElementById('utensil_close');

/* Inputs */
const input = document.getElementById('search_bar');
const inputIngredient = document.getElementById('ingredient_search');
const inputAppliance = document.getElementById('appliance_search');
const inputUtensil = document.getElementById('utensil_search');