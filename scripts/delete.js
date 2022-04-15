function deleteCards() {
    while (recipesContainer.lastChild) {
        recipesContainer.removeChild(recipesContainer.lastChild);
    }
}