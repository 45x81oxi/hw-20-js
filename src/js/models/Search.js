
export default  class  Search {
    constructor(query) {
        this.query = query;
        this.result = {};
    }


    async getResult() {
        const key = '016f5c362d238be7386879ca9eb3f0dd';

        try {
            const res = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            const data = await  res.json();
            return this.result = data.recipes;
        } catch (error) {
            console.log(error);
        }
    }
}