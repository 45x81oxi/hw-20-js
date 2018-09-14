import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(ingredient) {
        let dig = /\d/;
        let start = ingredient.match(dig);
        let start2, count, text, spoon;

        if (start) {
            start2 = ingredient.match(dig);
            count = ingredient.substr(start.index, start2.index + 1 - start.index);
            text = ingredient.slice(start2.index + 2);
            spoon = text.substring(0, text.indexOf(' '));
            text = text.substring(text.indexOf(' '));

        } else {
            spoon = count = '';
            text = ingredient;
        }

        const newItem = {
            id: uniqid(),
            ingredient: {
                count,
                spoon,
                text
            }
        };

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