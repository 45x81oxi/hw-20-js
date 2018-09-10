import { elements } from "./base";

export const clearList = () => elements.addSoppingList.innerHTML = '';

export const renderList = ingredient => {
    const markup = `
    <li class="shopping__item">
                <p class="shopping__description">${ingredient.ingredient}</p>
                <button class="shopping__delete btn-tiny" data-id="${ingredient.id}">
                    <svg >
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>

    `;
    elements.addSoppingList.insertAdjacentHTML("beforeend", markup);
};