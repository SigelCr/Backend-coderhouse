import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoArchivo = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(infoArchivo);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async createProducts(obj) {
    try {
      const productsPrev = await this.getProducts();

      let id;
      if (!productsPrev.length) {
        id = 1;
      } else {
        id = productsPrev[productsPrev.length - 1].id + 1;
      }

      const newProduct = { ...obj, id };
      productsPrev.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));

      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const productsPrev = await this.getProducts();
      const product = productsPrev.find((prod) => prod.id === id);

      if (product) {
        return product;
      } else {
        console.log(`No hay producto con el id ${id}`);
      }
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const productsPrev = await this.getProducts();
      const productIndex = productsPrev.findIndex((prod) => prod.id === id);
      productIndex === -1 && `No existe producto con ese Id`;

      const product = productsPrev[productIndex];
      productsPrev[productIndex] = { ...product, ...obj };
      await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const productsPrev = await this.getProducts();
      const newArrayProducts = productsPrev.filter((p) => p.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
    } catch (error) {
      return error;
    }
  }
}

const productsManager = new ProductManager("Products.json");
export default productsManager;
