import {elements} from "./base";

export const getSearchInputValue = () => elements.searchInput.value;

export const clearForm = () => elements.searchForm.reset();

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

const renderRecipe = recipe => {
    const markup = `
  <li>
    <a class="results__link results__link--active" href="#{recipe.revipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>
   `;

    elements.searchResList.insertAdjacentHTML("afterbegin", markup);
};

export const renderResult = (recipes) => {
    console.log(recipes);
    // перебираем массив рецептов на каждой итерации отправляя один рецепт в функцию renderRecipe
    recipes.forEach(renderRecipe);
};