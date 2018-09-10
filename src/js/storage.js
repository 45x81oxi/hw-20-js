export default class Storage {
    getLikesRecipe() {
        let recipes;
        if (!localStorage.getItem('recipes')) {
            recipes = [];
        } else {
            recipes = JSON.parse(localStorage.getItem('recipes')); // Перегоняем их из json в обычный массив
        }
        return recipes;
    }

    addLikeRecipe(recipe) {
        const recipes = this.getLikesRecipe();
        recipes.unshift(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    deleteLikeRecipe(id) {
        const _recipes = this.getLikesRecipe();
        _recipes.forEach((item, i) => {
            if (item.recipe_id === id) {
                _recipes.splice(i, 1);
                return;
            }
        });
        localStorage.setItem('recipes', JSON.stringify(_recipes));
    }

    uniqueId(id) {
        let marker = 0;
        const recipes = this.getLikesRecipe();
        recipes.forEach(item => {
            if (item.recipe_id === id) marker = 1;
        })
        return marker;
    }

}