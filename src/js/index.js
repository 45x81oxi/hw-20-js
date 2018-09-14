// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import Storage from './storage';

import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Favorite recipe object
 * */

const state = {};

// Search controller
const controlSearch = async () => {
    //1. получать данные из view
    const query = searchView.getSearchInputValue();

    if (query) {
        //2. создаем новый объект
        state.search = new Search(query);

        //3. подготовим UI для результата
        searchView.clearForm();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //4. делаем поиск рецепта
        await  state.search.getResult();

        //5. render result
        searchView.renderResult(state.search.result);
        clearLoader();
    }
};

// Set events
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
});


// Recipe controller
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // highlight active
        if (state.search) searchView.highLightSelected(id);
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        // Get recipe data
        await state.recipe.getRecipe();

        clearLoader();
        recipeView.renderRecipe(state.recipe.result);
    }
};

// change in the number of portions and times
const changePeople = (e) => {
    if (e.target.closest('.btn-tiny')) {

        const sign = e.target.closest('.btn-tiny').getAttribute('name');
        const countPeople = elements.recipe.querySelector('.recipe__info-data--people');
        const minutes = elements.recipe.querySelector('.recipe__info-data--minutes');

        let count = +countPeople.innerHTML;
        let index = 1;
        if (sign === 'minus' && count >= 2) {
            --count;
        }
        else if (sign === 'plus' && count <= 12) {
            ++count;
        }
        if (count < 3) {
            minutes.innerHTML = 35;
        }
        else if (count > 8) {
            minutes.innerHTML = 60;
        }
        else minutes.innerHTML = 45;
        countPeople.innerHTML = count;

        changeCountIngredient(count === 4 ? 1 : index * count / 4);
    }
};


window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
elements.recipe.addEventListener('click', changePeople);


// List controller

// change in the number of ingredients
let arrCountIngredient = [];
const changeCountIngredient = (index) => {

    arrCountIngredient = listView.listIngredients.slice(0);
    listView.listIngredients.splice(0, listView.listIngredients.length);
    listView.clearList();
    arrCountIngredient.forEach(item => listView.renderList(item, index));
};


const listItem = new List();
const controlShoppingList = (e) => {
    if (e.target.closest('.recipe__btn')) {
        const countPeople = elements.recipe.querySelector('.recipe__info-data--people');
        const minutes = elements.recipe.querySelector('.recipe__info-data--minutes');
        countPeople.innerHTML = 4;
        minutes.innerHTML = 45;
        listItem.items = [];
        listView.clearList();
        if (state.recipe.id) {
            listView.listIngredients.splice(0, listView.listIngredients.length);
            state.recipe.result.ingredients.forEach(ingredient => listItem.addItem(ingredient));
            listItem.items.forEach(item => listView.renderList(item));
        }
    }
};

const deleteIngredient = (e) => {
    if (e.target.closest('.shopping__delete')) {
        listItem.deleteItem(e.target.closest('.shopping__delete').dataset.id);
        listView.clearList();
        listItem.items.forEach(item => listView.renderList(item));
    }
};

elements.recipe.addEventListener('click', controlShoppingList);
elements.addSoppingList.addEventListener('click', deleteIngredient);


// Likes controller
const likes = new Likes();
const store = new Storage();
store.getLikesRecipe().forEach(like => likesView.renderLike(like));

const addLike = (e) => {
    if (e.target.closest('.header__likes')) {
        if (store.uniqueId(state.recipe.id)) {
            alert('Recipe already added to favorites!');
            return;
        }

        store.addLikeRecipe(likes.addLike(state.recipe.result));
        if (state.recipe.id) {
            likesView.renderLike(state.recipe.result);
        }
    }
};

const deleteLikes = (e) => {
    if (e.target.closest('.like__delete')) {
        const id = e.target.closest('.like__delete').dataset.id;
        likes.deleteLike(id);
        store.deleteLikeRecipe(id);
        likesView.clearList();
        likes.items.forEach(like => likesView.renderLike(like));
    }
};

elements.recipe.addEventListener('click', addLike);
elements.likesList.addEventListener('click', deleteLikes);


