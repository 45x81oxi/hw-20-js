import { elements } from "./base";

export const clearList = () => elements.addSoppingList.innerHTML = '';
export const listIngredients = [];

export const renderList = (item, index = 1) => {
    listIngredients.push(item);
    let quantity; //item.ingredient.count;
    let spoon; //item.ingredient.spoon;

    if (item.ingredient.count && item.ingredient.count !== 0) {
        if (item.ingredient.spoon && !isNaN(item.ingredient.spoon)) {
            quantity = +item.ingredient.count / +item.ingredient.spoon;
            spoon = '';
        } else {
            quantity = item.ingredient.count;
            spoon = item.ingredient.spoon;
        }
    } else quantity = spoon = '';


    const markup = `
 <li class="shopping__item">
                    <div class="shopping__count">
                        <input type="text" value="${quantity != 0 ? (quantity * index).toFixed(2) : ''}">
                        <p>${spoon}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient.text}</p>
                    <button class="shopping__delete btn-tiny" data-id="${item.id}">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
`
    elements.addSoppingList.insertAdjacentHTML("beforeend", markup);
}