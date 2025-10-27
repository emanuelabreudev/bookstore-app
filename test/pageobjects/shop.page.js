class ShopPage {
  get searchInput() {
    return $("#search-input");
  }

  get searchButton() {
    return $("#search-btn");
  }

  get productsContainer() {
    return $("#products");
  }

  get cartItems() {
    return $("#cart-items");
  }

  get cartTotal() {
    return $("#cart-total");
  }

  get checkoutButton() {
    return $("#checkout-btn");
  }

  async getAllProducts() {
    return await $$(".product-card");
  }

  async getProductByTitle(title) {
    const products = await this.getAllProducts();
    for (const product of products) {
      const titleElement = await product.$("h3");
      const productTitle = await titleElement.getText();
      if (productTitle === title) {
        return product;
      }
    }
    return null;
  }

  async addProductToCart(productTitle) {
    const product = await this.getProductByTitle(productTitle);
    if (product) {
      const addButton = await product.$("button.add-to-cart");
      await addButton.click();
      await browser.pause(500);
    }
  }

  async search(searchTerm) {
    await this.searchInput.setValue(searchTerm);
    await this.searchButton.click();
    await browser.pause(1000);
  }

  async getProductCount() {
    const products = await this.getAllProducts();
    return products.length;
  }

  async getCartItemCount() {
    const items = await $$(".cart-item");
    return items.length;
  }

  async getCartTotalText() {
    return await this.cartTotal.getText();
  }

  async removeProductFromCart(productTitle) {
    const cartItemElements = await $$(".cart-item");

    for (const item of cartItemElements) {
      const titleElement = await item.$("strong");
      const title = await titleElement.getText();

      if (title === productTitle) {
        const removeBtn = await item.$(".remove-btn");
        await removeBtn.click();
        await browser.pause(500);
        break;
      }
    }
  }

  async checkout() {
    await this.checkoutButton.click();
    await browser.pause(500);
  }

  async getAlertText() {
    return await browser.getAlertText();
  }

  async acceptAlert() {
    await browser.acceptAlert();
  }

  async isProductInCart(productTitle) {
    const cartItemElements = await $$(".cart-item");

    for (const item of cartItemElements) {
      const titleElement = await item.$("strong");
      const title = await titleElement.getText();

      if (title === productTitle) {
        return true;
      }
    }
    return false;
  }
}

module.exports = new ShopPage();
