class ProductsPage {

    constructor(page) {
        this.page = page;

        // Search box
        this.searchBox = page.getByPlaceholder('Search for Vegetables and Fruits');

        // All product cards
        this.productCards = page.locator('.product');
    }

    // ✔ Function to search item
    async searchItem(itemText) {
        await this.searchBox.fill(itemText);
    }

    // ✔ Function to wait until the product appears
    async waitForItemVisible(itemName) {
        await this.productCards.filter({ hasText: itemName }).first().waitFor();
    }

    // ✔ Function to add item to cart
    async addToCart(itemName) {
        const product = this.productCards.filter({ hasText: itemName }).first();
        await product.getByRole('button', { name: 'ADD TO CART' }).click();
    }
}

module.exports = { ProductsPage };