function sortTags(recipes, key, type, value) {
    let tags = [];

    recipes.map(recipe => {
        if(key == 'appliance') {
            if ((!value || (value && recipe[key].toLowerCase().includes(value.toLowerCase()))) && !tags.includes(recipe[key]) && !selectedAppliances.some(selectedAppliance => selectedAppliance.toLowerCase() == recipe[key].toLowerCase())) {
                tags.push(capitalize(recipe[key]));
            }
        } else {
            recipe[key].map(tag => {
                let currentElement = tag;
                if(type == 'ingredient') {
                    currentElement = tag.ingredient;
                }
                if(value) {
                    if(currentElement.toLowerCase().includes(value.toLowerCase()) && !selectedIngredients.some(selectedIngredient => selectedIngredient.toLowerCase() == currentElement.toLowerCase()) && !selectedUtensils.some(selectedUtensil => selectedUtensil.toLowerCase() == currentElement.toLowerCase())) {
                        if (!tags.some(pushedTag => pushedTag.toLowerCase() == currentElement.toLowerCase())) {
                            tags.push(capitalize(currentElement));
                        }
                    }
                } else {
                    if (!tags.some(pushedTag => pushedTag.toLowerCase() == currentElement.toLowerCase()) && !selectedIngredients.some(selectedIngredient => selectedIngredient.toLowerCase() == currentElement.toLowerCase()) && !selectedUtensils.some(selectedUtensil => selectedUtensil.toLowerCase() == currentElement.toLowerCase())) {
                        tags.push(capitalize(currentElement));
                    }
                }
            })
        }
    });

    tags = tags.sort((a, b) => a.localeCompare(b));
    return tags;
}

function selectTag(tag, selectedArray, allTagsArray, selectedContainer, allTagsContainer) {
    selectedArray.push(tag);
    let value;
    if(input.value.length > 2) {
        value = input.value;
    } else {
        value = null;
    }
    displaySelectedTags(selectedArray, selectedContainer, textSearch, value);
    const id = allTagsArray.findIndex(element => element == tag);
    allTagsArray.splice(id, 1);
}

function deleteTag(tag, selectedArray, allTagsArray, container, allTagsContainer) {
    const id = selectedArray.findIndex(element => element == tag);
    selectedArray.splice(id, 1);
    let value;
    if(input.value.length > 2) {
        value = input.value;
    } else {
        value = null;
    }
    displaySelectedTags(selectedArray, container, textSearch, value);
    allTagsArray.push(tag);
    allTagsArray = allTagsArray.sort((a, b) => a.localeCompare(b))
    displayTags(allTagsArray, allTagsContainer, textSearch);
}