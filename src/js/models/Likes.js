export default class Likes {
    constructor() {
        this.items = [];
    }

    addLike(recipe) {
        const newItem = {
            recipe_id: recipe.recipe_id,
            image_url: recipe.image_url,
            publisher: recipe.publisher,
            title: recipe.title
        }
        this.items.push(newItem);
            return newItem;
    }

    deleteLike(id) {
        this.items.forEach((item, i, arr) => {
            if (item.recipe_id === id) {
                arr.splice(i, 1);
            }
        });
    }
}