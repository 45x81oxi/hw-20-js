export default class Storage {
    static getLikesRecipe() {
        let recipes;
        if (!localStorage.getItem('recipes')) {
            recipes = [];
        } else {
            recipes = JSON.parse(localStorage.getItem('recipes')); // Перегоняем их из json в обычный массив
        }
        return recipes;
    }

    static addLikeRecipe(recipe) {
        const recipes = Storage.getLikesRecipe();
        recipes.unshift(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    deleteLikeRecipe(id) {
        const _recipes = Storage.getLikesRecipe();
        _recipes.forEach((item, i) => {
            if (item.recipe_id === id) {
                _recipes.splice(i, 1);
            }
        });
        localStorage.setItem('recipes', JSON.stringify(_recipes));
    }

    uniqueId(id) {
        let marker = 0;
        const recipes = Storage.getLikesRecipe();
        recipes.forEach(item => {
            if (item.recipe_id === id) marker = 1;
        });
        return marker;
    }

}