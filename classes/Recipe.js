class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.utensils = data.ustensils;
    }

    createCard() {
        const article = document.createElement("article");
        article.setAttribute("class", "recipe");

        const image = document.createElement("div");
        image.setAttribute("class", "recipe_photo");

        const caption = document.createElement("div");
        caption.setAttribute("class", "recipe_caption");

        const header = document.createElement("header");
        header.setAttribute("class", "recipe_header");

        const h2Name = document.createElement("h2");
        h2Name.setAttribute("class", "recipe_name");
        h2Name.textContent = this.name;

        const divTime = document.createElement("div");
        divTime.setAttribute("class", "recipe_time");

        const iconTime = document.createElement("span");
        iconTime.setAttribute("class", "fa-regular fa-clock");

        const textTime = document.createElement("p");
        textTime.setAttribute("class", "recipe_time_text");
        textTime.textContent = `${this.time} min`;

        divTime.appendChild(iconTime);
        divTime.appendChild(textTime);

        header.appendChild(h2Name);
        header.appendChild(divTime);

        const divDetails = document.createElement("div");
        divDetails.setAttribute("class", "recipe_details");

        const divIngredients = document.createElement("div");
        divIngredients.setAttribute("class", "recipe_ingredients");
        
        this.ingredients.map(ingredient => {
            const divIngredient = document.createElement("div");
            divIngredient.setAttribute("class", "recipe_ingredient");

            const h3Ingredient = document.createElement("h3");
            h3Ingredient.setAttribute("class", "recipe_ingredient_name");
            h3Ingredient.textContent = ingredient.ingredient;

            divIngredient.appendChild(h3Ingredient);

            if(ingredient.quantity) {
                const pIngredient = document.createElement("p");
                pIngredient.setAttribute("class", "recipe_ingredient_quantity");

                if(ingredient.unit) {
                    pIngredient.textContent = ` : ${ingredient.quantity} ${ingredient.unit}`;
                } else {
                    pIngredient.textContent = ` : ${ingredient.quantity}`;
                }

                divIngredient.appendChild(pIngredient);
            }

            divIngredients.appendChild(divIngredient);
        })

        const divDescription = document.createElement("div");
        divDescription.setAttribute("class", "recipe_description");
        divDescription.textContent = this.description;

        divDetails.appendChild(divIngredients);
        divDetails.appendChild(divDescription);

        caption.appendChild(header);
        caption.appendChild(divDetails);

        article.appendChild(image);
        article.appendChild(caption);

        return article;
    }
}