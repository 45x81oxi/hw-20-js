import { elements } from "./base";

export const clearList = () => elements.likesList.innerHTML = '';


export const renderLike = recipe => {
    const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
        <button class="like__delete btn-tiny" data-id="${recipe.recipe_id}" style="margin-top: .5rem; position: absolute; right: 25px;" >
         <svg >
             <use href="img/icons.svg#icon-circle-with-cross"></use>
         </svg>
    </button>
    </a>
  </li>
   `;
    elements.likesList.insertAdjacentHTML("beforeend", markup);
};