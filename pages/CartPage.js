class CartPage {

    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('.cart-icon');
        this.proceedToCheckout = page.locator('text=PROCEED TO CHECKOUT');
    }

    async openCart() {
        await this.cartIcon.click();
        await this.proceedToCheckout.click();
    }
}

module.exports = { CartPage };