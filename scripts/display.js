/* Takes in an array of recipes and displays the cards */
function displayRecipes(recipeArray) {
    /* Calls the createCard class method on each recipe and appends it to the container */
    recipeArray.map(recipe => {
        const recipeCard = recipe.createCard();
        recipesContainer.appendChild(recipeCard);
    });

    /* Aligns the recipe cards correctly depending on how many there are on the last line */
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
        /* Creates and displays a component in case there are no recipes in the array */
        const noRecipeText = document.createElement('p');
        noRecipeText.classList.add('no_recipe_text');
        noRecipeText.textContent = 'Désolé, aucune recette ne correspond à cette recherche !';
        recipesContainer.appendChild(noRecipeText);
    }
}

/* Takes in the array of current tags, the container they're meant for, the filterRecipes() function from filter.js and the value from the main search input */
function displayTags(tagArray, container, func, inputValue) {
    /* Deletes all existing tags from the container */
    deleteCards(container);

    /* For each tag in the array: */
    tagArray.map(tag => {
        /* Creates the text element and adds its content */
        const tagText = document.createElement('button');
        tagText.textContent = tag;
        tagText.classList.add('tag_text');

        /* When clicking on the tag: */
        tagText.addEventListener("click", () => {
            /* Calls the selectTag() function from tags.js with the right category */
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

            /* Updates the recipes according to the new tag */
            let taggedRecipes;
            taggedRecipes = func(inputValue, recipeArray);
            filteredRecipes = taggedRecipes;
            deleteCards(recipesContainer);
            displayRecipes(filteredRecipes);

            /* Updates the tags based on those new recipes */
            filteredIngredients = sortTags(filteredRecipes,'ingredients', 'ingredient');
            displayTags(filteredIngredients, ingredientContainer, filterRecipes, inputValue);
            filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
            displayTags(filteredAppliances, applianceContainer, filterRecipes, inputValue);
            filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
            displayTags(filteredUtensils, utensilContainer, filterRecipes, inputValue);
        });

        container.appendChild(tagText);
    })

    /* Aligns the tags correctly depending on how many there are on the last line */
    if(container.lastChild) {
        switch(tagArray.length % 3) {
            case 2:
                container.lastChild.style.marginRight = '35%';
                break;
            case 1:
                container.lastChild.style.marginRight = '70%';
                break;
        }
    } else {
        /* Creates and displays a component in case there are no tags in the array */
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
        tagText.textContent = `Désolé, aucun ${type} ne correspond à cette recherche !`;
        container.appendChild(tagText);
    }
}

/* Takes in the array of selected tags, the container they're meant for, the filterRecipes() function from filter.js and the value from the main search input */
function displaySelectedTags(tagArray, container, func, inputValue) {
    /* Deletes all existing tags from the container */
    deleteCards(container);

    /* For each selected tag in the array: */
    tagArray.map(tag => {
        /* Creates the chip element and adds its content */
        const tagChip = document.createElement('div');
        tagChip.classList.add('tag_chip');
        const tagChipText = document.createElement('p');
        tagChipText.textContent = tag;
        const tagChipDelete = document.createElement('button');
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
                    displayTags(filteredIngredients, ingredientContainer, filterRecipes, value);
                    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
                    displayTags(filteredUtensils, utensilContainer, filterRecipes, value);
                    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
                    displayTags(filteredAppliances, applianceContainer, filterRecipes, value);
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
                    displayTags(filteredIngredients, ingredientContainer, filterRecipes, value);
                    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
                    displayTags(filteredUtensils, utensilContainer, filterRecipes, value);
                    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
                    displayTags(filteredAppliances, applianceContainer, filterRecipes, value);
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
                    displayTags(filteredIngredients, ingredientContainer, filterRecipes, value);
                    filteredUtensils = sortTags(filteredRecipes, 'utensils', 'utensil');
                    displayTags(filteredUtensils, utensilContainer, filterRecipes, value);
                    filteredAppliances = sortTags(filteredRecipes, 'appliance', 'appliance');
                    displayTags(filteredAppliances, applianceContainer, filterRecipes, value);
                });
                break;
        }
        tagChip.appendChild(tagChipText);
        tagChip.appendChild(tagChipDelete);
        container.appendChild(tagChip);
    })
}

/* Closes the appropriate tag container */
function closeTags(type) {
    let container;

    switch(type) {
        case 'ingredient':
            container = document.getElementById('ingredient_list_container');
            break;
        case 'appliance':
            container = document.getElementById('appliance_list_container');
            break;
        case 'utensil':
            container = document.getElementById('utensil_list_container');
            break;
    }

    container.style.display = 'none';
    container.parentElement.style.width = 'auto';
}

/* Toggles the appropriate tag container between open and closed */
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

    /* When a tag container is open, the width of its parent container (that also contains the toggle button) is 50% – when it is closed, its width is put back to auto so the buttons align correctly and aren't too wide */
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