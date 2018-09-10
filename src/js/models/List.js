import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(ingredient) {
        const newItem = {
            id: uniqid(),
            ingredient
        }

        this.items.push(newItem);
    }

    deleteItem(id) {
        this.items.forEach((item, i, arr) => {
            if (item.id === id) {
                arr.splice(i, 1);
            }
        });
    }
}