/* Creates an array of tags based on current filtered recipes, type of tags and that type's input value */
function sortTags(recipes, key, type, value) {
    let tags = [];

    /* For each recipe: */
    recipes.map(recipe => {
        /* If working with appliance tags, checks if the input value is null, or if it is one of the recipe's appliances and it is not already in the tags or the selected tags */
        if(key == 'appliance') {
            if ((!value || (value && recipe[key].toLowerCase().includes(value.toLowerCase()))) && !tags.includes(recipe[key]) && !selectedAppliances.some(selectedAppliance => selectedAppliance.toLowerCase() == recipe[key].toLowerCase())) {
                tags.push(capitalize(recipe[key]));
            }
        } else {
            /* If type is either ingredient or utensil: */
            recipe[key].map(tag => {
                /* Fills currentElement with the appropriate content */
                let currentElement = tag;
                if(type == 'ingredient') {
                    currentElement = tag.ingredient;
                }

                /* If something has been typed into that type's input: */
                if(value) {
                    /* Checks if the tag contains the input value and it isn't already in the selected ingredients or utensils */
                    if(currentElement.toLowerCase().includes(value.toLowerCase()) && !selectedIngredients.some(selectedIngredient => selectedIngredient.toLowerCase() == currentElement.toLowerCase()) && !selectedUtensils.some(selectedUtensil => selectedUtensil.toLowerCase() == currentElement.toLowerCase())) {
                        /* Checks that the tag isn't already in the tag array */
                        if (!tags.some(pushedTag => pushedTag.toLowerCase() == currentElement.toLowerCase())) {
                            tags.push(capitalize(currentElement));
                        }
                    }
                } else {
                    /* If nothing has been typed into that type's input, checks if the tag isn't already in the tag array, in the selected ingredients and the selected utensils */
                    if (!tags.some(pushedTag => pushedTag.toLowerCase() == currentElement.toLowerCase()) && !selectedIngredients.some(selectedIngredient => selectedIngredient.toLowerCase() == currentElement.toLowerCase()) && !selectedUtensils.some(selectedUtensil => selectedUtensil.toLowerCase() == currentElement.toLowerCase())) {
                        tags.push(capitalize(currentElement));
                    }
                }
            })
        }
    });

    /* Sorts tags by alphabetical order */
    tags = tags.sort((a, b) => a.localeCompare(b));
    return tags;
}

/* Selects tag from a tag array */
function selectTag(tag, selectedArray, allTagsArray, selectedContainer, allTagsContainer) {
    /* Adds tag to its type's selected array */
    selectedArray.push(tag);

    /* Injects the appropriate input value into value */
    let value;
    if(input.value.length > 2) {
        value = input.value;
    } else {
        value = null;
    }

    /* Updates the displayed selected tags */
    displaySelectedTags(selectedArray, selectedContainer, filterRecipes, value);

    /* Removes the tag from the main tag array */
    const id = allTagsArray.findIndex(element => element == tag);
    allTagsArray.splice(id, 1);
}

/* Removes tag from a selected tag array */
function deleteTag(tag, selectedArray, allTagsArray, container, allTagsContainer) {
    /* Removes the tag from the selected array */
    const id = selectedArray.findIndex(element => element == tag);
    selectedArray.splice(id, 1);

    /* Injects the appropriate input value into value */
    let value;
    if(input.value.length > 2) {
        value = input.value;
    } else {
        value = null;
    }

    /* Updates the displayed selected tags */
    displaySelectedTags(selectedArray, container, filterRecipes, value);

    /* Puts tag back into its type's selected array */
    allTagsArray.push(tag);

    /* Sorts tags by alphabetical order */
    allTagsArray = allTagsArray.sort((a, b) => a.localeCompare(b));

    /* Updates displayed tags */
    displayTags(allTagsArray, allTagsContainer, filterRecipes);
}