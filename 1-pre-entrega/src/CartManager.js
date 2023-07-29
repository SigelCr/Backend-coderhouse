import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }
  async getAllCart() {
    if (fs.existsSync(this.path)) {
      const cart = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(cart);
    } else {
      return [];
    }
  }

  async getOneCart(id) {
    const carts = await this.getAllCart();
    const cart = carts.find((c) => c.id === id);
    return cart;
  }

  async createCart() {
    const carts = await this.getAllCart();

    let id;
    if (!carts.length) {
      id = 1;
    } else {
      id = carts[carts.length - 1].id + 1;
    }

    const newCart = { products: [], id };
    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts));

    return newCart;
  }

  async addProduct(idCart, idProduct) {
    const carts = await this.getAllCart();
    const cart = carts.find((c) => c.id === idCart);
    const productIndex = cart.products.findIndex(
      (p) => p.product === idProduct
    );
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return cart;
  }
}

const cartManager = new CartManager("Cart.json");
export default cartManager;
