function sortTags(recipes, key, type, value) {
    const tags = [];

    recipes.map(recipe => {
        if(key == 'appliance') {
            if ((!value || (value && recipe[key].toLowerCase().includes(value.toLowerCase()))) && !tags.includes(recipe[key]))  {
                tags.push(capitalize(recipe[key]));
            }
        } else {
            recipe[key].map(tag => {
                let currentElement = tag;
                if(type == 'ingredient') {
                    currentElement = tag.ingredient;
                }
    
                if(value) {
                    if(currentElement.toLowerCase().includes(value.toLowerCase())) {
                        if (tags.some(pushedTag => pushedTag.toLowerCase() !== currentElement.toLowerCase())) {
                            // console.log(currentElement);
                        } else {
                            tags.push(capitalize(currentElement));
                        }
                    }
                } else {
                    if (tags.some(pushedTag => pushedTag.toLowerCase() == currentElement.toLowerCase())) {
                        // console.log(currentElement);
                    } else {
                        tags.push(capitalize(currentElement));
                    }
                }
            })
        }
    });
    return tags;
}

function selectTag(tag, selectedArray, allTagsArray, selectedContainer, allTagsContainer) {
    selectedArray.push(tag);
    displaySelectedTags(selectedArray, selectedContainer);
    const id = allTagsArray.findIndex(element => element == tag);
    allTagsArray.splice(id, 1);
    displayTags(allTagsArray, allTagsContainer);
}

function deleteTag(tag, selectedArray, allTagsArray, container, allTagsContainer) {
    const id = selectedArray.findIndex(element => element == tag);
    selectedArray.splice(id, 1);
    displaySelectedTags(selectedArray, container);
    allTagsArray.push(tag);
    displayTags(allTagsArray, allTagsContainer);
}

