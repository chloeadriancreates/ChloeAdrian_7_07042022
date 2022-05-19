/* Top-level variables */
let recipeArray = [];
const recipesContainer = document.querySelector(".recipes");
const selectedIngredients = [];
const selectedAppliances = [];
const selectedUtensils = [];
const selectedIngredientsContainer = document.getElementById('ingredient_selected');
const selectedUtensilsContainer = document.getElementById('utensil_selected');
const selectedAppliancesContainer = document.getElementById('appliance_selected');

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

function displayTags(tagArray, container) {
    deleteCards(container);
    tagArray.map(tag => {
        const tagText = document.createElement('p');
        tagText.textContent = tag;
        tagText.classList.add('tag_text');
        tagText.addEventListener("click", () => {
            switch(container) {
                case ingredientContainer:
                    selectTag(tag, selectedIngredients, ingredientList, selectedIngredientsContainer, ingredientContainer);
                    break;
                case applianceContainer:
                    selectTag(tag, selectedAppliances, applianceList, selectedAppliancesContainer, applianceContainer);
                    break;
                case utensilContainer:
                    selectTag(tag, selectedUtensils, utensilList, selectedUtensilsContainer, utensilContainer);
                    break;
            }
        });
        container.appendChild(tagText);
    })
}

function displaySelectedTags(tagArray, container) {
    deleteCards(container);
    tagArray.map(tag => {
        const tagChip = document.createElement('div');
        tagChip.classList.add('tag_chip');
        const tagChipText = document.createElement('p');
        tagChipText.textContent = tag;
        const tagChipDelete = document.createElement('span');
        tagChipDelete.classList.add('tag_chip_delete', 'fa-solid', 'fa-xmark');
        switch(container) {
            case selectedIngredientsContainer:
                tagChip.classList.add('ingredient_chip');
                tagChipDelete.addEventListener("click", () => {
                    deleteTag(tag, selectedIngredients, ingredientList, selectedIngredientsContainer, ingredientContainer);
                });
                break;
            case selectedAppliancesContainer:
                tagChip.classList.add('appliance_chip');
                tagChipDelete.addEventListener("click", () => {
                    deleteTag(tag, selectedAppliances, applianceList, selectedAppliancesContainer, applianceContainer);
                });
                break;
            case selectedUtensilsContainer:
                tagChip.classList.add('utensil_chip');
                tagChipDelete.addEventListener("click", () => {
                    deleteTag(tag, selectedUtensils, utensilList, selectedUtensilsContainer, utensilContainer);
                });
                break;
        }
        tagChip.appendChild(tagChipText);
        tagChip.appendChild(tagChipDelete);
        console.log(container);
        container.appendChild(tagChip);
    })
}

function toggleTags(type) {
    let container;
    let otherContainer1;
    let otherContainer2;

    switch(type) {
        case 'ingredient':
            container = ingredientContainer;
            otherContainer1 = applianceContainer;
            otherContainer2 = utensilContainer;
            break;
        case 'appliance':
            container = applianceContainer;
            otherContainer1 = ingredientContainer;
            otherContainer2 = utensilContainer;
            break;
        case 'utensil':
            container = utensilContainer;
            otherContainer1 = applianceContainer;
            otherContainer2 = ingredientContainer;
            break;
    }

    if(container.style.display == 'flex') {
        container.style.display = 'none';
        container.parentElement.style.width = 'auto';
    } else {
        container.style.display = 'flex';
        container.parentElement.style.width = '50%';
        otherContainer1.style.display = 'none';
        otherContainer1.parentElement.style.width = 'auto';
        otherContainer2.style.display = 'none';
        otherContainer2.parentElement.style.width = 'auto';
    }
}