class Dashboard{
    constructor(page){
        this.page = page;
        this.searchBox = page.getByPlaceholder('Search for Vegetables and Fruits');
        this.searchBox= page.locator('.search-keyword');
        
        // this.searchBox = page.getByPlaceholde()
        // this.searchBox= page.locator()
    }
    async getSearchBox(){
        await this.searchBox.waitFor({state:'visible'});
        return this.searchBox;
    }   
}
module.exports = Dashboard;