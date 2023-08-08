import fs from "fs";
import { __dirname } from "./utils.js";

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

  async createProducts(prodObj) {
    try {
      const { code } = prodObj;
      const arrProdAnt = await this.getProducts();
      console.log(code);
      if (arrProdAnt.find((prod) => prod.code === code)) {
        return {
          operation: false,
          message:
            "No se puede agregar el producto, el código que ingresó ya existe",
        };
      }
      let id = !arrProdAnt.length
        ? 1
        : arrProdAnt[arrProdAnt.length - 1].id + 1;
      arrProdAnt.push({ ...prodObj, id });
      await fs.promises.writeFile(this.path, JSON.stringify(arrProdAnt));
      return { operation: true, newProduct: { ...prodObj, id } };
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
      const arrProdAnt = await this.getProducts();
      if (!arrProdAnt.find((prod) => prod.id === id)) {
        return { operation: false, message: "El id proporcionado no existe" };
      }
      const newArrProducts = arrProdAnt.filter((p) => p.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrProducts));
      const modData = await this.getProducts();
      return { operation: true, modData };
    } catch (error) {
      return error;
    }
  }
}

const productsManager = new ProductManager(__dirname + "/products.json");
export default productsManager;
