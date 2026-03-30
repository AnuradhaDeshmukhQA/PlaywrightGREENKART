class LoginPage {

    constructor(page) {
        this.page = page;

        // locators
        this.emailField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    // navigate to login page
    async openLoginPage() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    // perform login
    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}

module.exports = { LoginPage };