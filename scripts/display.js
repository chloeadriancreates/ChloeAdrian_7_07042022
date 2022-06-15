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

    if(recipesContainer.lastChild) {
        if(recipeArray.length % 2 == 0) {
            recipesContainer.lastChild.style.marginLeft = '5%';
            if(recipeArray.length % 3 == 0) {
                document.querySelector('.recipe:nth-last-of-type(2)').style.marginLeft = '5%';
            }
        } else {
            recipesContainer.lastChild.style.marginLeft = '0';
        }
    } else {
        const noRecipeText = document.createElement('p');
        noRecipeText.classList.add('no_recipe_text');
        noRecipeText.textContent = 'Désolé, aucune recette ne correspond à cette recherche !';
        recipesContainer.appendChild(noRecipeText);
    }
}

function displayTags(tagArray, container, func, inputValue) {
    deleteCards(container);
    tagArray.map(tag => {
        const tagText = document.createElement('p');
        tagText.textContent = tag;
        tagText.classList.add('tag_text');
        tagText.addEventListener("click", () => {
            switch(container) {
                case ingredientContainer:
                    selectTag(tag, selectedIngredients, filteredIngredients, selectedIngredientsContainer, ingredientContainer);
                    break;
                case applianceContainer:
                    selectTag(tag, selectedAppliances, filteredAppliances, selectedAppliancesContainer, applianceContainer);
                    break;
                case utensilContainer:
                    selectTag(tag, selectedUtensils, filteredUtensils, selectedUtensilsContainer, utensilContainer);
                    break;
            }
            let taggedRecipes;
            taggedRecipes = func(inputValue, recipeArray);
            filteredRecipes = taggedRecipes;
            deleteCards(recipesContainer);
            displayRecipes(filteredRecipes);
            filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient');
            displayTags(filteredIngredients, ingredientContainer, textSearch, inputValue);
            filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
            displayTags(filteredUtensils, utensilContainer, textSearch, inputValue);
            filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
            displayTags(filteredAppliances, applianceContainer, textSearch, inputValue);
        });
        container.appendChild(tagText);
    })

    if(tagArray.length == 0) {
        const tagText = document.createElement('p');
        tagText.classList.add('tag_text');
        tagText.style.width = '100%';
        let type;
        switch(container) {
            case ingredientContainer:
                type = "ingrédient";
                break;
            case applianceContainer:
                type = "appareil";
                break;
            case utensilContainer:
                type = "ustensile";
                break;
        }
        tagText.textContent = `Désolé, aucun ${type} ne correspond à cette recherche!`;
        container.appendChild(tagText);
    }
}

function displaySelectedTags(tagArray, container, func, inputValue) {
    deleteCards(container);
    tagArray.map(tag => {
        const tagChip = document.createElement('div');
        tagChip.classList.add('tag_chip');
        const tagChipText = document.createElement('p');
        tagChipText.textContent = tag;
        const tagChipDelete = document.createElement('span');
        tagChipDelete.classList.add('tag_chip_delete', 'fa-solid', 'fa-xmark');
        let value = inputValue;
        switch(container) {
            case selectedIngredientsContainer:
                tagChip.classList.add('ingredient_chip');
                tagChipDelete.addEventListener("click", () => {
                    deleteTag(tag, selectedIngredients, filteredIngredients, selectedIngredientsContainer, ingredientContainer);
                    let taggedRecipes;
                    taggedRecipes = func(value, recipeArray);
                    filteredRecipes = taggedRecipes;
                    deleteCards(recipesContainer);
                    displayRecipes(taggedRecipes);
                    filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient');
                    displayTags(filteredIngredients, ingredientContainer, textSearch, value);
                    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
                    displayTags(filteredUtensils, utensilContainer, textSearch, value);
                    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
                    displayTags(filteredAppliances, applianceContainer, textSearch, value);
                });
                break;
            case selectedAppliancesContainer:
                tagChip.classList.add('appliance_chip');
                tagChipDelete.addEventListener("click", () => {
                    deleteTag(tag, selectedAppliances, filteredAppliances, selectedAppliancesContainer, applianceContainer);
                    let taggedRecipes;
                    taggedRecipes = func(value, recipeArray);
                    filteredRecipes = taggedRecipes;
                    deleteCards(recipesContainer);
                    displayRecipes(taggedRecipes);
                    filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient');
                    displayTags(filteredIngredients, ingredientContainer, textSearch, value);
                    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
                    displayTags(filteredUtensils, utensilContainer, textSearch, value);
                    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
                    displayTags(filteredAppliances, applianceContainer, textSearch, value);
                });
                break;
            case selectedUtensilsContainer:
                tagChip.classList.add('utensil_chip');
                tagChipDelete.addEventListener("click", () => {
                    deleteTag(tag, selectedUtensils, filteredUtensils, selectedUtensilsContainer, utensilContainer);
                    let taggedRecipes;
                    taggedRecipes = func(value, recipeArray);
                    filteredRecipes = taggedRecipes;
                    deleteCards(recipesContainer);
                    displayRecipes(taggedRecipes);
                    filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient');
                    displayTags(filteredIngredients, ingredientContainer, textSearch, value);
                    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
                    displayTags(filteredUtensils, utensilContainer, textSearch, value);
                    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
                    displayTags(filteredAppliances, applianceContainer, textSearch, value);
                });
                break;
        }
        tagChip.appendChild(tagChipText);
        tagChip.appendChild(tagChipDelete);
        container.appendChild(tagChip);
    })
}

function toggleTags(type) {
    let container;
    let otherContainer1;
    let otherContainer2;

    switch(type) {
        case 'ingredient':
            container = document.getElementById('ingredient_list_container');
            otherContainer1 = document.getElementById('appliance_list_container');
            otherContainer2 = document.getElementById('utensil_list_container');
            break;
        case 'appliance':
            container = document.getElementById('appliance_list_container');
            otherContainer1 = document.getElementById('ingredient_list_container');
            otherContainer2 = document.getElementById('utensil_list_container');
            break;
        case 'utensil':
            container = document.getElementById('utensil_list_container');
            otherContainer1 = document.getElementById('appliance_list_container');
            otherContainer2 = document.getElementById('ingredient_list_container');
            break;
    }

    if(container.style.display == 'block') {
        container.style.display = 'none';
        container.parentElement.style.width = 'auto';
    } else {
        container.style.display = 'block';
        container.parentElement.style.width = '50%';
        otherContainer1.style.display = 'none';
        otherContainer1.parentElement.style.width = 'auto';
        otherContainer2.style.display = 'none';
        otherContainer2.parentElement.style.width = 'auto';
    }
}